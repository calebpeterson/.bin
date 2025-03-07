// Set the terminal window title using an arrow function
export const setTerminalTitle = (title) => {
  // ANSI escape code to set the terminal title
  const ESC = "\u001B";
  process.stdout.write(`${ESC}]0;${title}${ESC}\\`);
};
