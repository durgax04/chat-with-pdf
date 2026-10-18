"use client";

import { Suspense } from "react";
import ChatInterface from "@/components/Chat/ChatInterface";

// 1. Explicitly type the props accepted by ChatPageClient
export interface ChatPageClientProps {
  fileId: string;
  pdfUrl?: string;
}

// 2. Destructure fileId and pdfUrl from props
export default function ChatPageClient({ fileId, pdfUrl }: ChatPageClientProps) {
  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {/* PDF Viewer Section */}
      <div className="bg-[#1A1D23] md:h-[50vh] lg:h-screen lg:w-1/2 p-4 lg:p-6 hidden md:block">
        {pdfUrl ? (
          <Suspense fallback={<p className="text-gray-400">Loading PDF...</p>}>
            <iframe
              src={pdfUrl}
              className="w-full h-full border-none rounded-lg"
              title="PDF Viewer"
            />
          </Suspense>
        ) : (
          <p className="text-gray-400 text-center mt-10">
            No PDF found for this chat or permission denied.
          </p>
        )}
      </div>

      {/* Chat Section */}
      <div className="h-screen w-full lg:h-screen lg:w-1/2 p-4 lg:p-6">
        <ChatInterface fileId={fileId} />
      </div>
    </div>
  );
}