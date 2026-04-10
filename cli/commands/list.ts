import chalk from "chalk";
import { LESSONS } from "../lesson-catalog.js";
import { isInteractive } from "../branding.js";
import { pad2 } from "../renderer.js";

export function runList(): void {
  const color = isInteractive();
  const accent = (s: string) => (color ? chalk.hex("#00c2a8")(s) : s);
  const dim = (s: string) => (color ? chalk.dim(s) : s);
  const bold = (s: string) => (color ? chalk.bold(s) : s);

  console.log();
  console.log(bold("  Solana Bootcamp · 12 lessons"));
  console.log();

  const header = `  ${accent("#")}    ${accent("Lesson")}                                ${accent("SDK")}    ${accent("Time")}`;
  console.log(header);
  console.log(dim("  " + "─".repeat(68)));

  for (const lesson of LESSONS) {
    const num = accent(pad2(lesson.number));
    const title = bold(lesson.title.padEnd(36));
    const sdk = dim(lesson.sdk.padEnd(6));
    const time = dim(lesson.demoTime);
    console.log(`  ${num}   ${title} ${sdk} ${time}`);
    console.log(`       ${dim(lesson.concepts)}`);
  }
  console.log();
  console.log(
    dim("  Run a tutorial: ") +
      accent("solana-lessons tutorial <n>") +
      dim("   ·   Execute: ") +
      accent("solana-lessons run <n>"),
  );
  console.log();
}
