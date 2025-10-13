"use client";

import { MessageSquare, FileText, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import deleteChat from "@/lib/action/deleteChat";
import Link from "next/link";

import { getChats } from "@/lib/action/getChats";
import { Chat } from "@/types/chat";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import SkeletonLoader from "../ChatSkeleton";

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

  // Show skeleton loaders while fetching chats
  if (loading) {
    return (
      <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            All Chats
          </h2>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonLoader key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (chats.length === 0) {
    return (
      <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            All Chats
          </h2>
          <Card className="p-8 bg-[#1A1D23] border border-[#23293D] shadow-md text-center rounded-2xl">
            <p className="text-gray-400 text-lg">
              No chats yet. Upload a PDF to get started!
            </p>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          All Chats
        </h2>

        <div className="space-y-4">
          {chats.map((chat) => (
            <Card
              key={chat.id}
              className="p-6 bg-[#1A1D23] border border-[#23293D]  rounded-2xl shadow hover:shadow-[0_0_15px_rgba(35,93,230,0.4)] transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1 truncate">
                    {chat.name}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  {/* Open Chat */}
                  <p className="text-white/50">
                    Created at:{" "}
                    {new Date(chat.createdAt).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <Link
                    href={{
                      pathname: `/chat/${chat.id}`,
                      query: { pdfUrl: chat.url },
                    }}
                    className="flex items-center gap-2 px-3 md:py-1.5 xl:py-1.5 lg:md:py-1.5 py-2 bg-primary text-white rounded-md text-sm font-medium transition-transform duration-300 hover:scale-105"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="hidden sm:inline">Open Chat</span>
                    <span className="inline sm:hidden">Chat</span>
                  </Link>

                  <Button
                    size="sm"
                    variant="secondary"
                    className="gap-2 bg-gray-700 hover:bg-gray-600 text-white transition-transform duration-300 hover:scale-105"
                  >
                    <FileText className="w-4 h-4" />
                    <Link
                      href={chat.url}
                      className="text-blue-400 hover:underline hidden sm:inline"
                      target="_blank"
                    >
                      Open File
                    </Link>
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(chat.id)}
                    className="gap-2 bg-red-600 hover:bg-red-500 text-white transition-transform duration-300 hover:scale-105"
                  >
                    <Trash2 className="w-4 h-4" />
                    {deleting === chat.id ? "Deleting..." : ""}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
