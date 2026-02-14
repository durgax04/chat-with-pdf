"use client";

import { MessageSquare, FileText, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import deleteChat from "@/lib/action/deleteChat";
import Link from "next/link";
import { getChats } from "@/lib/action/getChats";
import { Chat } from "@/types/chat";
import { Button } from "../ui/button";
import { ChatSkeleton } from "../ChatSkeleton";

export const ChatList = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

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

  const handleDelete = async (id: string) => {
    try {
      setDeleting(id);
      await deleteChat(id);
      setChats((prev) => prev.filter((chat) => chat.id !== id));
    } catch (error) {
      console.error("Error deleting chat:", error);
    } finally {
      setDeleting(null);
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
              {chats.map((chat) => (
                <motion.div
                  key={chat.id}
                  layout
                  whileHover={{ scale: 1.01 }}
                  className="rounded-xl bg-card border p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-all"
                >
                  {/* Left Section */}
                  <div className="flex items-start gap-3 flex-1">
                    <FileText className="w-5 h-5 text-primary mt-1" />
                    <div className="flex flex-col">
                      <span className="font-medium truncate">
                        {chat.name}
                      </span>
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
                  <div className="flex gap-2 flex-wrap">
                    <Link
                      href={{
                        pathname: `/chat/${chat.id}`,
                        query: { pdfUrl: chat.url },
                      }}
                    >
                      <Button size="sm" variant="secondary">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </Link>

                    <Link href={chat.url} target="_blank">
                      <Button size="sm" variant="outline">
                        <FileText className="w-4 h-4" />
                      </Button>
                    </Link>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(chat.id)}
                      disabled={deleting === chat.id}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
