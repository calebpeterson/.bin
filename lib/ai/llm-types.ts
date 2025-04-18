export type ChatMessage = {
  id?: string;
  role: "system" | "user" | "assistant";
  content: string;
};

export type Conversation = ChatMessage[];
