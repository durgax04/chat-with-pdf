export interface MessageProps {
  id: string;
  text: string;
  isUser: boolean;
}

export type ProcessingStatus = "PROCESSING" | "SUCCESS" | "FAILED";

export const CHAT_ERRORS = {
  RATE_LIMIT: "Your account has reached the 4-message limit.",
  DEFAULT_CHAT: "Something went wrong. Please try again.",
  LOAD_DATA: "Failed to load initial chat data.",
  STATUS_CHECK: "Failed to check file processing status.",
} as const;