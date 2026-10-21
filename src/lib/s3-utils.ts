import { s3 } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function getPresignedPdfUrl(fileUrl: string): Promise<string> {
  const bucket = process.env.AWS_S3_BUCKET || "app-pdf-storage-v100";
  const s3Key = decodeURIComponent(
    new URL(fileUrl).pathname.replace(/^\/+/, "")
  );

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: s3Key,
  });

  return await getSignedUrl(s3, command, { expiresIn: 3600 });
}