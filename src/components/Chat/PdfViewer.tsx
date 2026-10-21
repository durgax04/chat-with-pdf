"use client";

import { Suspense } from "react";

interface PdfViewerProps {
  pdfUrl?: string;
}

export const PdfViewer = ({ pdfUrl }: PdfViewerProps) => {
  return (
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
  );
};