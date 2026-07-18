import assert from "node:assert/strict";
import test from "node:test";
import { parseCodexStderr } from "../src/lib/diagnostics.mjs";

test("counts Codex router errors separately from other stderr lines", () => {
  const result = parseCodexStderr([
    "2026-01-01 WARN codex_core::shell_snapshot: unavailable",
    "2026-01-01 ERROR codex_core::tools::router: Exit code: 1",
    "2026-01-01 ERROR codex_core::tools::router: apply_patch failed",
    "plain stderr detail"
  ].join("\n"));

  assert.equal(result.warningLines, 1);
  assert.equal(result.errorLines, 2);
  assert.equal(result.routerErrors, 2);
  assert.ok(result.stderrChars > 0);
});
