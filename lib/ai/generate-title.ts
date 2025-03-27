import { Conversation } from "./llm-types";
import { getClientForProvider } from "./client";

export async function generateTitle(model: string, messages: Conversation) {
  const client = getClientForProvider("openai");
  const response = await client.chat.completions.create({
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
