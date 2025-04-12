import { formatMarkdown } from "../format-markdown";
import { hr } from "../horizontal-rule";
import { getClientForModel } from "./client";
import { ASSISTANT_PROMPT } from "./constants";
import { Conversation } from "./llm-types";

// Complete the user input and stream the response
export async function completeConversation(
  model: string,
  messages: Conversation
) {
  hr();

  const client = getClientForModel(model);
  const stream = await client.chat.completions.create({
    model,
    messages,
    stream: true,
  });

  // Show a spinner while streaming the response
  let buffer = "";
  await spinner(async () => {
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content ?? "";
      buffer += content;
    }
  });

  process.stdout.write(`${ASSISTANT_PROMPT}`);
  process.stdout.write(await formatMarkdown(buffer));
  process.stdout.write("\n");

  return buffer;
}
