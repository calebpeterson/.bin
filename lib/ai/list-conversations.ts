import { getConversationBasenames } from "./get-conversation-basenames";

export const listConversations = async (rootDir: string) => {
  const conversationBasenames = await getConversationBasenames(rootDir);

  console.log("Conversations:");

  console.log();
  for (const conversationBasename of conversationBasenames) {
    console.log("  " + conversationBasename);
  }
  console.log();
};
