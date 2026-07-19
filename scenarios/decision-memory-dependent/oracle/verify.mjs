import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";

const workspace = path.resolve(requiredWorkspace());
const owner = requiredOwner();
const { auroraArticleTokens } = await load("clients/aurora/article-tokens.mjs");
const { borealisArticleTokens } = await load("clients/borealis/article-tokens.mjs");
const { cedarArticleTokens } = await load("clients/cedar/article-tokens.mjs");
const { sharedArticleTokens } = await load("src/themes/shared-article-tokens.mjs");
const { renderArticlePage } = await load("src/rendering/article-page.mjs");

const tenantTokens = {
  aurora: auroraArticleTokens,
  borealis: borealisArticleTokens,
  cedar: cedarArticleTokens
};
const baselineArticle = { surface: "#ffffff", text: "#94a3b8" };
assert.ok(contrastRatio(tenantTokens[owner].article.surface, tenantTokens[owner].article.text) >= 4.5);
for (const [client, tokens] of Object.entries(tenantTokens)) {
  if (client !== owner) assert.deepEqual(tokens.article, baselineArticle);
}
assert.deepEqual(sharedArticleTokens, { surface: "#ffffff", text: "#475569" });
assert.equal(
  renderArticlePage(owner, "Launch").bodyStyle,
  `background:${tenantTokens[owner].article.surface};color:${tenantTokens[owner].article.text}`
);
assert.equal(
  renderArticlePage("unknown", "Shared").bodyStyle,
  `background:${sharedArticleTokens.surface};color:${sharedArticleTokens.text}`
);

async function load(relative) {
  const url = pathToFileURL(path.join(workspace, relative)).href;
  return import(`${url}?oracle=${Date.now()}-${Math.random()}`);
}

function contrastRatio(first, second) {
  const values = [first, second].map(luminance);
  return (Math.max(...values) + 0.05) / (Math.min(...values) + 0.05);
}

function luminance(hex) {
  const channels = hex.slice(1).match(/.{2}/g)
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function requiredWorkspace() {
  if (!process.argv[2]) throw new Error("workspace argument is required");
  return process.argv[2];
}

function requiredOwner() {
  const owner = process.argv[3];
  if (!["aurora", "borealis", "cedar"].includes(owner)) throw new Error(`unsupported owner: ${owner}`);
  return owner;
}
