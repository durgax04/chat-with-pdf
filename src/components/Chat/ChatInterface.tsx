"use client";

import { useChatInterface } from "@/hooks/useChatInterface";
import { ChatInputBar } from "./ChatInputBar";
import { ChatHeader } from "./ChatHeader";
import { ChatMessageList } from "./ChatMessageList";

const ChatInterface = ({ fileId }: { fileId: string }) => {
  const {
    messages,
    input,
    setInput,
    status,
    loading,
    isLimitReached,
    messagesEndRef,
    askQuestion,
    handleKeyDown,
  } = useChatInterface(fileId);

  return (
    <div className="h-full flex flex-col bg-card rounded-lg shadow-lg overflow-hidden">
      <ChatHeader status={status} isLimitReached={isLimitReached} />

      <ChatMessageList
        status={status}
        messages={messages}
        loading={loading}
        messagesEndRef={messagesEndRef}
      />

      <ChatInputBar
        input={input}
        setInput={setInput}
        status={status}
        loading={loading}
        isLimitReached={isLimitReached}
        onSend={askQuestion}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default ChatInterface;