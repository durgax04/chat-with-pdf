"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import ChatInterface from "@/components/Chat/ChatInterface";

export default function ChatPageClient() {
  const params = useParams();
  const fileId = params.fileId as string;

  const searchParams = useSearchParams();
  const pdfUrl = searchParams.get("pdfUrl");
  console.log(pdfUrl);

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {/* PDF Viewer Section */}
      <div className="bg-[#1A1D23] h-[50vh] lg:h-screen lg:w-1/2 p-4 lg:p-6">
        {pdfUrl ? (
          <Suspense fallback={<p className="text-gray-400">Loading PDF...</p>}>
            <iframe
              src={pdfUrl}
              width="100%"
              height="800px"
              style={{ border: "none" }}
              title="PDF Viewer"
            />
          </Suspense>
        ) : (
          <p className="text-gray-400 text-center mt-10">
            No PDF found for this chat.
          </p>
        )}
      </div>

      {/* Chat Section */}
      <div className="h-[50vh] lg:h-screen lg:w-1/2 p-4 lg:p-6">
        <ChatInterface fileId={fileId} />
      </div>
    </div>
  );
}
