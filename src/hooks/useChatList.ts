import { useState, useEffect } from "react";
import deleteChat from "@/lib/action/deleteChat";
import { Chat } from "@/types/chat";
import { CHAT_LIST_ERRORS, CHAT_LIST_SUCCESS } from "@/constants/errors_useChatList";
import toast from "react-hot-toast";
import { getChats } from "@/lib/action/getChats";


export const useChatList = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [chatToDelete, setChatToDelete] = useState<Chat | null>(null);

  async function fetchChatsService() {
    const data = await getChats();
    return data;
  }
  
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data = await fetchChatsService();
        setChats(data);
      } catch (error) {
        console.error(CHAT_LIST_ERRORS.FETCH_FAILED, error);
        toast.error(CHAT_LIST_ERRORS.FETCH_FAILED);
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

    setChatToDelete(null);
    setDeletingId(idToDelete);

    try {
      await deleteChat(idToDelete);
      setChats((prev) => prev.filter((chat) => chat.id !== idToDelete));
      toast.success(CHAT_LIST_SUCCESS.DELETE);
    } catch (error) {
      console.error(CHAT_LIST_ERRORS.DELETE_FAILED, error);
      toast.error(CHAT_LIST_ERRORS.DELETE_FAILED);
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
        throw new Error(data.error || CHAT_LIST_ERRORS.DOWNLOAD_LINK_FAILED);
      }

      const link = document.createElement("a");
      link.href = data.url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(CHAT_LIST_ERRORS.DOWNLOAD_FAILED, error);
      toast.error(CHAT_LIST_ERRORS.DOWNLOAD_FAILED);
    } finally {
      setDownloading(null);
    }
  };

  return {
    chats,
    loading,
    deletingId,
    downloading,
    chatToDelete,
    setChatToDelete,
    handleConfirmDelete,
    handleDownload,
  };
};