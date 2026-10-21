"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useUpload } from "@/hooks/useUpload";
import { UploadStatusView } from "@/components/upload/UploadStatusView";

export const UploadCard = () => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    uploadState,
    uploadProgress,
    isLimitReached,
    limitReason,
    isCheckingLimits,   
    handleFile,
  } = useUpload(); // all upload calls

  if (isCheckingLimits) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-10 flex justify-center items-center h-[260px] rounded-2xl border-2 border-dashed border-border bg-card animate-pulse">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground">Checking account status...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto px-4"
    >
      <div
        onDrop={(e) => {
          e.preventDefault();
          if (isLimitReached) return;
          setIsDragging(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!isLimitReached) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        className={`relative rounded-2xl p-12 border-2 border-dashed transition-all ${
          isLimitReached
            ? "border-muted bg-muted/20 cursor-not-allowed opacity-75"
            : isDragging
            ? "border-primary bg-primary/5"
            : "border-border bg-card"
        }`}
      >
        <UploadStatusView
          uploadState={uploadState}
          uploadProgress={uploadProgress}
          isLimitReached={isLimitReached}
          limitReason={limitReason}
          fileInputRef={fileInputRef}
          onFileSelect={handleFile}
        />
      </div>
    </motion.section>
  );
};