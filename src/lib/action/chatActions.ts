"use server";

import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export async function getUserMessageCount() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return { count: 0, error: "Unauthorized" };
  }

  const dbUser = await db.user.findUnique({
    where: { email: session.user.email },
    select: { messageCount: true },
  });

  if (!dbUser) {
    return { count: 0, error: "User not found" };
  }

  return { count: dbUser.messageCount, error: null };
}

export async function getUserUsageStats() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return { pdfCount: 0, messageCount: 0, error: "Unauthorized" };
  }

  const dbUser = await db.user.findUnique({
    where: { email: session.user.email },
    select: { pdfUploadCount: true, messageCount: true },
  });

  if (!dbUser) {
    return { pdfCount: 0, messageCount: 0, error: "User not found" };
  }

  return {
    pdfCount: dbUser.pdfUploadCount,
    messageCount: dbUser.messageCount,
    error: null,
  };
}

export async function checkUserLimits() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return { canUpload: false, reason: "Unauthorized" };
  }

  const dbUser = await db.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, messageCount: true },
  });

  if (!dbUser) {
    return { canUpload: false, reason: "User not found" };
  }

  // 1. Check actual PDF/file count
  const fileCount = await db.file.count({
    where: { userId: dbUser.id },
  });

  // 2. Check limits (Max 2 PDFs, Max 4 Messages)
  if (fileCount >= 2) {
    return { canUpload: false, reason: "PDF limit reached (2/2)" };
  }

  if (dbUser.messageCount >= 4) {
    return { canUpload: false, reason: "Message credit limit reached (4/4)" };
  }

  return { canUpload: true, reason: null };
}