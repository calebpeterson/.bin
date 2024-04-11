// Convert the output of a process to a boolean
export const toBoolean = (proc) =>
  proc.stdout.trim() === "true" || Boolean(proc.stdout.trim());

// Get the cleaned stdout of a process
export const stdout = (proc) => proc.stdout.trim();

// Get the cleaned stdout of a process as an array
export const lines = (proc) => proc.stdout.trim().split("\n");

export const extract = (regex, content) => {
  if (!regex || !content) {
    throw new Error("Regex and content are required");
  }

  const matches = regex.exec(content);

  if (matches && matches.length > 1) {
    const match = matches[1];
    return match;
  }

  throw new Error(
    `No match found for pattern: ${regex} in content: ${content}`
  );
};
