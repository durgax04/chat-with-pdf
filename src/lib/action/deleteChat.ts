"use server";

import { db } from "../prisma";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../s3";


const deleteChat = async (id: string) => {
  const file = await db.file.findUnique({
    where: { id },
  });

  if (!file) {
    throw new Error("File not found");
  }

  // Extract S3 key from file URL
  const url = new URL(file.url);
  const key = url.pathname.slice(1); 

  await s3.send(
    new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: key,
    })
  );

  await db.file.delete({
    where: { id },
  });
};

export default deleteChat;
