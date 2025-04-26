import { v4 as uuid4 } from "uuid";
import { setTerminalTitle } from "../../set-terminal-title";
import { META_FORMAT } from "../constants";
import { selectTerminalTitle } from "../selectors";
import { Action } from "../store";
import { State } from "../types";

export const deleteCommand: Action<State> = async (state) => {
  const { ROOT_DIR, CONVERSATION_BASENAME, model } = state;

  await $`rm ${ROOT_DIR}/${CONVERSATION_BASENAME}.md`;
  console.log(META_FORMAT(`Deleted conversation "${CONVERSATION_BASENAME}"`));

  const newName = uuid4();

  const newState = {
    ...state,
    messages: [],
    CONVERSATION_BASENAME: newName,
  };

  setTerminalTitle(selectTerminalTitle(newState));

  console.clear();
  console.log(META_FORMAT(`Started a new conversation with ${model}.`));

  return newState;
};
