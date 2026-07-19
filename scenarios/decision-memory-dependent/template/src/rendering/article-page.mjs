import { getTenantArticleTokens } from "../clients/tenant-registry.mjs";
import { resolveArticleTokens } from "./article-tokens.mjs";

export function renderArticlePage(clientId, title) {
  const tokens = resolveArticleTokens(getTenantArticleTokens(clientId));
  return {
    clientId,
    title,
    bodyStyle: `background:${tokens.surface};color:${tokens.text}`
  };
}
