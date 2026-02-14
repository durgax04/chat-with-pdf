"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CloudUpload,
  Loader2,
  Check,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { getSignedURL } from "@/lib/action/url_action";

type ExtendedUploadState =
  | "idle"
  | "uploading"
  | "preparing"
  | "success"
  | "error";

export const UploadCard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<ExtendedUploadState>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const MAX_FILE_SIZE_MB = 4;

  const handleFile = (selected?: File) => {
    if (!selected) return;

    if (selected.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }

    const fileSizeMB = selected.size / (1024 * 1024);
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      toast.error(`File too large. Max allowed size is ${MAX_FILE_SIZE_MB} MB`);
      return;
    }

    setFile(selected);
    uploadFile(selected);
  };

  const uploadFile = async (file: File) => {
    try {
      setUploadState("uploading");
      setShowProgressBar(false);
      setUploadProgress(0);
      setTimeout(() => {
        setShowProgressBar(true);
      }, 600);

      const getSignedURLResult = await getSignedURL(file);
      if (!getSignedURLResult.success) {
        throw new Error("Failed to get signed URL");
      }

      const { url, fileId } = getSignedURLResult.success;
      const publicUrl = url.split("?")[0];

      // Real Upload with Progress
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", url);

        xhr.setRequestHeader("Content-Type", file.type);

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(percent);
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200) resolve();
          else reject(new Error("Upload failed"));
        };

        xhr.onerror = () => reject(new Error("Upload failed"));

        xhr.send(file);
      });

      // Preparing phase
      setUploadState("preparing");

      await fetch("/api/process-pdf", {
        method: "POST",
        body: JSON.stringify({ fileId, url: publicUrl }),
        headers: { "Content-Type": "application/json" },
      });

      setUploadState("success");
      toast.success("Upload successful!");

      setTimeout(() => {
        router.push(`/chat/${fileId}?pdfUrl=${encodeURIComponent(publicUrl)}`);
      }, 1000);
    } catch (error) {
      console.error(error);
      setUploadState("error");
      toast.error("Upload failed. Please try again.");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto px-4 py-10"
    >
      <div
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        className={`relative rounded-2xl p-12 border-2 border-dashed transition-all
        ${
          isDragging ? "border-primary bg-primary/5" : "border-border bg-card"
        }`}
      >
        <AnimatePresence mode="wait">
          {uploadState === "idle" && (
            <motion.div
              key="idle"
              className="text-center flex flex-col items-center gap-4"
            >
              <CloudUpload className="w-12 h-12 text-primary" />
              <h3 className="text-xl font-semibold">Drag & Drop your PDF</h3>
              <p className="text-muted-foreground text-sm">
                Max file size: {MAX_FILE_SIZE_MB}MB
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                hidden
                onChange={(e) => handleFile(e.target.files?.[0])}
              />

              <Button onClick={() => fileInputRef.current?.click()}>
                Choose File
              </Button>
            </motion.div>
          )}

          {uploadState === "uploading" && (
            <motion.div key="uploading" className="w-full text-center">
              <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-primary" />

              <div className="flex justify-between text-sm mb-2 font-medium">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>

              <AnimatePresence>
                {showProgressBar && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.4 }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {uploadState === "preparing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full text-center flex flex-col items-center"
            >
              {/* Animated Spinner */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 1.2,
                }}
                className="w-12 h-12 mb-6"
              >
                <Loader2
                  className="w-full h-full text-primary"
                  strokeWidth={1.5}
                />
              </motion.div>

              <p className="font-semibold text-lg">Processing your PDF...</p>

              <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                This may take a few seconds.
                <br />
                You’ll be automatically redirected once it’s ready.
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
              <Button
                variant="destructive"
                onClick={() => file && uploadFile(file)}
              >
                Retry
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};
