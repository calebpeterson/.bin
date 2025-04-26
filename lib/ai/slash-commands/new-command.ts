import { v4 as uuid4 } from "uuid";
import { setTerminalTitle } from "../../set-terminal-title";
import { META_FORMAT } from "../constants";
import { selectModel, selectTerminalTitle } from "../selectors";
import { Action } from "../store";
import { State } from "../types";

export const newConversationCommand: Action<State> = async (state) => {
  console.clear();

  const model = selectModel(state);
  setTerminalTitle(selectTerminalTitle(state));

  console.log(META_FORMAT(`Started a new conversation with ${model}.`));

  return {
    messages: [],
    CONVERSATION_BASENAME: uuid4(),
  };
};
