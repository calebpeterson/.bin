import { Conversation } from "./llm-types";
import { stringifyChat, StringifyChatOptions } from "./stringify-llm-chat";

export const writeConversation = (
  rootDir: string,
  conversationBasename: string,
  messages: Conversation,
  options: StringifyChatOptions
) => {
  fs.writeFile(
    path.join(rootDir, `${conversationBasename}.md`),
    stringifyChat(messages, options),
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
};
