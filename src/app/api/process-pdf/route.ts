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

export async function POST(req: NextRequest) {
  let fileId: string | undefined;

  try {
    const body = await req.json();

    fileId = body.fileId;
    const file = await db.file.findUnique({
      where: {
        id: fileId,
      },
    });

    if (!file) {
      return NextResponse.json(
        {
          error: "File not found",
        },
        { status: 404 },
      );
    }

    const res = await fetch(file.url);

    if (!res.ok) {
      throw new Error(`Failed to fetch PDF: ${res.status}`);
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    const tempPath = path.join("/tmp", `${fileId}.pdf`);
    await fs.writeFile(tempPath, buffer);

    // extract text

    const loader = new PDFLoader(tempPath);
    const docs = await loader.load();

    // split into chunks
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 800,
      chunkOverlap: 100,
    });

    const chunks = await splitter.splitDocuments(docs);
    // console.log("chunks---", chunks);
    console.log("Total chunks:", chunks.length);

    
    // store in pinecone
    const pinecone = await getPineconeClient();
    // const pineconeIndex = pinecone.Index("hugg-embedding");
    const pineconeIndex = pinecone.Index("chat-pdf");

    try {
      await PineconeStore.fromDocuments(chunks, embedding, {
        pineconeIndex,
        namespace: fileId,
      });
    } catch (err) {
      console.error("Embedding upload failed", err);
      throw err;
    }

    if (!fileId) {
      return NextResponse.json(
        {
          error: "Missing fileId",
        },
        { status: 400 },
      );
    }

    // mark as ready
    await db.file.update({
      where: {
        id: fileId,
      },
      data: {
        uploadStatus: UploadStatus.SUCCESS,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log("Error in process-pdf---", error);

    // mark as failed
    if (fileId) {
      await db.file.update({
        where: { id: fileId },
        data: {
          uploadStatus: UploadStatus.FAILED,
        },
      });
    }

    return NextResponse.json(
      {
        error: "Processing failed",
      },
      { status: 500 },
    );
  }
}
