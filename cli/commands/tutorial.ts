import { confirm } from "@inquirer/prompts";
import { findLesson } from "../lesson-catalog.js";
import { parseLesson } from "../parser.js";
import {
  clearScreen,
  renderOverview,
  renderStepBody,
  pad2,
} from "../renderer.js";
import { readKey } from "../pager.js";
import { isInteractive, renderSplash } from "../branding.js";
import { runLesson } from "./run.js";

export async function runTutorial(n: number, rpcUrl: string): Promise<void> {
  const meta = findLesson(n);
  if (!meta) {
    console.error(
      `No lesson ${n}. Run \`solana-lessons list\` to see available lessons.`,
    );
    process.exitCode = 1;
    return;
  }

  const parsed = parseLesson(meta);

  // Page 0 = overview, pages 1..N = steps.
  const totalPages = 1 + parsed.steps.length;
  let page = 0;

  if (!isInteractive()) {
    // Non-interactive: just dump everything, same as `show`.
    console.log(renderOverview(parsed));
    for (let i = 0; i < parsed.steps.length; i++) {
      console.log(renderStepBody(parsed, i, rpcUrl));
    }
    return;
  }

  while (page < totalPages) {
    clearScreen();
    process.stdout.write(renderSplash());

    if (page === 0) {
      console.log(renderOverview(parsed));
      console.log(
        `\n  Lesson ${pad2(meta.number)} · ${meta.slug} · ${parsed.steps.length} step${parsed.steps.length === 1 ? "" : "s"}`,
      );
      console.log("  ↵ next · q quit");
    } else {
      console.log(renderStepBody(parsed, page - 1, rpcUrl));
    }

    const key = await readKey();
    if (key === "quit") {
      console.log("\n  Goodbye 👋");
      return;
    }
    if (key === "back") {
      if (page > 0) page--;
      continue;
    }
    if (key === "run") {
      clearScreen();
      await runLesson(meta.number, rpcUrl);
      return;
    }
    // next (default)
    page++;
  }

  // Final prompt
  clearScreen();
  process.stdout.write(renderSplash());
  console.log(
    `\n  ✔ Lesson ${pad2(meta.number)} · ${meta.title} — walkthrough complete.\n`,
  );

  const shouldRun = await confirm({
    message: `Run the real script now against ${rpcUrl}?`,
    default: true,
  });
  if (shouldRun) {
    await runLesson(meta.number, rpcUrl);
  }
}
