import { SlashCommand } from "../types";
import { autoNameCommand } from "./auto-name-command";
import { copyLastMessageCommand } from "./copy-command";
import { deleteCommand } from "./delete-command";
import { dropLastMessageCommand } from "./drop-last-command";
import { exitCommand } from "./exit-command";
import { newConversationCommand } from "./new-command";
import { pwdCommand } from "./pwd-command";
import { RENAME_COMMAND, renameCommand } from "./rename-command";
import { statusCommand } from "./status-command";
import {
  WRITE_LAST_COMMAND,
  writeLastMessageCommand,
} from "./write-last-command";

const HELP_COMMAND = "/help";
const NEW_COMMAND = "/new";
const DELETE_COMMAND = "/delete";
const COPY_COMMAND = "/copy";
const STATUS_COMMAND = "/status";
const AUTO_NAME_COMMAND = "/auto-name";
const DROP_LAST_COMMAND = "/drop-last";
const PWD_COMMAND = "/pwd";

export const EXIT_COMMAND = "/exit";

export const SLASH_COMMANDS: Record<string, SlashCommand> = {
  [HELP_COMMAND]: {
    help: "Show this help message.",
    run: async (store, _input: string) => {
      console.log(chalk.grey("Available commands:"));

      for (const [command, { help }] of Object.entries(SLASH_COMMANDS)) {
        console.log(chalk.grey(`  ${command.padEnd(15)} ${help}`));
      }
    },
  },

  [NEW_COMMAND]: {
    help: "Start a new conversation.",
    run: async (store, _input: string) => {
      await store.execute(newConversationCommand);
    },
  },

  [STATUS_COMMAND]: {
    help: "Show the current conversation status.",
    run: async (store, _input: string) => {
      await store.execute(statusCommand);
    },
  },

  [EXIT_COMMAND]: {
    help: "End the conversation and quit.",
    run: async (store, _input: string) => {
      await store.execute(exitCommand);
    },
  },

  [COPY_COMMAND]: {
    help: "Copy the last message to the clipboard.",
    run: async (store, _input: string) => {
      await store.execute(copyLastMessageCommand);
    },
  },

  [RENAME_COMMAND]: {
    help: "Rename the current conversation.",
    run: async (store, input: string) => {
      const newName = input.slice(RENAME_COMMAND.length).trim();
      await store.execute(renameCommand, newName);
    },
  },

  [AUTO_NAME_COMMAND]: {
    help: "Generate a title for the conversation.",
    run: async (store, _input: string) => {
      await store.execute(autoNameCommand);
    },
  },

  [DELETE_COMMAND]: {
    help: "Delete the current conversation and start a new one.",
    run: async (store, _input: string) => {
      await store.execute(deleteCommand);
    },
  },

  [DROP_LAST_COMMAND]: {
    help: "Drop the last user/assistant message pair from the conversation.",
    run: async (store, _input: string) => {
      await store.execute(dropLastMessageCommand);
    },
  },

  [WRITE_LAST_COMMAND]: {
    help: "Write the last message to a file.",
    run: async (store, input: string) => {
      const filename = input.slice(WRITE_LAST_COMMAND.length).trim();
      await store.execute(writeLastMessageCommand, filename);
    },
  },

  [PWD_COMMAND]: {
    help: "Show the current working directory.",
    run: async (store, _input: string) => {
      await store.execute(pwdCommand);
    },
  },
};
