import { withDefaultExtension } from "../../with-default-extension";
import { META_FORMAT } from "../constants";
import { selectHasMessages, selectLastMessage } from "../selectors";
import { Action } from "../store";
import { State } from "../types";

export const WRITE_LAST_COMMAND = "/write-last";

export const writeLastMessageCommand: Action<State, [string]> = async (
  state,
  filename
) => {
  if (!selectHasMessages(state)) {
    console.log(META_FORMAT(`No message to write.`));
  } else {
    if (filename) {
      const lastMessage = selectLastMessage(state);

      await fs.writeFile(
        withDefaultExtension(filename, ".md"),
        lastMessage.content,
        "utf8"
      );

      console.log(META_FORMAT(`Wrote last message to "${filename}".`));
    } else {
      console.log(
        META_FORMAT(
          `No filename provided. Usage: ${WRITE_LAST_COMMAND} <filename>`
        )
      );
    }
  }
};
