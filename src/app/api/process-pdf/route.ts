import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import path from "path";
import fs from "fs/promises";
import { getPineconeClient } from "@/lib/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { embedding } from "@/lib/bedrock";
import { UploadStatus } from "@/types/upload";
import { s3 } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

// Helper to convert AWS SDK stream to Buffer
async function streamToBuffer(stream: Readable): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
  let fileId: string | undefined;
  let tempPath: string | undefined;

  try {
    const body = await req.json();
    fileId = body.fileId;

    if (!fileId) {
      return NextResponse.json({ error: "Missing fileId" }, { status: 400 });
    }

    const file = await db.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // 1. Fetch directly from S3 using IAM credentials (No public access needed)
    // Assumes file.key exists in DB, or extract the key from the stored URL
    const bucket = process.env.AWS_S3_BUCKET!;
    const s3Key = file.key || new URL(file.url).pathname.replace(/^\/+/, "");

    const s3Response = await s3.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: s3Key,
      })
    );

    if (!s3Response.Body) {
      throw new Error("Empty body received from S3");
    }

    const buffer = await streamToBuffer(s3Response.Body as Readable);

    // 2. Write to /tmp for parsing
    tempPath = path.join("/tmp", `${fileId}.pdf`);
    await fs.writeFile(tempPath, buffer);

    // 3. Extract and split text
    const loader = new PDFLoader(tempPath);
    const docs = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 800,
      chunkOverlap: 100,
    });

    const chunks = await splitter.splitDocuments(docs);
    console.log("Total chunks:", chunks.length);

    // 4. Ingest embeddings into Pinecone
    const pinecone = await getPineconeClient();
    const pineconeIndex = pinecone.Index("chat-pdf");

    await PineconeStore.fromDocuments(chunks, embedding, {
      pineconeIndex,
      namespace: fileId,
    });

    // 5. Mark as ready
    await db.file.update({
      where: { id: fileId },
      data: { uploadStatus: UploadStatus.SUCCESS },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in process-pdf:", error);

    if (fileId) {
      await db.file.update({
        where: { id: fileId },
        data: { uploadStatus: UploadStatus.FAILED },
      });
    }

    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  } finally {
    // 6. Ensure temporary file is deleted even if embedding fails
    if (tempPath) {
      await fs.unlink(tempPath).catch(() => null);
    }
  }
}