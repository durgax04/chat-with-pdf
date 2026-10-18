"use server";

import { db } from "@/lib/prisma";
import { getPineconeClient } from "@/lib/pinecone";
import { s3 } from "@/lib/s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export default async function deleteChat(fileId: string) {
  try {
    const file = await db.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      throw new Error("File not found");
    }

    // delete all embeddings for this file from Pinecone
    try {
      const pinecone = await getPineconeClient();
      const index = pinecone.Index("chat-pdf");

      // Delete the entire namespace tied to this fileId
      await index.namespace(fileId).deleteAll();
      console.log(`Deleted Pinecone namespace: ${fileId}`);
    } catch (pineconeError) {
      console.error("Failed to delete Pinecone embeddings:", pineconeError);
    }

    // delete the PDF file from S3
    try {
      const bucket = process.env.AWS_S3_BUCKET || "app-pdf-storage-v100";
      const s3Key = decodeURIComponent(
        new URL(file.url).pathname.replace(/^\/+/, "")
      );

      await s3.send(
        new DeleteObjectCommand({
          Bucket: bucket,
          Key: s3Key,
        })
      );
      console.log(`Deleted S3 object: ${s3Key}`);
    } catch (s3Error) {
      console.error("Failed to delete S3 file:", s3Error);
    }

    // delete chats from db
    await db.message.deleteMany({
      where: { fileId },
    });

    await db.file.delete({
      where: { id: fileId },
    });

    return { success: true };
  } catch (error) {
    console.error("Error during chat deletion:", error);
    throw new Error("Failed to delete chat completely");
  }
}