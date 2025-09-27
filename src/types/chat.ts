export type Chat = {
  id: string;
  name: string;
  url: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  uploadStatus: "SUCCESS" | "FAILED" | "PROCESSING";
};
