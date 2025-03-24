import { choose } from "../index.mjs";
import { getConversationBasenames } from "./get-conversation-basenames";

// Prompt the user to pick from existing conversations
export const chooseConversation = async (rootDir: string) => {
  const conversationBasenames = await getConversationBasenames(rootDir);
  const conversationBasename = await choose(conversationBasenames);

  return conversationBasename;
};
