import "zx/globals";
import { lines } from "../lines";

export const getConversationBasenames = async (rootDir: string) =>
  lines(await $`ls ${rootDir}`).map((filename) => path.parse(filename).name);
