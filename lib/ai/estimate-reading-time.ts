export function estimateReadingTime(text: string, wordsPerMinute = 200) {
  // Split the text by spaces to get an array of words
  const words = text.trim().split(/\s+/);

  // Get the number of words
  const numberOfWords = words.length;

  // Calculate the reading time in minutes
  const readingTimeMinutes = numberOfWords / wordsPerMinute;

  // Return the reading time rounded to two decimal places
  return Math.ceil(readingTimeMinutes);
}
