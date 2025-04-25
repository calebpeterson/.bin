import { META_FORMAT } from "../constants";
import { selectLastMessage } from "../selectors";
import { Action } from "../store";
import { State } from "../types";

export const copyLastMessageCommand: Action<State> = async (state) => {
  const lastMessage = selectLastMessage(state);

  await $`echo ${lastMessage.content} | pbcopy`;
  console.log(META_FORMAT(`Copied last message to clipboard.`));
};
