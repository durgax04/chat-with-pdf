import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const fileId = req.nextUrl.searchParams.get("fileId");

  if (!fileId) {
    return NextResponse.json({ error: "Missing fileId" }, { status: 400 });
  }

  const messages = await db.message.findMany({
    where: {
      fileId,
    },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(messages);
}
