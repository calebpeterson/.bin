import { Conversation } from "./llm-types";
import { openai } from "./client";

export async function generateTitle(model: string, messages: Conversation) {
  const response = await openai.chat.completions.create({
    model,
    messages: [
      ...messages,
      {
        role: "user",
        content: "Suggest a short title. Do not include quotes.",
      },
    ],
  });

  return response.choices[0].message.content;
}
