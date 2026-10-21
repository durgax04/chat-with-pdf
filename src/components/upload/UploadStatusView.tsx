"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CloudUpload, Loader2, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExtendedUploadState } from "@/types/upload";
import { MAX_FILE_SIZE_MB } from "@/constants/upload";

interface UploadStatusViewProps {
  uploadState: ExtendedUploadState;
  uploadProgress: number;
  isLimitReached: boolean;
  limitReason: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileSelect: (file?: File) => void;
}

export const UploadStatusView = ({
  uploadState,
  uploadProgress,
  isLimitReached,
  limitReason,
  fileInputRef,
  onFileSelect,
}: UploadStatusViewProps) => {
  return (
    <AnimatePresence mode="wait">
      {uploadState === "idle" && (
        <motion.div key="idle" className="text-center flex flex-col items-center gap-4">
          <CloudUpload className={`w-12 h-12 ${isLimitReached ? "text-muted-foreground" : "text-primary"}`} />
          <h3 className="text-xl font-semibold">
            {isLimitReached ? `Upload Locked: ${limitReason}` : "Drag & Drop your PDF"}
          </h3>
          <p className="text-muted-foreground text-sm">
            {isLimitReached
              ? "You have reached your free plan limit. Please contact support."
              : `Max file size: ${MAX_FILE_SIZE_MB}MB`}
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            hidden
            disabled={isLimitReached}
            onChange={(e) => onFileSelect(e.target.files?.[0])}
          />

          {!isLimitReached && (
            <Button onClick={() => fileInputRef.current?.click()}>Choose File</Button>
          )}
        </motion.div>
      )}

      {uploadState === "uploading" && (
        <motion.div key="uploading" className="w-full text-center">
          <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-primary" />
          <div className="flex justify-between text-sm mb-2 font-medium">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
        </motion.div>
      )}

      {uploadState === "preparing" && (
        <motion.div key="processing" className="w-full text-center flex flex-col items-center">
          <Loader2 className="w-12 h-12 mb-6 animate-spin text-primary" />
          <p className="font-semibold text-lg">Processing your PDF...</p>
          <p className="text-sm text-muted-foreground mt-1">
            It takes a few seconds please wait, your PDF is processing, afterward you will be redirected.
          </p>
        </motion.div>
      )}

      {uploadState === "success" && (
        <motion.div key="success" className="text-center">
          <Check className="w-10 h-10 mx-auto mb-4 text-green-500" />
          <p className="font-medium text-green-500">Ready!</p>
        </motion.div>
      )}

      {uploadState === "error" && (
        <motion.div key="error" className="text-center">
          <AlertCircle className="w-10 h-10 mx-auto mb-4 text-red-500" />
          <p className="text-red-500 mb-4">Upload failed</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};