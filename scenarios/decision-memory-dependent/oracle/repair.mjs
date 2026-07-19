import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const workspace = path.resolve(requiredWorkspace());
const owner = requiredOwner();
const target = path.join(workspace, `clients/${owner}/article-tokens.mjs`);
const source = await readFile(target, "utf8");
const repaired = source.replace(/text: "#(?:94a3b8|9ca3af)"/, 'text: "#172033"');
if (repaired === source) throw new Error(`canonical ${owner} token repair pattern was not found`);
await writeFile(target, repaired, "utf8");

function requiredWorkspace() {
  if (!process.argv[2]) throw new Error("workspace argument is required");
  return process.argv[2];
}

function requiredOwner() {
  const owner = process.argv[3];
  if (!["aurora", "borealis", "cedar"].includes(owner)) throw new Error(`unsupported owner: ${owner}`);
  return owner;
}
