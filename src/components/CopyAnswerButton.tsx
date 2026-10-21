import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ClipboardIcon, ClipboardCheckIcon } from "lucide-react";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";

type CopyAnswerButtonProps = {
  content: string;
};

export function CopyAnswerButton({ content }: CopyAnswerButtonProps) {
  const [copy, isCopied] = useCopyToClipboard();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 p-0"
          onClick={() => copy(content)}
        >
          {isCopied ? (
            <ClipboardCheckIcon className="h-4 w-4 text-emerald-500" />
          ) : (
            <ClipboardIcon className="h-4 w-4" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">
        <span>{isCopied ? "Copied" : "Copy"}</span>
      </TooltipContent>
    </Tooltip>
  );
}
