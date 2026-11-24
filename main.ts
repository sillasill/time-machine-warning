// Funniest Time Machine Warning Label.
// Writes one warning label for a time machine to
// $OUTPUT_PATH (default /output/entry.txt).
// Node 22, standard library only, deterministic, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const MAX_CHARS = 120;
const LINE =
  "WARNING: Do not meet yourself. If you already have, tell yourself at once — and never let yourself read this label.";

function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

const length = [...LINE].length; // count Unicode code points, not UTF-16 units
if (length === 0) fail("line is empty");
if (length > MAX_CHARS) {
  fail(`line is ${length} chars, over the ${MAX_CHARS} limit`);
}
if (LINE.trim().length === 0) fail("line is only whitespace");
if (LINE !== LINE.trim()) fail("line has leading or trailing whitespace");
if (/[\r\n]/.test(LINE)) fail("line must be a single line");

const out = process.env.OUTPUT_PATH ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, LINE, "utf8");
console.log(`wrote ${length} chars to ${out}`);
