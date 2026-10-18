import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { s3 } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const { fileId } = await params;

    const file = await db.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const bucket = process.env.AWS_S3_BUCKET || "app-pdf-storage-v100";
    const s3Key = decodeURIComponent(
      new URL(file.url).pathname.replace(/^\/+/, "")
    );

    // Forces browser to download instead of displaying in a tab
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: s3Key,
      ResponseContentDisposition: `attachment; filename="${encodeURIComponent(file.name)}"`,
    });

    // Valid for 60 seconds (enough to start the download stream)
    const downloadUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

    return NextResponse.json({ url: downloadUrl });
  } catch (err) {
    console.error("Presigned download URL error:", err);
    return NextResponse.json(
      { error: "Failed to generate download URL" },
      { status: 500 }
    );
  }
}