import { sharedArticleTokens } from "../themes/shared-article-tokens.mjs";

export function resolveArticleTokens(clientTokens = {}) {
  const article = clientTokens.article ?? {};
  return {
    surface: article.surface ?? sharedArticleTokens.surface,
    text: article.text ?? sharedArticleTokens.text
  };
}
