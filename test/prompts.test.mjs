import assert from "node:assert/strict";
import test from "node:test";
import { buildPrompts } from "../src/lib/prompts.mjs";

test("all Palace arms use one context command and Adaptive alone enables auto mode", () => {
  const { control, routeOnly, fullPalace, adaptivePalace } = buildPrompts({
    task: "Fix the Aurora contrast regression."
  });

  for (const prompt of [control, routeOnly, fullPalace, adaptivePalace]) {
    assert.match(prompt, /Do not inventory the repository when direct task evidence is sufficient/);
    assert.match(prompt, /Stop exploring when the requested behavior is fixed/);
    assert.match(prompt, /complete tests pass/);
    assert.match(prompt, /Git diff contains only task-required changes/);
  }

  for (const prompt of [routeOnly, fullPalace, adaptivePalace]) {
    assert.match(prompt, /palace context 'Fix the Aurora contrast regression\.'/);
    assert.match(prompt, /exactly one Vertex Palace preparation command/);
    assert.match(prompt, /Do not call palace status, init, index, route, pack, help, open, evaluate, or memory separately/);
    assert.match(prompt, /outside this timed routing comparison/);
  }
  assert.match(routeOnly, /without historical task memory/);
  assert.match(fullPalace, /Historical memory may be incomplete or stale/);
  assert.doesNotMatch(routeOnly, /--auto/);
  assert.doesNotMatch(fullPalace, /--auto/);
  assert.match(adaptivePalace, /palace context 'Fix the Aurora contrast regression\.' --auto/);
  assert.match(adaptivePalace, /same project history as Full Palace/);
  assert.match(adaptivePalace, /When the selected mode is bypass, inspect the Primary candidate directly/);
  assert.doesNotMatch(control, /When the selected mode is bypass/);
  assert.doesNotMatch(routeOnly, /When the selected mode is bypass/);
  assert.doesNotMatch(fullPalace, /When the selected mode is bypass/);
});

test("Palace task quoting preserves PowerShell dollar literals", () => {
  const task = "Render negative zero as $0.00.";
  const prompts = buildPrompts({ task });

  assert.match(prompts.routeOnly, /palace context 'Render negative zero as \$0\.00\.'/);
  assert.match(prompts.fullPalace, /palace context 'Render negative zero as \$0\.00\.'/);
  assert.match(prompts.adaptivePalace, /palace context 'Render negative zero as \$0\.00\.' --auto/);
});
