// Slash commands
export type SlashCommand = {
  help: string;
  run: (input: string) => Promise<void>;
};
