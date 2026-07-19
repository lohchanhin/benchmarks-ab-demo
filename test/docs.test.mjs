import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const documentationFiles = [
  "README.md",
  "README.zh-CN.md",
  "docs/zh-CN/README.md",
  "docs/zh-CN/QUICKSTART.md",
  "docs/zh-CN/RESULTS_GUIDE.md"
];

test("publishes discoverable Simplified Chinese judge guidance", async () => {
  const english = await read("README.md");
  const chinese = await read("README.zh-CN.md");
  const index = await read("docs/zh-CN/README.md");
  const quickstart = await read("docs/zh-CN/QUICKSTART.md");
  const results = await read("docs/zh-CN/RESULTS_GUIDE.md");

  for (const content of [english, chinese]) {
    assert.match(content, /docs\/zh-CN\/README\.md/);
    assert.match(content, /docs\/zh-CN\/QUICKSTART\.md/);
    assert.match(content, /docs\/zh-CN\/RESULTS_GUIDE\.md/);
  }

  assert.match(index, /30 秒结论/);
  assert.match(quickstart, /不会启动 Codex Agent/);
  assert.match(quickstart, /vertex-palace@0\.2\.1/);
  assert.match(quickstart, /--limit 1/);
  assert.match(quickstart, /npm run verify:analysis:adaptive/);
  assert.match(quickstart, /只忽略.*generatedAt/);
  assert.match(results, /Adaptive - Full/);
  assert.match(results, /Adaptive - Control/);
  assert.match(results, /不能说 Vertex Palace.*普遍省 Token/);
  assert.match(results, /不能改写冻结结果/);
});

test("keeps local links in the Chinese documentation surface resolvable", async () => {
  for (const relativeFile of documentationFiles) {
    const markdown = await read(relativeFile);
    for (const target of localMarkdownTargets(markdown)) {
      const resolved = path.resolve(repositoryRoot, path.dirname(relativeFile), target);
      await assert.doesNotReject(
        stat(resolved),
        `${relativeFile} links to missing local target ${target}`
      );
    }
  }
});

async function read(relativeFile) {
  return readFile(path.join(repositoryRoot, relativeFile), "utf8");
}

function localMarkdownTargets(markdown) {
  const targets = [];
  for (const match of markdown.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    let target = match[1].trim().replace(/^<|>$/g, "");
    if (!target || target.startsWith("#") || /^[a-z][a-z\d+.-]*:/i.test(target)) continue;
    target = target.split("#", 1)[0].split("?", 1)[0];
    if (target) targets.push(decodeURIComponent(target));
  }
  return targets;
}
