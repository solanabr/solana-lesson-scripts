import { findLesson } from "../lesson-catalog.js";
import { parseLesson } from "../parser.js";
import { renderOverview, renderStepBody } from "../renderer.js";

export function runShow(n: number, rpcUrl: string): void {
  const meta = findLesson(n);
  if (!meta) {
    console.error(
      `No lesson ${n}. Run \`solana-lessons list\` to see available lessons.`,
    );
    process.exitCode = 1;
    return;
  }

  const parsed = parseLesson(meta);

  console.log(renderOverview(parsed));
  for (let i = 0; i < parsed.steps.length; i++) {
    console.log(renderStepBody(parsed, i, rpcUrl));
  }
}
