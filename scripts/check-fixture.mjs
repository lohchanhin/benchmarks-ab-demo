import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { runProcess } from "../src/lib/process.mjs";
import {
  applyCanonicalRepair,
  controlFirstScenarioIds,
  loadScenario,
  materializeScenario,
  pilotScenarioIds,
  runScenarioOracle
} from "../src/lib/scenario.mjs";

const scenarioIds = [...new Set([...pilotScenarioIds, ...controlFirstScenarioIds])];

for (const scenarioId of scenarioIds) {
  const root = await mkdtemp(path.join(os.tmpdir(), `vertex-palace-${scenarioId}-`));
  try {
    const scenario = await loadScenario(scenarioId);
    const files = await materializeScenario(scenario, root, { seed: "fixture-check-seed" });
    const baseline = await runProcess(scenario.testCommand[0], scenario.testCommand.slice(1), { cwd: root });
    const baselineOracle = await runScenarioOracle(scenario, root);
    const publicExpectedToFail = scenario.baselinePublicExpectedToFail
      ?? scenario.baselineExpectedToFail
      ?? false;
    const oracleExpectedToFail = scenario.baselineOracleExpectedToFail
      ?? scenario.baselineExpectedToFail
      ?? false;
    assertExpectedExit(`${scenarioId} public baseline`, baseline.exitCode, publicExpectedToFail);
    if (baselineOracle) {
      assertExpectedExit(`${scenarioId} hidden-oracle baseline`, baselineOracle.exitCode, oracleExpectedToFail);
    }

    const repair = await applyCanonicalRepair(scenario, root);
    if (repair.exitCode !== 0) throw new Error(`${scenarioId} canonical repair command failed: ${repair.stderr}`);
    const fixed = await runProcess(scenario.testCommand[0], scenario.testCommand.slice(1), { cwd: root });
    const fixedOracle = await runScenarioOracle(scenario, root);
    if (fixed.exitCode !== 0 || fixedOracle?.exitCode !== 0) {
      throw new Error(
        `${scenarioId} canonical repair should pass:\n${fixed.stdout}\n${fixed.stderr}\n${fixedOracle?.stderr ?? ""}`
      );
    }
    console.log(
      `${scenarioId}: ${files.length} files, public baseline ${exitLabel(baseline.exitCode)}, `
      + `oracle baseline ${exitLabel(baselineOracle?.exitCode)}, passing scoped repair and oracle.`
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

function assertExpectedExit(label, exitCode, expectedToFail) {
  const failed = exitCode !== 0;
  if (failed !== expectedToFail) {
    throw new Error(`${label} ${failed ? "failed" : "passed"}; expected to ${expectedToFail ? "fail" : "pass"}`);
  }
}

function exitLabel(exitCode) {
  if (exitCode === null || exitCode === undefined) return "not configured";
  return exitCode === 0 ? "passed" : "failed";
}
