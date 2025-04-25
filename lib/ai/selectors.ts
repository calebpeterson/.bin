import { Store } from "./store";
import { State } from "./types";

export const selectConversationBasename = (store: Store<State>) =>
  store.get("CONVERSATION_BASENAME");

export const selectModel = (state: State) => state.model;

export const selectMessages = (store: Store<State>) => store.get("messages");

export const selectInteractiveAction = (store: Store<State>) => {
  const { messages } = store.getState();

  return messages.length ? "resumed" : "started";
};

export const selectTerminalTitle = (state: State) => {
  const { CONVERSATION_BASENAME, messages } = state;

  return `${CONVERSATION_BASENAME} (${messages.length})`;
};

export const selectLastMessage = ({ messages }: State) => {
  return messages[messages.length - 1];
};

export const selectHasMessages = ({ messages }: State) => {
  return messages.length > 0;
};

export const selectCanDropLastMessage = ({ messages }: State) => {
  return messages.length > 1;
};
