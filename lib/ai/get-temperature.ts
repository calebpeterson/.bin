export const DEFAULT_TEMPERATURE = 0.7;

export const getTemperature = (input: unknown): number => {
  const parsed = parseFloat(String(input));

  if (isNaN(parsed) || parsed < 0 || parsed > 1) {
    return DEFAULT_TEMPERATURE;
  }

  return parsed;
};
