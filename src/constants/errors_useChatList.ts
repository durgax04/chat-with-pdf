export const CHAT_LIST_ERRORS = {
  FETCH_FAILED: "Failed to load your chats. Please refresh.",
  DELETE_FAILED: "Failed to delete chat. Please try again.",
  DOWNLOAD_FAILED: "Failed to download file.",
  DOWNLOAD_LINK_FAILED: "Failed to generate download link.",
} as const;

export const CHAT_LIST_SUCCESS = {
  DELETE: "Chat deleted successfully",
} as const;