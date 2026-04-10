import chalk from "chalk";
import gradientString from "gradient-string";

// Pre-baked figlet "Standard" font for "SUPERTEAM BR"
// Kept as a constant so we don't ship figlet as a runtime dep.
const LOGO = String.raw`
 ____  _   _ ____  _____ ____ _____ _____    _    __  __   ____  ____
/ ___|| | | |  _ \| ____|  _ \_   _| ____|  / \  |  \/  | | __ )|  _ \
\___ \| | | | |_) |  _| | |_) || | |  _|   / _ \ | |\/| | |  _ \| |_) |
 ___) | |_| |  __/| |___|  _ < | | | |___ / ___ \| |  | | | |_) |  _ <
|____/ \___/|_|   |_____|_| \_\|_| |_____/_/   \_\_|  |_| |____/|_| \_\
`;

// Brazil flag gradient: green → yellow → blue
const brazilGradient = gradientString(["#009c3b", "#ffdf00", "#002776"]);

export function isInteractive(): boolean {
  if (process.env.NO_COLOR) return false;
  if (process.env.CI) return false;
  return Boolean(process.stdout.isTTY);
}

export function renderSplash(): string {
  if (!isInteractive()) {
    return "solana-lessons — Superteam Brazil Solana Bootcamp";
  }

  const logo = brazilGradient.multiline(LOGO);
  const tagline = chalk.dim.italic(
    "  Solana Bootcamp · 12 lessons · powered by @SuperteamBR",
  );
  return `${logo}\n${tagline}\n`;
}

export function badge(): string {
  if (!isInteractive()) return "[solana-lessons]";
  return chalk.bgHex("#009c3b").hex("#ffffff").bold(" solana-lessons ");
}
