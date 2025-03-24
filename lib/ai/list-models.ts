import { openai } from "./client";

export const listModels = async () => {
  const response = await openai.models.list();
  const models = response.data;
  const chatModels = models.filter(
    (model) =>
      // All GPT models
      model.id.includes("gpt-") &&
      // Exclude fine-tuned models
      !model.id.includes("ft:")
  );

  console.log("Available Chat Models:");

  console.log();
  for (const model of chatModels) {
    console.log("  " + model.id);
  }
  console.log();
};
