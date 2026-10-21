"use client";

import ChatInterface from "@/components/Chat/ChatInterface";
import { PdfViewer } from "./PdfViewer";

export interface ChatPageClientProps {
  fileId: string;
  pdfUrl?: string;
}

export default function ChatPageClient({ fileId, pdfUrl }: ChatPageClientProps) {
  return (
    <div className="h-screen flex flex-col lg:flex-row">
      <PdfViewer pdfUrl={pdfUrl} />

      {/* Chat Section */}
      <div className="h-screen w-full lg:h-screen lg:w-1/2 p-4 lg:p-6">
        <ChatInterface fileId={fileId} />
      </div>
    </div>
  );
}