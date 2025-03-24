import { setTerminalTitle } from "../set-terminal-title";
import { META_FORMAT } from "./constants";

export const renameConversation = async (
  rootDir: string,
  oldName: string,
  newName: string
) => {
  const oldPath = path.join(rootDir, `${oldName}.md`);
  const newPath = path.join(rootDir, `${newName}.md`);

  await fs.rename(oldPath, newPath);

  console.log(META_FORMAT(`Renamed conversation to "${newName}"`));

  setTerminalTitle(newName);
};
