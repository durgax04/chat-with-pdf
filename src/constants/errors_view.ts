export const API_ERRORS = {
  UNAUTHORIZED: { error: "Authentication required. Please log in." },
  USER_NOT_FOUND: { error: "User account could not be found." },
  MISSING_PARAMS: { error: "Missing required parameters." },
  FILE_NOT_FOUND: { error: "File not found or access denied." },
  FILE_ACCESS_FAILED: { error: "Could not generate file access URL. Please try again later." },
} as const;