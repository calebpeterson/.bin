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

const anthropicBraintrust = new OpenAI({
  baseURL: "https://api.braintrust.dev/v1/proxy",
  apiKey: ENV.ANTHROPIC_API_KEY,
  defaultHeaders: {
    "x-bt-use-cache": "never",
  },
});

export const getClient = (model: string) => {
  if (model.toLowerCase().startsWith("claude")) {
    return anthropicBraintrust;
  }

  return openai;
};
