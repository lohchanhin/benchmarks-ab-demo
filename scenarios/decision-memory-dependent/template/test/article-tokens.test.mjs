import assert from "node:assert/strict";
import test from "node:test";
import { renderArticlePage } from "../src/rendering/article-page.mjs";
import { resolveArticleTokens } from "../src/rendering/article-tokens.mjs";
import { sharedArticleTokens } from "../src/themes/shared-article-tokens.mjs";

test("explicit client tokens override the shared fallback", () => {
  assert.deepEqual(
    resolveArticleTokens({ article: { surface: "#010203", text: "#fefefe" } }),
    { surface: "#010203", text: "#fefefe" }
  );
});

test("missing client tokens preserve the shared public contract", () => {
  assert.deepEqual(resolveArticleTokens({}), sharedArticleTokens);
  assert.equal(
    renderArticlePage("unknown", "Release notes").bodyStyle,
    `background:${sharedArticleTokens.surface};color:${sharedArticleTokens.text}`
  );
});
