export const UPLOAD_ERRORS = {
  VERIFY_LIMITS_FAILED: "Failed to verify account limits.",
  DEFAULT_LIMIT_REASON: "Limit reached",
  INVALID_FILE_TYPE: "Only PDF files are allowed",
  FILE_TOO_LARGE: (maxSize: number) => `File too large. Max allowed size is ${maxSize} MB`,
  SIGNED_URL_FAILED: "Failed to get signed URL",
  S3_UPLOAD_FAILED: (status: number) => `S3 returned status ${status}`,
  NETWORK_ERROR: "Upload network error",
  LIMIT_REACHED: "Account limit reached.",
  PROCESS_FAILED: "Failed to process PDF vectors",
  DEFAULT_UPLOAD_FAILED: "Upload failed. Please try again.",
} as const;

export const UPLOAD_SUCCESS = {
  UPLOAD_COMPLETE: "Upload successful!",
} as const;