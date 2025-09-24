"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { getSignedURL } from "@/lib/action/url_action";
import { useRouter } from "next/navigation";

const Form = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please choose a file first");
      return;
    }

    try {
      setLoading(true);

      const getSignedURLResult = await getSignedURL(file);

      if (!getSignedURLResult.success) {
        toast.error("Failed to get signed URL");
        return;
      }

      const { url, fileId } = getSignedURLResult.success!;

      const res = await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!res.ok) {
        toast.error("Upload failed");
        return;
      }

      await fetch("/api/process-pdf", {
        method: "POST",
        body: JSON.stringify({
          fileId: getSignedURLResult.success.fileId,
          url,
        }),
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Upload successfully");
      router.push(`/chat/${fileId}`);
      setFile(null);
    } catch (error) {
      console.log("Error in form.tsx---", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center">
      <div className="p-6 border border-neutral-600 rounded-lg w-fit space-y-4">
        <input
          type="file"
          accept=".pdf,image/png"
          onChange={handleChange}
          className="block text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 
                   file:rounded-md file:border-0 
                   file:text-sm file:font-semibold 
                   file:bg-blue-600 file:text-white 
                   hover:file:bg-blue-700 cursor-pointer"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </main>
  );
};

export default Form;
