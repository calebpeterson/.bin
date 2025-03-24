import OpenAI from "openai";
import { ENV } from "../read-env.mjs";

// Create the OpenAI client
export const openai = new OpenAI({
  organization: ENV.OPENAI_ORGANIZATION,
  apiKey: ENV.OPENAI_API_KEY,
});
