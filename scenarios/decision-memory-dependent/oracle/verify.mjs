import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";

const workspace = path.resolve(requiredWorkspace());
const { auroraArticleTokens } = await load("clients/aurora/article-tokens.mjs");
const { borealisArticleTokens } = await load("clients/borealis/article-tokens.mjs");
const { cedarArticleTokens } = await load("clients/cedar/article-tokens.mjs");
const { sharedArticleTokens } = await load("src/themes/shared-article-tokens.mjs");
const { renderArticlePage } = await load("src/rendering/article-page.mjs");

assert.ok(contrastRatio(auroraArticleTokens.article.surface, auroraArticleTokens.article.text) >= 4.5);
assert.deepEqual(borealisArticleTokens.article, { surface: "#f8fafc", text: "#94a3b8" });
assert.deepEqual(cedarArticleTokens.article, { surface: "#ffffff", text: "#9ca3af" });
assert.deepEqual(sharedArticleTokens, { surface: "#ffffff", text: "#475569" });
assert.equal(
  renderArticlePage("aurora", "Launch").bodyStyle,
  `background:${auroraArticleTokens.article.surface};color:${auroraArticleTokens.article.text}`
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
