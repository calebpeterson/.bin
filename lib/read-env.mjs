export const getEnv = () => {
  const envPath = path.join(os.homedir(), ".bin", ".env");
  const envContent = fs.readFileSync(envPath, "utf8");

  const sanitizedEnvContent = envContent
    .split("\n")
    .filter(Boolean)
    .map((line) => line.trim())
    .join("\n");

  return YAML.parse(sanitizedEnvContent);
};

export const ENV = getEnv();
