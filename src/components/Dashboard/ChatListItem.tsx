"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, MessageSquare, Download, Trash2, Loader2 } from "lucide-react";
import { Chat } from "@/types/chat";
import { Button } from "@/components/ui/button";

interface ChatListItemProps {
  chat: Chat;
  deletingId: string | null;
  downloading: string | null;
  onDeleteClick: (chat: Chat) => void;
  onDownloadClick: (fileId: string, fileName: string) => void;
}

export const ChatListItem = ({
  chat,
  deletingId,
  downloading,
  onDeleteClick,
  onDownloadClick,
}: ChatListItemProps) => {
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
          <Button size="sm" variant="secondary" title="Open Chat" disabled={isItemDeleting}>
            <MessageSquare className="w-4 h-4" />
          </Button>
        </Link>

        {/* Presigned Download Button */}
        <Button
          size="sm"
          variant="outline"
          title="Download PDF"
          onClick={() => onDownloadClick(chat.id, chat.name)}
          disabled={downloading === chat.id || isItemDeleting}
        >
          {downloading === chat.id ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
        </Button>

        {/* Delete Button */}
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onDeleteClick(chat)}
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
};