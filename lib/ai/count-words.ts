export function countWords(text: string) {
  // Trim the text to remove leading and trailing whitespace
  // Split the text by one or more whitespace characters (spaces, tabs, newlines)
  const words = text.trim().split(/\s+/);

  // Return the number of words
  return words.length;
}
