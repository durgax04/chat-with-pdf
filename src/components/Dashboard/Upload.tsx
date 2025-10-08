"use client";

import { useRef, useState } from "react";
import { Upload, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { getSignedURL } from "@/lib/action/url_action";
import { UploadState } from "@/types/upload";

export const UploadCard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE_SIZE_MB = 15;

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    if (selected) {
      const fileSizeMB = selected.size / (1024 * 1024);
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        toast.error(
          `File is too large. Maximum allowed size is ${MAX_FILE_SIZE_MB} MB.`
        );
        setFile(null);
        setUploadState("idle");
        return;
      }
    }

    setFile(selected);
    setUploadState("idle");
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please choose a file first");
      return;
    }

    try {
      setUploadState("uploading");

      const getSignedURLResult = await getSignedURL(file);
      if (!getSignedURLResult.success) {
        setUploadState("error");
        toast.error("Failed to get signed URL");
        return;
      }

      const { url, fileId } = getSignedURLResult.success;
      const publicUrl = url.split("?")[0]; // // remove query params to get the public object URL

      const res = await fetch(url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      if (!res.ok) {
        setUploadState("error");
        toast.error("Upload failed");
        return;
      }

      await fetch("/api/process-pdf", {
        method: "POST",
        body: JSON.stringify({ fileId, url: publicUrl }),
        headers: { "Content-Type": "application/json" },
      });

      setUploadState("success");
      toast.success("Upload successfully");
      router.push(`/chat/${fileId}?pdfUrl=${encodeURIComponent(publicUrl)}`);
      setFile(null);
    } catch (error) {
      console.log("Upload error:", error);
      setUploadState("error");
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Upload Your PDF
        </h2>

        <Card className="p-8 bg-[#1A1D23] border border-[#23293D] shadow-[0_0_15px_rgba(35,93,230,0.4)] transition-all duration-300">
          <div className="flex flex-col items-center gap-6">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleChange}
              className="hidden"
            />

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
              <Button
                variant="default"
                size="lg"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadState === "uploading"}
                className="w-full sm:w-auto bg-primary text-white font-semibold transition-transform duration-300 hover:scale-105"
              >
                Choose File
              </Button>

              <span className="text-gray-400 text-sm truncate max-w-[200px] sm:max-w-[300px]">
                {file ? file.name : "No file chosen (Maximum pdf size is 14mb)"}
              </span>
              <span className="text-gray-400 text-sm truncate max-w-[200px] sm:max-w-[300px]">
                {(file?.size! / 1024).toFixed(2)} KB {" "}&#40;
                {(file?.size! / (1024 * 1024)).toFixed(2)} MB&#41;
              </span>
              <span className="text-gray-400 text-sm truncate max-w-[200px] sm:max-w-[300px]">
                Maximum - 14MB
              </span>
            </div>

            {uploadState === "idle" && file && (
              <Button
                size="lg"
                onClick={handleUpload}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white font-semibold transition-transform duration-300 hover:scale-105 gap-2"
              >
                <Upload className="w-5 h-5" />
                Upload
              </Button>
            )}

            {uploadState === "uploading" && (
              <div className="flex flex-col items-center gap-3 animate-pulse">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                <p className="text-sm text-gray-400 animate-pulse">
                  Uploading {file?.name}...
                </p>
              </div>
            )}

            {uploadState === "success" && (
              <div className="flex flex-col items-center gap-3">
                <CheckCircle2 className="w-12 h-12 text-green-500 animate-bounce" />
                <p className="text-green-500 font-medium">Upload Complete!</p>
              </div>
            )}

            {uploadState === "error" && (
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle className="w-6 h-6" />
                  <p className="font-medium">
                    Upload failed. Please try again.
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={handleUpload}
                  className="hover:scale-105 transition-transform duration-300"
                >
                  Retry
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};
