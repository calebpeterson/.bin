import { parse, setOptions } from "marked";
import TerminalRenderer from "marked-terminal";

const DEFAULT_OPTIONS = {
  tab: 2,
};

export const formatMarkdown = (markdown, options = DEFAULT_OPTIONS) => {
  setOptions({ renderer: new TerminalRenderer(options) });
  return parse(markdown).trim();
};
