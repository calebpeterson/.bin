import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { ENV } from "../read-env.mjs";

type ClientRegistry = {
  openai: OpenAI | undefined;
  anthropic: Anthropic | undefined;
};

const REGISTRY: ClientRegistry = {
  openai: undefined,
  anthropic: undefined,
};

export function getClientForProvider(provider: "openai"): OpenAI;
export function getClientForProvider(provider: "anthropic"): Anthropic;
export function getClientForProvider(provider: string) {
  if (provider === "openai") {
    if (!REGISTRY.openai) {
      REGISTRY.openai = new OpenAI({
        organization: ENV.OPENAI_ORGANIZATION,
        apiKey: ENV.OPENAI_API_KEY,
      });
    }

    return REGISTRY.openai;
  }

  if (provider === "anthropic") {
    if (!REGISTRY.anthropic) {
      REGISTRY.anthropic = new Anthropic({
        apiKey: ENV.ANTHROPIC_API_KEY,
      });
    }

    return REGISTRY.anthropic;
  }

  throw new Error(`Unknown provider: ${provider}`);
}
