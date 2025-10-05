"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import deleteChat from "@/lib/action/deleteChat";
import { getChats } from "@/lib/action/getChats";
import { Chat } from "@/types/chat";
import SkeletonLoader from "../ChatSkeleton";

const AllChats = () => {
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
    <div className="w-full flex flex-col items-center text-white">
      <h1 className="text-xl font-semibold mb-4">All Chats</h1>

      <div className="w-full max-w-2xl space-y-3">
        {loading ? (
          <>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </>
        ) : chats.length === 0 ? (
          <p className="text-gray-400 text-center">No chats yet.</p>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className="rounded-lg border border-white/10 bg-white/5 p-4 flex flex-col gap-2 hover:bg-white/10 transition"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">{chat.name}</p>
                <small className="text-xs text-gray-400">
                  {new Date(chat.createdAt).toLocaleString()}
                </small>
              </div>

              <div className="flex gap-4 text-sm">
                <Link
                  href={`/chat/${chat.id}`}
                  className="text-blue-400 hover:underline"
                >
                  Open Chat
                </Link>
                <Link
                  href={chat.url}
                  className="text-blue-400 hover:underline"
                  target="_blank"
                >
                  Open File
                </Link>
                <button
                  onClick={() => handleDelete(chat.id)}
                  disabled={deleting === chat.id}
                  className="text-red-400 hover:text-red-300 disabled:opacity-50"
                >
                  {deleting === chat.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllChats;
