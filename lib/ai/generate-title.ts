import { generateText } from "ai";
import { getAiSdkModel } from "./ai-sdk";
import { Conversation } from "./llm-types";

export async function generateTitle(model: string, messages: Conversation) {
  const { text } = await generateText({
    model: getAiSdkModel(model),
    messages: [
      ...messages,
      {
        role: "user",
        content: "Suggest a short title. Do not include quotes.",
      },
    ],
  });

  return text;
}
