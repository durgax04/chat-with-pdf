import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { s3 } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { API_ERRORS } from "@/constants/errors_download";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json(API_ERRORS.UNAUTHORIZED, { status: 401 });
    }

    const { fileId } = await params;

    if (!fileId) {
      return NextResponse.json(API_ERRORS.MISSING_PARAMS, { status: 400 });
    }

    // fetch file and ensure it belongs to the authenticated user
    const dbUser = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!dbUser) {
      return NextResponse.json(API_ERRORS.USER_NOT_FOUND, { status: 404 });
    }

    const file = await db.file.findUnique({
      where: { 
        id: fileId,
        userId: dbUser.id,
      },
    });

    if (!file) {
      return NextResponse.json(API_ERRORS.FILE_NOT_FOUND, { status: 404 });
    }

    const bucket = process.env.AWS_S3_BUCKET;
    if (!bucket) {
      throw new Error("AWS_S3_BUCKET environment variable is missing.");
    }

    const s3Key = decodeURIComponent(
      new URL(file.url).pathname.replace(/^\/+/, "")
    );

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: s3Key,
      ResponseContentDisposition: `attachment; filename="${encodeURIComponent(file.name)}"`,
    });

    // Valid for 60 seconds (enough to start the download stream)
    const downloadUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

    return NextResponse.json({ url: downloadUrl });
  } catch (error: any) {
    console.error("[API_DOWNLOAD_ERROR]", {
      message: error?.message || "Unknown error",
      stack: error?.stack,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(API_ERRORS.DOWNLOAD_FAILED, { status: 500 });
  }
}