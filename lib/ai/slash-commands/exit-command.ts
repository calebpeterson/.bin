import { Action } from "../store";
import { State } from "../types";

export const exitCommand: Action<State> = async () => {
  console.clear();
  process.exit(0);
};
