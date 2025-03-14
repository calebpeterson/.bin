import "zx/globals";
import { ChatMessage, Conversation } from "./llm-types";
import matter from "gray-matter";

type IncludeHandler = (
  includePath: string,
  basePath: string
) => Promise<string | null>;

interface ParseChatOptions {
  include?: IncludeHandler;
}

interface ParsedConversation {
  meta: Record<string, unknown>;
  messages: Conversation;
}

/**
 * Default async file-based include handler.
 * Reads the included file from disk asynchronously.
 */
export const includeFromFile: IncludeHandler = async (
  includePath,
  basePath
) => {
  const fullPath = path.resolve(basePath, includePath);
  try {
    return await fs.readFile(fullPath, "utf8");
  } catch {
    console.warn(`Failed to include "${includePath}"`);
    return "";
  }
};

/**
 * Parses a Markdown-based chat log asynchronously, handling includes **sequentially**.
 *
 * @param chatString - The raw chat string.
 * @param basePath - The base directory for resolving includes.
 * @param options - Optional parameters including an async include handler (defaults to fileIncludeHandler).
 * @returns A Promise resolving to an array of parsed chat messages.
 */
export const parseChat = async (
  chatString: string,
  basePath = ".",
  options: ParseChatOptions = {}
): Promise<ParsedConversation> => {
  const includeHandler = options.include ?? includeFromFile;
  const messages: ChatMessage[] = [];
  let currentRole: string | null = null;
  let currentMessage: string[] = [];

  // Extract frontmatter using gray-matter
  const { data: meta, content } = matter(chatString);
  const lines = content.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("<!-- role: ")) {
      // Save the previous message before starting a new one
      if (currentRole !== null) {
        messages.push({
          role: currentRole,
          content: currentMessage.join("\n").trim(),
        });
      }

      currentRole = trimmed.replace("<!-- role: ", "").replace(" -->", "");
      currentMessage = [];
    } else if (trimmed.startsWith("<!-- include: ")) {
      // Save the previous message before starting a new one
      if (currentRole !== null && currentMessage.length > 0) {
        messages.push({
          role: currentRole,
          content: currentMessage.join("\n").trim(),
        });
        currentRole = null;
        currentMessage = [];
      }

      // Handle includes **sequentially**
      const includePath = trimmed
        .replace("<!-- include: ", "")
        .replace(" -->", "");
      const includedContent = await includeHandler(includePath, basePath);

      if (includedContent) {
        const { messages: includedMessages } = await parseChat(
          includedContent,
          path.dirname(path.resolve(basePath, includePath)),
          options
        );
        messages.push(...includedMessages);
      }
    } else {
      // Collect message content
      currentMessage.push(line);
    }
  }

  // Capture the last message
  if (currentRole !== null && currentMessage.length > 0) {
    messages.push({
      role: currentRole,
      content: currentMessage.join("\n").trim(),
    });
  }

  return { messages, meta };
};
