"use client";

import { MessageSquare, FileText, Trash2, Download, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import deleteChat from "@/lib/action/deleteChat";
import Link from "next/link";
import { getChats } from "@/lib/action/getChats";
import { Chat } from "@/types/chat";
import { Button } from "../ui/button";
import { ChatSkeleton } from "../ChatSkeleton";
import toast from "react-hot-toast";

export const ChatList = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [chatToDelete, setChatToDelete] = useState<Chat | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data = await getChats();
        setChats(data);
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, []);

  const handleConfirmDelete = async () => {
    if (!chatToDelete) return;

    const targetChat = chatToDelete;
    const idToDelete = targetChat.id;

    // 1. Immediately exit the modal dialog
    setChatToDelete(null);

    // 2. Mark this specific card as deleting (shows background spinner/disabled state)
    setDeletingId(idToDelete);

    try {
      // 3. Background deletion process running
      await deleteChat(idToDelete);

      // 4. Remove from list once confirmed
      setChats((prev) => prev.filter((chat) => chat.id !== idToDelete));
      toast.success("Chat deleted successfully");
    } catch (error) {
      console.error("Error deleting chat:", error);
      toast.error("Failed to delete chat. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleDownload = async (fileId: string, fileName: string) => {
    try {
      setDownloading(fileId);

      const res = await fetch(`/api/file/${fileId}/download`);
      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Failed to generate download link");
      }

      const link = document.createElement("a");
      link.href = data.url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download file");
    } finally {
      setDownloading(null);
    }
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">All Chats</h2>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <ChatSkeleton />
            </motion.div>
          ) : chats.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-muted-foreground py-10"
            >
              No chats yet. Upload a PDF to get started!
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {chats.map((chat) => {
                const isItemDeleting = deletingId === chat.id;

                return (
                  <motion.div
                    key={chat.id}
                    layout
                    whileHover={!isItemDeleting ? { scale: 1.01 } : {}}
                    className={`rounded-xl bg-card border p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-all ${
                      isItemDeleting ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    {/* Left Section */}
                    <div className="flex items-start gap-3 flex-1">
                      <FileText className="w-5 h-5 text-primary mt-1" />
                      <div className="flex flex-col">
                        <span className="font-medium truncate">{chat.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(chat.createdAt).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-wrap items-center">
                      {/* Chat Navigation */}
                      <Link href={`/chat/${chat.id}`}>
                        <Button
                          size="sm"
                          variant="secondary"
                          title="Open Chat"
                          disabled={isItemDeleting}
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </Link>

                      {/* Presigned Download Button */}
                      <Button
                        size="sm"
                        variant="outline"
                        title="Download PDF"
                        onClick={() => handleDownload(chat.id, chat.name)}
                        disabled={downloading === chat.id || isItemDeleting}
                      >
                        {downloading === chat.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Download className="w-4 h-4" />
                        )}
                      </Button>

                      {/* Delete Button (Shows spinner while deleting in background) */}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setChatToDelete(chat)}
                        disabled={isItemDeleting}
                        title="Delete Chat"
                      >
                        {isItemDeleting ? (
                          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                        ) : (
                          <Trash2 className="w-4 h-4 text-red-500" />
                        )}
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {chatToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setChatToDelete(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-md bg-card border rounded-2xl p-6 shadow-xl z-10 space-y-4"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Delete Chat</h3>
                <p className="text-sm text-muted-foreground">
                  Are you sure you want to delete{" "}
                  <span className="font-medium text-foreground">
                    "{chatToDelete.name}"
                  </span>
                  ? This will permanently remove the chat history and associated
                  embeddings.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setChatToDelete(null)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-red-500"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};