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

export const choose = async (options, { query = "" } = {}) => {
  if (options.length === 1) {
    return options[0];
  }

  const itemsToShow = Math.min(Math.max(options.length, 10), 30);

  const defaultQuery = query ? ` -q "${query}"` : "";

  const selectionProc =
    $`choose -m -s 18 -w 30 -n ${itemsToShow} -b 222222 -c 000000 ${defaultQuery}`
      .quiet()
      .nothrow();

  selectionProc.stdin.write(options.join("\n"));
  selectionProc.stdin.end();

  const selectionOutput = await selectionProc;

  if (selectionOutput.exitCode !== 0) {
    return;
  }

  return stdout(selectionOutput);
};

export const getCurrentDate = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-based month
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const ensureExtension = (basename, extension) =>
  basename.endsWith(extension) ? basename : `${basename}${extension}`;
