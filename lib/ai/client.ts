import OpenAI from "openai";
import { ENV } from "../read-env.mjs";
import Anthropic from "@anthropic-ai/sdk";

// Create the OpenAI client
export const openai = new OpenAI({
  organization: ENV.OPENAI_ORGANIZATION,
  apiKey: ENV.OPENAI_API_KEY,
});

export const anthropic = new Anthropic({
  apiKey: ENV.ANTHROPIC_API_KEY,
});

let anthropicBraintrust: OpenAI | undefined = undefined;

export const getClient = (model: string) => {
  if (model.toLowerCase().startsWith("claude")) {
    if (!anthropicBraintrust) {
      anthropicBraintrust = new OpenAI({
        baseURL: "https://api.braintrust.dev/v1/proxy",
        apiKey: ENV.ANTHROPIC_API_KEY,
        defaultHeaders: {
          "x-bt-use-cache": "never",
        },
      });
    }
    return anthropicBraintrust;
  }

  return openai;
};
