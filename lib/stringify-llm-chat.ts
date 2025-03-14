import matter from "gray-matter";
import { Conversation } from "./llm-types";

interface StringifyChatOptions {
  model?: string;
}

/**
 * Serializes a conversation into a Markdown format with optional frontmatter.
 * @param messages - The conversation messages.
 * @param options - Optional parameters including `model`.
 * @returns A Markdown string with frontmatter and messages.
 */
export const stringifyChat = (
  messages: Conversation,
  options: StringifyChatOptions = {}
): string => {
  const { model } = options;

  // Construct frontmatter
  const meta = model ? { model } : {};
  const frontmatter =
    Object.keys(meta).length > 0
      ? matter.stringify("", meta).trim() + "\n\n"
      : "";

  // Format messages
  const chatContent = messages
    .map(({ role, content }) => `<!-- role: ${role} -->\n${content}\n`)
    .join("\n");

  return frontmatter + chatContent;
};
