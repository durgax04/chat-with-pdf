"use server";

import { s3 } from "@/lib/s3";
import crypto from "crypto";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { db } from "../prisma";
import { getUserSession } from "../auth/session";

export const getSignedURL = async (file: File) => {

  const session = await getUserSession();

  if (!session) {
    return { failure: "Not authenticated" };
  }

  if (file.size > 15 * 1024 * 1024) {
    return { failure: "File is too large. Max allowed is 15MB." };
  }

  // URl encrypption
  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  const checkSum = await computeSHA256(file);

  const generateFileName = (bytes = 32) =>
    crypto.randomBytes(bytes).toString("hex");

  const fileNameHex = generateFileName();

  const putObjCommand = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: fileNameHex,
    ChecksumSHA256: checkSum,
    Metadata: {
      userId: session.id,
    },
    ContentType: file.type,
  });
  const fileUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileNameHex}`;

  const signedURL = await getSignedUrl(s3, putObjCommand, {
    expiresIn: 60,
  });

  console.log(signedURL);

  const savedFile = await db.file.create({
    data: {
      name: file.name,
      url: fileUrl,
      userId: session.id, // TODO: replace with real user id
      uploadStatus: "PROCESSING"
    },
  });

  console.log(savedFile);

  return {
    success: {
      url: signedURL,
      fileId: savedFile.id,
    },
  };
};

