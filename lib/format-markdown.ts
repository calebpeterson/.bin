import { parse, setOptions } from "marked";
import TerminalRenderer from "marked-terminal";

const DEFAULT_OPTIONS = {
  tab: 2,
};

export const formatMarkdown = async (
  markdown: string,
  options = DEFAULT_OPTIONS
) => {
  setOptions({ renderer: new TerminalRenderer(options) });
  return (await parse(markdown)).trim();
};
