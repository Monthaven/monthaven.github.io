// Concatenates src/css/** into one string, inlined into <head> by the base layout.
// Numeric filename prefixes control cascade order. No bundler, no PostCSS.
// If this ever exceeds SIZE_LIMIT, split into critical + deferred instead of raising it.

import fs from "node:fs";
import path from "node:path";

const CSS_DIR = path.join(process.cwd(), "src", "css");
const SIZE_LIMIT = 20 * 1024;

function collect(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collect(full));
    else if (entry.name.endsWith(".css")) out.push(full);
  }
  return out;
}

function minify(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s*([{}:;,>])\s*/g, "$1")
    .replace(/;\}/g, "}")
    .replace(/\s+/g, " ")
    .trim();
}

export default function () {
  if (!fs.existsSync(CSS_DIR)) return "";
  const files = collect(CSS_DIR);
  const raw = files.map((f) => fs.readFileSync(f, "utf8")).join("\n");
  const out = minify(raw);

  if (out.length > SIZE_LIMIT) {
    throw new Error(
      `Inlined CSS is ${out.length} bytes, over the ${SIZE_LIMIT} byte budget. ` +
        `Split into critical + deferred rather than raising this limit.`
    );
  }
  return out;
}
