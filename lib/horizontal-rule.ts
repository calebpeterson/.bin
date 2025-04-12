import chalk from "chalk";

export const hr = () => {
  const width = process.stdout.columns ?? 80;
  console.log(chalk.dim.grey("─".repeat(width)));
};
