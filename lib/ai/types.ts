import { Conversation } from "./llm-types";
import { Store } from "./store";

// Slash commands
export type SlashCommand = {
  help: string;
  run: (store: Store<State>, input: string) => Promise<void>;
};

export type State = {
  CONVERSATION_BASENAME: string;
  ROOT_DIR: string;
  model: string;
  temperature: number;
  messages: Conversation;
};
