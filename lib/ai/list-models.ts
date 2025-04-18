import { getClientForProvider } from "./ai-client";

export const listModels = async () => {
  logModels(await getModelsForOpenAI(), "OpenAI");
  logModels(await getModelsForAnthropic(), "Anthropic");
};

const getModelsForOpenAI = async () => {
  const client = getClientForProvider("openai");
  const response = await client.models.list();
  const models = response.data;
  const chatModels = models.filter(
    (model) =>
      // All GPT models
      model.id.includes("gpt-") &&
      // Exclude fine-tuned models
      !model.id.includes("ft:")
  );

  const modelIds = chatModels.map((model) => model.id).sort();

  return modelIds;
};

const getModelsForAnthropic = async () => {
  const client = getClientForProvider("anthropic");
  const response = await client.models.list();
  const models = response.data;
  const chatModels = models.filter((model) =>
    // All Claude models
    model.id.includes("claude-")
  );

  const modelIds = chatModels.map((model) => model.id).sort();

  return modelIds;
};

const logModels = (modelIds: string[], platform: string) => {
  console.log(`Available ${platform} Chat Models:`);

  console.log();
  for (const modelId of modelIds) {
    console.log("  " + modelId);
  }
  console.log();
};
