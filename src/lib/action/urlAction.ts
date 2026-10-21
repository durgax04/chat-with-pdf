"use server";

import { s3 } from "@/lib/s3";
import crypto from "crypto";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { db } from "../prisma";
import { getUserSession } from "../auth/session";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

interface SignedUrlInput {
  name: string;
  type: string;
  size: number;
}

export const getSignedURL = async ({ name, type, size }: SignedUrlInput) => {
  const session = await getUserSession();

  if (!session?.id) {
    return { failure: "Not authenticated" };
  }

  // file type
  if (type !== "application/pdf") {
    return { failure: "Only PDF files are allowed" };
  }

  // file size (4MB max)
  const MAX_FILE_SIZE = 4 * 1024 * 1024;
  if (size > MAX_FILE_SIZE) {
    return { failure: "File is too large. Max allowed is 4MB." };
  }

  // 3. Generate key preserving extension
  const sanitizedOriginalName = name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const randomHex = crypto.randomBytes(16).toString("hex");
  const s3Key = `${randomHex}-${sanitizedOriginalName}`;
  const bucket = process.env.AWS_S3_BUCKET!;

  const putObjCommand = new PutObjectCommand({
    Bucket: bucket,
    Key: s3Key,
    ContentType: type,
    Metadata: {
      userId: session.id,
    },
  });

  const signedURL = await getSignedUrl(s3, putObjCommand, { expiresIn: 600 });
  const fileUrl = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;

  const savedFile = await db.file.create({
    data: {
      name,
      url: fileUrl,
      userId: session.id,
      uploadStatus: "PROCESSING",
    },
  });

  return {
    success: {
      url: signedURL,
      fileId: savedFile.id,
    },
  };
};
export async function getUserUploadCount() {
  
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return { count: 0, error: "Unauthorized" };
  }

  const dbUser = await db.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!dbUser) {
    return { count: 0, error: "User not found" };
  }

  // Count the actual files belonging to this user in the database
  const fileCount = await db.file.count({
    where: { userId: dbUser.id }, // Make sure your File model relates to user via userId
  });

  return { count: fileCount, error: null };
}