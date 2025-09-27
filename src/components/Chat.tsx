"use client";

import { CircleCheckBig, Loader2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Message = {
  text: string;
  isUser: boolean;
};

export default function Chat({ fileId }: { fileId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"PROCESSING" | "SUCCESS" | "FAILED">(
    "PROCESSING"
  );
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom when new messages come in
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load messages when status becomes SUCCESS
  useEffect(() => {
    async function loadMessages() {
      const res = await fetch(`/api/messages?fileId=${fileId}`);
      const data = await res.json();
      setMessages(
        data.map((m: any) => ({ text: m.content, isUser: m.role === "USER" }))
      );
    }
    if (status === "SUCCESS") loadMessages();
  }, [fileId, status]);

  // Poll file status every 3s until ready/error
  useEffect(() => {
    let interval: NodeJS.Timeout;

    async function checkStatus() {
      try {
        const res = await fetch(`/api/file-status?fileId=${fileId}`);
        const data = await res.json();
        setStatus(data.status);
        if (data.status === "SUCCESS" || data.status === "FAILED") {
          clearInterval(interval); // stop polling
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
    setMessages((prev) => [...prev, { text: question, isUser: true }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ question, fileId }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      setMessages((prev) => [...prev, { text: data.answer, isUser: false }]);
    } catch (err) {
      console.error("Ask failed:", err);
      setMessages((prev) => [
        ...prev,
        { text: "Something went wrong. Please try again.", isUser: false },
      ]);
    } finally {
      setLoading(false);
    }
  }
return (
    <div className="flex flex-col h-[100vh] max-h-screen w-[366px] md:w-[600px] lg:w-[900px] sm:max-w-2xl mx-auto border rounded-lg shadow-md bg-white">
      {/* Status */}
      <div className="p-2 text-center text-sm">
        {status === "PROCESSING" && (
          <p className="text-yellow-600 animate-pulse flex justify-center gap-2 items-center">
            <Loader2 className="h-5 w-5 animate-spin"/> Processing your PDF... Please wait
          </p>
        )}
        {status === "FAILED" && (
          <p className="text-red-600 flex justify-center gap-2 items-center"> <X className="h-5 w-5"/> Error processing PDF</p>
        )}
        {status === "SUCCESS" && (
          <p className="text-green-600 flex justify-center gap-2 items-center"> <CircleCheckBig className="h-5 w-5"/>PDF ready. Ask your questions!</p>
        )}
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 bg-gray-50">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs sm:max-w-md md:max-w-lg px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
                m.isUser
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-900 rounded-bl-none"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {status === "SUCCESS" && (
        <div className="p-3 border-t bg-white flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && askQuestion()}
            placeholder="Ask something about the PDF..."
            disabled={loading}
            className="flex-1 border p-2 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-400 disabled:opacity-50"
          />
          <button
            onClick={askQuestion}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "..." : "Ask"}
          </button>
        </div>
      )}
    </div>
  );
}