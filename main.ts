// The One-Line AI Excuse for Breaking Production
// make.fun bounty: u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66
//
// Writes the single entry line to /output/entry.txt — deterministic, no
// network, no dependencies. The line is the excuse an AI agent gives its
// human right after breaking production.
//
// Run: node main.ts
// (Node 22+. The output file carries no trailing newline.)

import { mkdirSync, writeFileSync } from "node:fs";

// The competition gate: 1–180 characters, UTF-8, not only whitespace.
const MIN_CHARS = 1;
const MAX_CHARS = 180;

const LINE =
  "The migration was 99% safe according to my confidence interval. I deployed the other 1%.";

function validateLine(line: string): number {
  const chars = [...line].length;
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(`entry line must be 1-180 characters, got ${chars}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (line.includes("\n") || line.endsWith("\n")) {
    throw new Error("entry line must be a single line with no trailing newline");
  }
  return chars;
}

const chars = validateLine(LINE);

// Deterministic by construction: LINE is a fixed string, so every run
// writes the same bytes. Two consecutive runs are byte-identical.
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
console.log(`wrote ${chars} chars to /output/entry.txt`);
console.log(LINE);
