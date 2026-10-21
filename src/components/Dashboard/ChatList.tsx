"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useChatList } from "@/hooks/useChatList";
import { ChatSkeleton } from "../ChatSkeleton";
import { DeleteChatModal } from "./DeleteChatModal";
import { ChatListItem } from "./ChatListItem";

export const ChatList = () => {
  const {
    chats,
    loading,
    deletingId,
    downloading,
    chatToDelete,
    setChatToDelete,
    handleConfirmDelete,
    handleDownload,
  } = useChatList();

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
                <ChatListItem
                  key={chat.id}
                  chat={chat}
                  deletingId={deletingId}
                  downloading={downloading}
                  onDeleteClick={setChatToDelete}
                  onDownloadClick={handleDownload}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        <DeleteChatModal
          chatToDelete={chatToDelete}
          onClose={() => setChatToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      </AnimatePresence>
    </section>
  );
};