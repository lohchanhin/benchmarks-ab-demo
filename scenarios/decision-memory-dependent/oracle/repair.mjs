import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const workspace = path.resolve(requiredWorkspace());
const target = path.join(workspace, "clients/aurora/article-tokens.mjs");
const source = await readFile(target, "utf8");
const repaired = source.replace('text: "#94a3b8"', 'text: "#172033"');
if (repaired === source) throw new Error("canonical Aurora token repair pattern was not found");
await writeFile(target, repaired, "utf8");

function requiredWorkspace() {
  if (!process.argv[2]) throw new Error("workspace argument is required");
  return process.argv[2];
}
