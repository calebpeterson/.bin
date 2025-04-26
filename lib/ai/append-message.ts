import { v4 as uuid4 } from "uuid";
import { ChatMessage } from "./llm-types";
import { Store } from "./store";
import { State } from "./types";
import { writeConversation } from "./write-conversation";

// Append the message and journal the conversation
export const appendMessage = async (
  store: Store<State>,
  message: ChatMessage
) => {
  // Update the state
  const { messages } = store.getState();
  store.set("messages", [...messages, { id: uuid4(), ...message }]);

  // Write the conversation to file
  const state = store.getState();
  await writeConversation(
    state.ROOT_DIR,
    state.CONVERSATION_BASENAME,
    state.messages,
    { model: state.model, temperature: state.temperature }
  );
};
