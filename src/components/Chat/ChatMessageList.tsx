import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Loader2 } from "lucide-react";
import { MessageProps } from "@/types/chat";
import { ChatSkeleton } from "@/components/ChatSkeleton";
import { CopyAnswerButton } from "@/components/CopyAnswerButton";

interface ChatMessageListProps {
  status: "PROCESSING" | "SUCCESS" | "FAILED";
  messages: MessageProps[];
  loading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export const ChatMessageList = ({
  status,
  messages,
  loading,
  messagesEndRef,
}: ChatMessageListProps) => {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
      {status === "PROCESSING" && <ChatSkeleton />}

      {messages.map((message) => {
        const isAssistant = !message.isUser;

        return (
          <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
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
                    ul: ({ children }) => <ul className="list-disc list-inside space-y-1">{children}</ul>,
                    li: ({ children }) => <li className="ml-4">{children}</li>,
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
  );
};