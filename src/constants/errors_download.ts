export const API_ERRORS = {
  UNAUTHORIZED: { error: "Authentication required. Please log in." },
  USER_NOT_FOUND: { error: "User account could not be found." },
  MESSAGE_LIMIT_REACHED: { 
    error: "Your account has reached the 4-message limit. Please contact support to increase your limit." 
  },
  MISSING_PARAMS: { error: "Missing required parameters: 'fileId' and 'question' are required." },
  CHAT_FAILED: { error: "An unexpected error occurred while processing your request. Please try again later." },
  
  FILE_NOT_FOUND: { error: "File not found or access denied." },
  DOWNLOAD_FAILED: { error: "Failed to generate download link. Please try again later." },
} as const;