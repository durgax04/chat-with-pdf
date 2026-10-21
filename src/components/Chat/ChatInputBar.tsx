import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputBarProps {
  input: string;
  setInput: (value: string) => void;
  status: "PROCESSING" | "SUCCESS" | "FAILED";
  loading: boolean;
  isLimitReached: boolean;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export const ChatInputBar = ({
  input,
  setInput,
  status,
  loading,
  isLimitReached,
  onSend,
  onKeyDown,
}: ChatInputBarProps) => {
  return (
    <div className="px-6 py-4 border-t border-border">
      <div className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={isLimitReached ? "Message limit reached (4/4)..." : "Ask something about the PDF..."}
          disabled={status !== "SUCCESS" || loading || isLimitReached}
          className="flex-1"
        />
        <Button
          onClick={onSend}
          disabled={status !== "SUCCESS" || loading || !input.trim() || isLimitReached}
          className="font-medium"
        >
          Ask
          <Send className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};