import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { MessageProps } from "@/types/chat";
import { getUserMessageCount } from "@/lib/action/chatActions";
import { CHAT_ERRORS } from "@/constants/errors_useChatInterface";

export const useChatInterface = (fileId: string) => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"PROCESSING" | "SUCCESS" | "FAILED">("PROCESSING");
  const [loading, setLoading] = useState(false);
  const [isLimitReached, setIsLimitReached] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch message count and chat history when PDF is ready
  useEffect(() => {
    async function loadData() {
      try {
        const { count, error } = await getUserMessageCount();
        if (!error && count >= 4) {
          setIsLimitReached(true);
        }

        const msgRes = await fetch(`/api/messages?fileId=${fileId}`);
        const msgData = await msgRes.json();
        const loadedMessages = msgData.map((m: any, idx: number) => ({
          id: `msg-${idx}`,
          text: m.content,
          isUser: m.role === "USER",
        }));
        setMessages(loadedMessages);
      } catch (err) {
        console.error(CHAT_ERRORS.LOAD_DATA, err);
      }
    }
    if (status === "SUCCESS") loadData();
  }, [fileId, status]);

  // Poll PDF processing status
  useEffect(() => {
    let interval: NodeJS.Timeout;

    async function checkStatus() {
      try {
        const res = await fetch(`/api/file-status?fileId=${fileId}`);
        const data = await res.json();
        setStatus(data.status);
        if (data.status === "SUCCESS" || data.status === "FAILED") {
          clearInterval(interval);
        }
      } catch (err) {
        console.error(CHAT_ERRORS.STATUS_CHECK, err);
        setStatus("FAILED");
      }
    }

    checkStatus();
    interval = setInterval(checkStatus, 3000);

    return () => clearInterval(interval);
  }, [fileId]);

  async function askQuestion() {
    if (!input.trim() || status !== "SUCCESS" || isLimitReached) return;

    const question = input;
    setInput("");
    setMessages((prev) => [...prev, { id: uuidv4(), text: question, isUser: true }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ question, fileId }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.status === 429) {
        setIsLimitReached(true);
        setMessages((prev) => [
          ...prev,
          {
            id: uuidv4(),
            text: data.error || CHAT_ERRORS.RATE_LIMIT,
            isUser: false,
          },
        ]);
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || CHAT_ERRORS.DEFAULT_CHAT);
      }

      setMessages((prev) => [...prev, { id: uuidv4(), text: data.answer, isUser: false }]);
    } catch (err) {
      console.error("Ask failed:", err);
      setMessages((prev) => [
        ...prev,
        { id: uuidv4(), text: CHAT_ERRORS.DEFAULT_CHAT, isUser: false },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askQuestion();
    }
  };

  return {
    messages,
    input,
    setInput,
    status,
    loading,
    isLimitReached,
    messagesEndRef,
    askQuestion,
    handleKeyDown,
  };
};