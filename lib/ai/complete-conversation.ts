import { generateText } from "ai";
import { formatMarkdown } from "../format-markdown";
import { hr } from "../horizontal-rule";
import { getAiSdkModel } from "./ai-sdk";
import { ASSISTANT_PROMPT } from "./constants";
import { Conversation } from "./llm-types";

// Complete the user input and stream the response
export async function completeConversation(
  model: string,
  messages: Conversation
) {
  hr();

  // Show a spinner while streaming the response
  let buffer = "";
  await spinner(async () => {
    const { text } = await generateText({
      model: getAiSdkModel(model),
      messages,
    });

    buffer = text;
  });

  process.stdout.write(`${ASSISTANT_PROMPT}`);
  process.stdout.write(await formatMarkdown(buffer));
  process.stdout.write("\n");

  return buffer;
}
