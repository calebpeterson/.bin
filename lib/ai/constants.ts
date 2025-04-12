import "zx/globals";

export const USER_PROMPT = chalk.blue("▸ ");
export const USER_PROMPT_2 = chalk.blue("  ");

export const ASSISTANT_FORMAT = (text: string) => chalk.blue(text);
export const ASSISTANT_PROMPT = ASSISTANT_FORMAT("");

export const META_FORMAT = (text: string) => chalk.grey(`⛭ ${text}`);
