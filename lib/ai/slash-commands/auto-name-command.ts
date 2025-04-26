import { META_FORMAT } from "../constants";
import { generateTitle } from "../generate-title";
import { renameConversation } from "../rename-conversation";
import { Action } from "../store";
import { State } from "../types";

export const autoNameCommand: Action<State> = async ({
  ROOT_DIR,
  CONVERSATION_BASENAME,
  model,
  messages,
}) => {
  const newName = await generateTitle(model, messages);

  if (newName) {
    await renameConversation(ROOT_DIR, CONVERSATION_BASENAME, newName);

    return {
      CONVERSATION_BASENAME: newName,
    };
  } else {
    console.log(META_FORMAT(`No name suggested.`));
  }
};
