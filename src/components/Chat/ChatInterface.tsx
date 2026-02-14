"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  CheckCircle2,
  Loader2,
  XCircle,
  LayoutDashboard,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import { MessageProps } from "@/types/chat";
import { Textarea } from "../ui/textarea";
import { CopyAnswerButton } from "../CopyAnswerButton";
import { SkeletonLoader } from "../ChatSkeleton";

const ChatInterface = ({ fileId }: { fileId: string }) => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"PROCESSING" | "SUCCESS" | "FAILED">(
    "PROCESSING",
  );
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch existing messages when PDF is ready
  useEffect(() => {
    async function loadMessages() {
      const res = await fetch(`/api/messages?fileId=${fileId}`);
      const data = await res.json();
      setMessages(
        data.map((m: any, idx: number) => ({
          id: `msg-${idx}`,
          text: m.content,
          isUser: m.role === "USER",
        })),
      );
    }
    if (status === "SUCCESS") loadMessages();
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
        console.error("Status check failed:", err);
        setStatus("FAILED");
      }
    }

    checkStatus();
    interval = setInterval(checkStatus, 3000);

    return () => clearInterval(interval);
  }, [fileId]);

  async function askQuestion() {
    if (!input.trim() || status !== "SUCCESS") return;

    const question = input;
    setInput("");
    setMessages((prev) => [
      ...prev,
      { id: uuidv4(), text: question, isUser: true },
    ]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ question, fileId }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { id: uuidv4(), text: data.answer, isUser: false },
      ]);
    } catch (err) {
      console.error("Ask failed:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          text: "Something went wrong. Please try again.",
          isUser: false,
        },
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
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // optional: toast/snackbar saying "Copied"
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="h-full flex flex-col bg-card rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-6 py-3 md:py-4 border-b border-border">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          {status === "SUCCESS" && (
            <>
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">
                PDF ready. Ask your questions!
              </span>
            </>
          )}
          {status === "PROCESSING" && (
            <>
              <Loader2 className="h-5 w-5 text-yellow-500 animate-spin" />
              <span className="text-sm font-medium text-yellow-600">
                Processing PDF...
              </span>
            </>
          )}
          {status === "FAILED" && (
            <>
              <XCircle className="h-5 w-5 text-red-600" />
              <span className="text-sm font-medium text-red-600">
                Failed to process PDF
              </span>
            </>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="hidden sm:flex hover:bg-[#0da2e7] hover:text-white"
          asChild
        >
          <Link href="/dashboard">
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Dashboard
          </Link>
        </Button>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {status === "PROCESSING" && <SkeletonLoader />}

        {messages.map((message) => {
          const isAssistant = !message.isUser;

          return (
            <div
              key={message.id}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div className="relative max-w-[900px]">
                <div
                  className={`rounded-lg px-5 py-4 text-sm ${
                    message.isUser
                      ? "bg-primary text-primary-foreground font-medium whitespace-pre-wrap"
                      : "bg-muted text-card-foreground"
                  }`}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside space-y-1">
                          {children}
                        </ul>
                      ),
                      li: ({ children }) => (
                        <li className="ml-4">{children}</li>
                      ),
                    }}
                  >
                    {message.text}
                  </ReactMarkdown>
                </div>

                {isAssistant && (
                  <div className="absolute top-2 right-2">
                    <CopyAnswerButton content={message.text} />
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-muted text-card-foreground rounded-lg px-4 py-2 flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <p className="text-sm">Generating response...</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div className="px-6 py-4 border-t border-border">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask something about the PDF..."
            disabled={status !== "SUCCESS" || loading}
            className="flex-1"
          />
          <Button
            onClick={askQuestion}
            disabled={status !== "SUCCESS" || loading || !input.trim()}
            className="font-medium"
          >
            Ask
            <Send className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
