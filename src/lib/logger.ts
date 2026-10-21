export const logApiError = (routeTag: string, error: any) => {
  console.error(`[${routeTag}_ERROR]`, {
    message: error?.message || "Unknown error",
    stack: error?.stack,
    timestamp: new Date().toISOString(),
  });
};