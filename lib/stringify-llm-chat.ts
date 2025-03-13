import { Conversation } from "./llm-types";

export const stringifyChat = (messages: Conversation): string => {
  return messages
    .map(({ role, content }) => `<!-- role: ${role} -->\n${content}\n`)
    .join("\n");
};
