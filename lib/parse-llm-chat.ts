import { Conversation } from "./llm-types";

export const parseChat = (chat: string): Conversation => {
  // Split chat based on role comments
  const parts = chat
    .trim()
    .split(/<!--\s*role:\s*(\w+)\s*-->/)
    .map((part) => part.trim());

  const messages: { role: string; message: string }[] = [];

  for (let i = 1; i < parts.length; i += 2) {
    const role = parts[i];
    const content = parts[i + 1] || ""; // Ensure message is not undefined
    messages.push({ role, content });
  }

  return messages;
};
