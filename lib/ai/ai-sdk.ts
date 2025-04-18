import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import { ENV } from "../read-env.mjs";

const anthropic = createAnthropic({
  apiKey: ENV.ANTHROPIC_API_KEY,
});

const openai = createOpenAI({
  apiKey: ENV.OPENAI_API_KEY,
});

export const getAiSdkModel = (model: string) => {
  if (model.toLowerCase().startsWith("claude")) {
    return anthropic(model);
  }

  return openai(model);
};
