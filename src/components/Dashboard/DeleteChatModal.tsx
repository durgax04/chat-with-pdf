"use client";

import { motion } from "framer-motion";
import { Chat } from "@/types/chat";
import { Button } from "@/components/ui/button";

interface DeleteChatModalProps {
  chatToDelete: Chat | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteChatModal = ({
  chatToDelete,
  onClose,
  onConfirm,
}: DeleteChatModalProps) => {
  if (!chatToDelete) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
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
            <span className="font-medium text-foreground">"{chatToDelete.name}"</span>? This will
            permanently remove the chat history and associated embeddings.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-red-500" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </motion.div>
    </div>
  );
};