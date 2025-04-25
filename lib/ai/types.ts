import { Conversation } from "./llm-types";

// Slash commands
export type SlashCommand = {
  help: string;
  run: (input: string) => Promise<void>;
};

export type State = {
  CONVERSATION_BASENAME: string;
  ROOT_DIR: string;
  model: string;
  messages: Conversation;
};
