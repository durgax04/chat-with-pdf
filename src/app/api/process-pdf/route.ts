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
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { API_ERRORS } from "@/constants/errors_process_pdf";
import { logApiError } from "@/lib/logger";

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
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json(API_ERRORS.UNAUTHORIZED, { status: 401 });
    }

    const body = await req.json();
    fileId = body.fileId;

    if (!fileId) {
      return NextResponse.json(API_ERRORS.MISSING_PARAMS, { status: 400 });
    }

    // Fetch user first to link file ownership verification
    const dbUser = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!dbUser) {
      return NextResponse.json(API_ERRORS.USER_NOT_FOUND, { status: 404 });
    }

    const file = await db.file.findUnique({
      where: { 
        id: fileId,
        userId: dbUser.id, // Secures multi-tenancy isolation
      },
    });

    if (!file) {
      return NextResponse.json(API_ERRORS.FILE_NOT_FOUND, { status: 404 });
    }

    // Atomically increment counter while enforcing the limit rule
    const updateResult = await db.user.updateMany({
      where: {
        id: dbUser.id,
        pdfUploadCount: { lt: 2 },
      },
      data: {
        pdfUploadCount: {
          increment: 1,
        },
      },
    });

    if (updateResult.count === 0) {
      return NextResponse.json(API_ERRORS.UPLOAD_LIMIT_REACHED, { status: 429 });
    }

    const bucket = process.env.AWS_S3_BUCKET;
    if (!bucket) {
      throw new Error("AWS_S3_BUCKET environment variable is missing.");
    }

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

    tempPath = path.join("/tmp", `${fileId}.pdf`);
    await fs.writeFile(tempPath, buffer);

    const loader = new PDFLoader(tempPath);
    const docs = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 800,
      chunkOverlap: 100,
    });

    const chunks = await splitter.splitDocuments(docs);

    const pinecone = await getPineconeClient();
    const pineconeIndex = pinecone.Index("chat-pdf");

    await PineconeStore.fromDocuments(chunks, embedding, {
      pineconeIndex,
      namespace: fileId,
    });

    await db.file.update({
      where: { id: fileId },
      data: { uploadStatus: UploadStatus.SUCCESS },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    logApiError("PROCESS_PDF_ROUTE", error);

    if (fileId) {
      await db.file.update({
        where: { id: fileId },
        data: { uploadStatus: UploadStatus.FAILED },
      }).catch(() => {});
    }

    return NextResponse.json(API_ERRORS.PROCESSING_FAILED, { status: 500 });
  } finally {
    if (tempPath) {
      await fs.unlink(tempPath).catch(() => null);
    }
  }
}