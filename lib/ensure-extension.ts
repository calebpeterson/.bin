export const ensureExtension = (basename: string, extension: string) =>
  basename.endsWith(extension) ? basename : `${basename}${extension}`;
