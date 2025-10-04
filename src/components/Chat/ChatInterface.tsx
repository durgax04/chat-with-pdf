"use client";

import { useState, useRef, useEffect } from "react";
import { Send, CheckCircle2, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = {
  id: string;
  text: string;
  isUser: boolean;
};

const ChatInterface = ({ fileId }: { fileId: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"PROCESSING" | "SUCCESS" | "FAILED">(
    "PROCESSING"
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
        }))
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
      { id: crypto.randomUUID(), text: question, isUser: true },
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
        { id: crypto.randomUUID(), text: data.answer, isUser: false },
      ]);
    } catch (err) {
      console.error("Ask failed:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: "⚠️ Something went wrong. Please try again.",
          isUser: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !loading) {
      askQuestion();
    }
  }

  return (
    <div className="h-full flex flex-col bg-card rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2">
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
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && status === "SUCCESS" && !loading && (
          <div className="text-center text-muted-foreground py-8">
            <p className="text-sm">Ask a question about the PDF to get started</p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 text-sm whitespace-pre-wrap ${
                message.isUser
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-card-foreground"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}

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
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask something about the PDF..."
            disabled={status !== "SUCCESS" || loading}
            className="flex-1"
          />
          <Button
            onClick={askQuestion}
            disabled={status !== "SUCCESS" || loading || !input.trim()}
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
