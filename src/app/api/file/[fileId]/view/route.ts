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
    // Parse key safely from stored URL or key field
    const s3Key = decodeURIComponent(
      new URL(file.url).pathname.replace(/^\/+/, "")
    );

    // Optional: force browser download instead of inline view via query param ?download=true
    const isDownload = req.nextUrl.searchParams.get("download") === "true";

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: s3Key,
      ResponseContentDisposition: isDownload
        ? `attachment; filename="${encodeURIComponent(file.name)}"`
        : `inline; filename="${encodeURIComponent(file.name)}"`,
    });

    // Valid for 1 hour
    const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return NextResponse.json({ url: presignedUrl });
  } catch (err) {
    console.error("Presigned GET URL error:", err);
    return NextResponse.json(
      { error: "Could not generate file access URL" },
      { status: 500 }
    );
  }
}