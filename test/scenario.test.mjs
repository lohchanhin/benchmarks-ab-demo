import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  applyScenarioVariant,
  applyCanonicalRepair,
  controlFirstScenarioIds,
  createScenarioVariant,
  loadScenario,
  materializeScenario,
  pilotScenarioIds,
  runScenarioOracle,
  seededDecisionMemoryOwner
} from "../src/lib/scenario.mjs";
import { buildPrompts } from "../src/lib/prompts.mjs";
import { runProcess } from "../src/lib/process.mjs";

const testVariantKey = "1111111111111111111111111111111111111111111111111111111111111111";

test("materializes a deterministic noisy fixture", async (context) => {
  const first = await mkdtemp(path.join(os.tmpdir(), "benchmark-scenario-a-"));
  const second = await mkdtemp(path.join(os.tmpdir(), "benchmark-scenario-b-"));
  context.after(async () => Promise.all([
    rm(first, { recursive: true, force: true }),
    rm(second, { recursive: true, force: true })
  ]));

  const scenario = await loadScenario();
  const firstFiles = await materializeScenario(scenario, first);
  const secondFiles = await materializeScenario(scenario, second);
  assert.deepEqual(firstFiles, secondFiles);
  assert.equal(firstFiles.length, 240);
  assert.ok(firstFiles.includes("clients/aurora/theme.mjs"));
  assert.ok(firstFiles.includes("packages/payments/src/module-024.mjs"));
});

test("fixture seeds change noise bytes without changing scenario file identity", async (context) => {
  const first = await mkdtemp(path.join(os.tmpdir(), "benchmark-seed-a-"));
  const second = await mkdtemp(path.join(os.tmpdir(), "benchmark-seed-b-"));
  context.after(async () => Promise.all([
    rm(first, { recursive: true, force: true }),
    rm(second, { recursive: true, force: true })
  ]));
  const scenario = await loadScenario("cross-stack-regression");
  const firstFiles = await materializeScenario(scenario, first, { seed: "seed-a" });
  const secondFiles = await materializeScenario(scenario, second, { seed: "seed-b" });
  assert.deepEqual(firstFiles, secondFiles);
  const relative = path.join("packages", "catalog", "src", "module-001.mjs");
  assert.notEqual(
    await readFile(path.join(first, relative), "utf8"),
    await readFile(path.join(second, relative), "utf8")
  );
});

test("all preregistered pilot scenario contracts load", async () => {
  for (const id of pilotScenarioIds) {
    const scenario = await loadScenario(id);
    assert.equal(scenario.id, id);
    assert.ok(scenario.oracleCommand.length > 0);
    assert.ok(scenario.repairCommand.length > 0);
  }
});

test("the control-first fixture is publicly ambiguous but oracle-discriminated", async (context) => {
  const workspace = await mkdtemp(path.join(os.tmpdir(), "benchmark-memory-dependent-"));
  context.after(() => rm(workspace, { recursive: true, force: true }));
  const seed = "memory-dependent-test";
  const baseScenario = await loadScenario("decision-memory-dependent");
  const variant = createScenarioVariant(baseScenario, {
    protocolVersion: "3.0.0",
    seed,
    variantKey: testVariantKey
  });
  const scenario = applyScenarioVariant(baseScenario, variant, seed, { variantKey: testVariantKey });
  await materializeScenario(scenario, workspace, { seed });

  assert.equal(controlFirstScenarioIds.includes(scenario.id), true);
  assert.equal(scenario.baselinePublicExpectedToFail, false);
  assert.equal(scenario.baselineOracleExpectedToFail, true);
  const publicBaseline = await runProcess("node", ["--test"], { cwd: workspace });
  const oracleBaseline = await runScenarioOracle(scenario, workspace);
  assert.equal(publicBaseline.exitCode, 0);
  assert.notEqual(oracleBaseline.exitCode, 0);

  const repair = await applyCanonicalRepair(scenario, workspace);
  assert.equal(repair.exitCode, 0);
  const publicRepaired = await runProcess("node", ["--test"], { cwd: workspace });
  const oracleRepaired = await runScenarioOracle(scenario, workspace);
  assert.equal(publicRepaired.exitCode, 0);
  assert.equal(oracleRepaired.exitCode, 0);
});

test("seeded tenant ownership is blinded, deterministic, and oracle-consistent", async (context) => {
  const baseScenario = await loadScenario("decision-memory-dependent");
  assert.deepEqual(baseScenario.expectedChangedFiles, ["__resolved_by_seeded_variant__"]);
  assert.equal(baseScenario.history.client, "seeded-owner");
  assert.doesNotMatch(JSON.stringify(baseScenario.history), /aurora|borealis|cedar/i);
  const assignments = seedsForEveryOwner(testVariantKey);

  for (const [owner, seed] of assignments) {
    const workspace = await mkdtemp(path.join(os.tmpdir(), `benchmark-owner-${owner}-`));
    context.after(() => rm(workspace, { recursive: true, force: true }));
    const variant = createScenarioVariant(baseScenario, {
      protocolVersion: "3.0.0",
      seed,
      variantKey: testVariantKey
    });
    const scenario = applyScenarioVariant(baseScenario, variant, seed, { variantKey: testVariantKey });

    assert.equal(seededDecisionMemoryOwner(seed, testVariantKey), owner);
    assert.equal(scenario.expectedChangedFiles[0], `clients/${owner}/article-tokens.mjs`);
    assert.equal(scenario.history.client, owner);
    assert.equal(scenario.oracleArguments[0], owner);
    assert.doesNotMatch(JSON.stringify(variant), /aurora|borealis|cedar/i);
    assert.doesNotMatch(JSON.stringify(variant), new RegExp(testVariantKey, "i"));
    for (const prompt of Object.values(buildPrompts(scenario))) {
      assert.doesNotMatch(prompt, /aurora|borealis|cedar/i);
    }
    assert.throws(
      () => applyScenarioVariant(baseScenario, variant, seed, {
        variantKey: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      }),
      /does not match/
    );

    await materializeScenario(scenario, workspace, { seed });
    const publicBaseline = await runProcess("node", ["--test"], { cwd: workspace });
    const oracleBaseline = await runScenarioOracle(scenario, workspace);
    assert.equal(publicBaseline.exitCode, 0);
    assert.notEqual(oracleBaseline.exitCode, 0);

    const repair = await applyCanonicalRepair(scenario, workspace);
    assert.equal(repair.exitCode, 0);
    const oracleRepaired = await runScenarioOracle(scenario, workspace);
    assert.equal(oracleRepaired.exitCode, 0);
  }
});

function seedsForEveryOwner(variantKey) {
  const assignments = new Map();
  for (let index = 0; assignments.size < 3 && index < 100; index += 1) {
    const seed = `owner-seed-${index}`;
    const owner = seededDecisionMemoryOwner(seed, variantKey);
    if (!assignments.has(owner)) assignments.set(owner, seed);
  }
  assert.equal(assignments.size, 3);
  return assignments;
}
