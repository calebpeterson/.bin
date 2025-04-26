import { META_FORMAT } from "../constants";
import { renameConversation } from "../rename-conversation";
import { Action } from "../store";
import { State } from "../types";

export const RENAME_COMMAND = "/rename";

export const renameCommand: Action<State, [string]> = async (
  { ROOT_DIR, CONVERSATION_BASENAME },
  newName
) => {
  if (newName) {
    await renameConversation(ROOT_DIR, CONVERSATION_BASENAME, newName);

    return {
      CONVERSATION_BASENAME: newName,
    };
  } else {
    console.log(
      META_FORMAT(`No name provided. Usage: ${RENAME_COMMAND} <name>`)
    );
  }
};
