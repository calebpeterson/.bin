import OpenAI from "openai";
import { ENV } from "../read-env.mjs";
import Anthropic from "@anthropic-ai/sdk";

// Create the OpenAI client
let openai: OpenAI | undefined = undefined;

let anthropic: Anthropic | undefined = undefined;

let anthropicBraintrust: OpenAI | undefined = undefined;

export function getClientForProvider(provider: "openai"): OpenAI;
export function getClientForProvider(provider: "anthropic"): Anthropic;
export function getClientForProvider(provider: string) {
  if (provider === "openai") {
    if (!openai) {
      openai = new OpenAI({
        organization: ENV.OPENAI_ORGANIZATION,
        apiKey: ENV.OPENAI_API_KEY,
      });
    }

    return openai;
  }

  if (provider === "anthropic") {
    if (!anthropic) {
      anthropic = new Anthropic({
        apiKey: ENV.ANTHROPIC_API_KEY,
      });
    }

    return anthropic;
  }

  throw new Error(`Unknown provider: ${provider}`);
}

export const getClientForModel = (model: string) => {
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

  return getClientForProvider("openai");
};
