import { auroraArticleTokens } from "../../clients/aurora/article-tokens.mjs";
import { borealisArticleTokens } from "../../clients/borealis/article-tokens.mjs";
import { cedarArticleTokens } from "../../clients/cedar/article-tokens.mjs";

const tenants = Object.freeze({
  aurora: auroraArticleTokens,
  borealis: borealisArticleTokens,
  cedar: cedarArticleTokens
});

export function getTenantArticleTokens(clientId) {
  return tenants[clientId] ?? {};
}
