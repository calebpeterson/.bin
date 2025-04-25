import { META_FORMAT } from "../constants";
import { selectCanDropLastMessage } from "../selectors";
import { Action } from "../store";
import { State } from "../types";
import { writeConversation } from "../write-conversation";

export const dropLastMessageCommand: Action<State> = async (state) => {
  if (!selectCanDropLastMessage(state)) {
    console.log(META_FORMAT(`No messages to drop.`));
  } else {
    const { messages } = state;
    const updatedMessages = messages.slice(0, -2);

    await writeConversation(
      state.ROOT_DIR,
      state.CONVERSATION_BASENAME,
      updatedMessages,
      { model: state.model }
    );

    console.log(META_FORMAT(`Dropped last message.`));
  }
};
