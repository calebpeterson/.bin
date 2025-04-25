import { META_FORMAT } from "../constants";
import { Action } from "../store";
import { State } from "../types";

export const statusCommand: Action<State> = async (state) => {
  console.log(META_FORMAT(`Conversation: ${state.CONVERSATION_BASENAME}`));
  console.log(META_FORMAT(`Model:        ${state.model}`));
  console.log(META_FORMAT(`Messages:     ${state.messages.length}`));
};
