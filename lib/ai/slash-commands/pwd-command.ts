import { META_FORMAT } from "../constants";
import { Action } from "../store";
import { State } from "../types";

export const pwdCommand: Action<State> = async ({ ROOT_DIR }) => {
  console.log(META_FORMAT(`Current working directory: ${ROOT_DIR}`));
};
