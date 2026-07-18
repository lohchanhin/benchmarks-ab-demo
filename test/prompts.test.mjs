import assert from "node:assert/strict";
import test from "node:test";
import { buildPrompts } from "../src/lib/prompts.mjs";

test("Palace arm uses one context command and excludes post-task maintenance", () => {
  const { palace } = buildPrompts({ task: "Fix the Aurora contrast regression." });

  assert.match(palace, /palace context "Fix the Aurora contrast regression\."/);
  assert.match(palace, /exactly one Vertex Palace preparation command/);
  assert.match(palace, /Do not call palace status, init, index, route, pack, help, open, evaluate, or memory separately/);
  assert.match(palace, /outside this timed routing comparison/);
});
