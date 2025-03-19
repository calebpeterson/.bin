import readline from "readline";

// Arrow function for writing the status line
export const setStatusLine = (message: string) => {
  // Save the current position of the cursor
  process.stdout.write("\x1B[s");

  // Go to the last line
  const moveToLastLine = `\x1B[0;0H`;
  process.stdout.write(moveToLastLine);

  // Clear the current line
  readline.clearLine(process.stdout, 0);

  // Write the message
  process.stdout.write(chalk.gray.italic(message) + "\n");

  // Determine the width of the terminal
  const terminalWidth = process.stdout.columns;

  // Create a horizontal line of dashes
  const horizontalLine = "⎯".repeat(terminalWidth);

  // Print the horizontal line
  process.stdout.write(horizontalLine + "\n");

  // Restore the cursor position
  process.stdout.write("\x1B[u");
};
