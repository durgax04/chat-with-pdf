import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const fileId = req.nextUrl.searchParams.get("fileId");
    if (!fileId) {
        return NextResponse.json({
            error: "Missing fileId"
        }, {status: 400})
    }

    const file = await db.file.findUnique({
        where: {
            id: fileId
        },
        select: {
            id: true,
            uploadStatus: true
        }
    });

    if (!file) {
        return NextResponse.json({
            error: "Not found"
        }, { status: 404 })
    }

    // Indicate to client whether it should keep polling
  const isFinal =
    file.uploadStatus === "SUCCESS" ||
    file.uploadStatus === "FAILED";

    return NextResponse.json({ status: file.uploadStatus })
}