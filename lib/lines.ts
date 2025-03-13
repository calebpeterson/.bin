import { ProcessOutput } from "zx";

// Get the cleaned stdout of a process as an array
export const lines = (proc: ProcessOutput) => proc.stdout.trim().split("\n");
