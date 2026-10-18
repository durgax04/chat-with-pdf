import ChatPageClient from "@/components/Chat/ChatPageClient";
import { getUserSession } from "@/lib/auth/session";
import { redirect, notFound } from "next/navigation";
import { db } from "@/lib/prisma";
import { s3 } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Separate type for Next.js route params
interface PageProps {
  params: Promise<{ fileId: string }>;
}

export default async function ChatPage({ params }: PageProps) {
  const session = await getUserSession();
  if (!session) {
    redirect("/");
  }

  const { fileId } = await params;

  const file = await db.file.findUnique({
    where: { id: fileId },
  });

  if (!file) {
    notFound();
  }

  const bucket = process.env.AWS_S3_BUCKET || "app-pdf-storage-v100";
  const s3Key = decodeURIComponent(
    new URL(file.url).pathname.replace(/^\/+/, "")
  );

  let presignedPdfUrl = "";
  try {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: s3Key,
    });
    presignedPdfUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
  } catch (error) {
    console.error("Failed to generate presigned URL:", error);
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <ChatPageClient fileId={fileId} pdfUrl={presignedPdfUrl} />
    </div>
  );
}