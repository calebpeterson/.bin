import { generateText } from "ai";
import { formatMarkdown } from "../format-markdown";
import { hr } from "../horizontal-rule";
import { getAiSdkModel } from "./ai-sdk";
import { ASSISTANT_PROMPT } from "./constants";
import { DEFAULT_TEMPERATURE } from "./get-temperature";
import { Conversation } from "./llm-types";

// Complete the user input and stream the response
export async function completeConversation(
  model: string,
  messages: Conversation,
  temperature: number = DEFAULT_TEMPERATURE
) {
  hr();

  // Show a spinner while streaming the response
  let buffer = "";
  await spinner(async () => {
    const { text } = await generateText({
      model: getAiSdkModel(model),
      temperature,
      messages,
    });

    buffer = text;
  });

  process.stdout.write(`${ASSISTANT_PROMPT}`);
  process.stdout.write(await formatMarkdown(buffer));
  process.stdout.write("\n");

  return buffer;
}
