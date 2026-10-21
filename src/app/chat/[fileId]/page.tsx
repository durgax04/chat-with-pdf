import ChatPageClient from "@/components/Chat/ChatPageClient";
import { getUserSession } from "@/lib/auth/session";
import { redirect, notFound } from "next/navigation";
import { db } from "@/lib/prisma";
import { getPresignedPdfUrl } from "@/lib/s3-utils";

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

  let presignedPdfUrl = "";
  try {
    presignedPdfUrl = await getPresignedPdfUrl(file.url);
  } catch (error) {
    console.error("Failed to generate presigned URL:", error);
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <ChatPageClient fileId={fileId} pdfUrl={presignedPdfUrl} />
    </div>
  );
}