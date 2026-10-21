export const API_ERRORS = {
  UNAUTHORIZED: { error: "Authentication required. Please log in." },
  USER_NOT_FOUND: { error: "User account could not be found." },
  MISSING_PARAMS: { error: "Missing required parameters." },
  FILE_NOT_FOUND: { error: "File not found or access denied." },
  UPLOAD_LIMIT_REACHED: { 
    error: "Your account has reached the limit of 2 PDF uploads. Please contact support to increase your limit." 
  },
  PROCESSING_FAILED: { error: "Failed to process PDF vectors. Please try again later." },
} as const;