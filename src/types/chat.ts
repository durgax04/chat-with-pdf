export type Chat = {
  id: string;
  name: string;
  url: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  uploadStatus: "SUCCESS" | "FAILED" | "PROCESSING";
};

export type ChatURL = {
  url: string;
};

export type Message = {
  text: string;
  isUser: boolean;
};

export type MessageProps = {
  id: string;
  text: string;
  isUser: boolean;
};


export type AskRequest = {
  fileId: string;
  question: string;
};

export enum MessageRole {
  USER = "USER",
  SYSTEM = "SYSTEM",
}