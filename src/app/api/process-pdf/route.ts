import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { BedrockEmbeddings } from "@langchain/aws";
import { PineconeStore } from "@langchain/pinecone";
import path from "path";
import fs from "fs/promises";
import { getPineconeClient } from "@/lib/pinecone";

export async function POST(req: NextRequest) {
  try {
    const { fileId } = await req.json();
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
        { status: 404 }
      );
    }

    const res = await fetch(file.url);
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
    console.log("chunks---", chunks);

    const embedding = new BedrockEmbeddings({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
      model: process.env.MODEL!,
    });
    // store in pinecone
    const pinecone = await getPineconeClient();
    // const pineconeIndex = pinecone.Index("hugg-embedding");
    const pineconeIndex = pinecone.Index("chat-pdf");

    await PineconeStore.fromDocuments(chunks, embedding, {
      pineconeIndex,
      namespace: fileId,
    });

    // mark as ready
    await db.file.update({
      where: {
        id: fileId,
      },
      data: {
        uploadStatus: "SUCCESS",
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log("Error in process-pdf---", error);

    // mark as failed
    const { fileId } = await req.json();
    if (fileId) {
      await db.file.update({
        where: { id: fileId },
        data: { uploadStatus: "FAILED" },
      });
    }
    return NextResponse.json(
      {
        error: "Processing failed",
      },
      { status: 500 }
    );
  }
}
