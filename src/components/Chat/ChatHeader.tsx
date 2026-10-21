import Link from "next/link";
import { CheckCircle2, AlertCircle, Loader2, XCircle, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  status: "PROCESSING" | "SUCCESS" | "FAILED";
  isLimitReached: boolean;
}

export const ChatHeader = ({ status, isLimitReached }: ChatHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-6 py-3 md:py-4 border-b border-border">
      <div className="flex items-center gap-2 mb-2 md:mb-0">
        {status === "SUCCESS" && !isLimitReached && (
          <>
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-600">
              PDF ready. Ask your questions!
            </span>
          </>
        )}
        {isLimitReached && (
          <>
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-medium text-amber-600">
              Message limit reached (4/4). Contact support to upgrade.
            </span>
          </>
        )}
        {status === "PROCESSING" && (
          <>
            <Loader2 className="h-5 w-5 text-yellow-500 animate-spin" />
            <span className="text-sm font-medium text-yellow-600">Processing PDF...</span>
          </>
        )}
        {status === "FAILED" && (
          <>
            <XCircle className="h-5 w-5 text-red-600" />
            <span className="text-sm font-medium text-red-600">Failed to process PDF</span>
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
  );
};