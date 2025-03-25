export const withDefaultExtension = (basename: string, extension: string) =>
  basename.includes(".") ? basename : `${basename}${extension}`;
