import assert from "node:assert/strict";
import test from "node:test";
import {
  analyzeReports,
  exactMcNemar,
  holmAdjust,
  renderAnalysisMarkdown
} from "../analysis/paired-analysis.mjs";
import {
  median,
  pairedBootstrapMedianDifference
} from "../analysis/bootstrap-ci.mjs";

test("computes deterministic paired bootstrap intervals", () => {
  const first = [8, 7, 9, 6, 10];
  const second = [10, 10, 10, 10, 10];
  const firstRun = pairedBootstrapMedianDifference(first, second, { iterations: 1000, seed: "fixed" });
  const secondRun = pairedBootstrapMedianDifference(first, second, { iterations: 1000, seed: "fixed" });
  assert.deepEqual(firstRun, secondRun);
  assert.equal(firstRun.estimate, -2);
  assert.equal(median([4, 1, 3, 2]), 2.5);
});

test("uses exact paired tests and Holm step-down correction", () => {
  assert.equal(exactMcNemar(0, 3), 0.25);
  assert.deepEqual(holmAdjust([0.01, 0.04, 0.03]), [0.03, 0.06, 0.06]);
});

test("keeps failures in success analysis and efficiency to mutual successes", () => {
  const entries = [
    entry("trial-1", true, true, 100, 70),
    entry("trial-2", true, false, 90, 20),
    entry("trial-3", false, true, 30, 80)
  ];
  const result = analyzeReports(entries, { iterations: 500, bootstrapSeed: "analysis-test" });
  const scenario = result.scenarios.demo;
  assert.equal(scenario.validPairs, 3);
  assert.deepEqual(scenario.success.controlRaw, [1, 1, 0]);
  assert.deepEqual(scenario.success.fullPalaceRaw, [1, 0, 1]);
  assert.equal(scenario.metrics.durationMs.pairCount, 1);
  assert.deepEqual(scenario.metrics.durationMs.controlRaw, [100]);
  assert.deepEqual(scenario.metrics.durationMs.fullPalaceRaw, [70]);
  assert.equal(scenario.comparisons.routeOnlyMinusControl.validPairs, 3);
  assert.deepEqual(scenario.comparisons.routeOnlyMinusControl.success.treatmentRaw, [1, 1, 1]);
  assert.deepEqual(scenario.comparisons.routeOnlyMinusControl.metrics.durationMs.baselineRaw, [100, 90]);
  assert.deepEqual(scenario.comparisons.routeOnlyMinusControl.metrics.durationMs.treatmentRaw, [85, 85]);
  assert.deepEqual(scenario.comparisons.fullPalaceMinusRouteOnly.metrics.durationMs.baselineRaw, [85, 85]);
  assert.deepEqual(scenario.comparisons.fullPalaceMinusRouteOnly.metrics.durationMs.treatmentRaw, [70, 80]);
});

test("labels partial pilot output as interim against the preregistered trial count", () => {
  const result = analyzeReports([entry("trial-1", true, true, 100, 70)], {
    iterations: 100,
    bootstrapSeed: "interim-test",
    manifest: {
      plannedScenarios: ["one", "two", "three", "four"],
      plannedSeedsPerScenario: 5,
      trials: [{ trialId: "trial-1" }]
    }
  });
  assert.equal(result.plannedTrials, 20);
  assert.equal(result.attemptedTrials, 1);
  assert.equal(result.loadedTrials, 1);
  assert.match(result.caveats.join("\n"), /interim analysis with 1 of 20/);
  const markdown = renderAnalysisMarkdown(result);
  assert.match(markdown, /Interim only: 1\/20 planned trials/);
  assert.match(markdown, /Mutually Successful Pair Efficiency/);
  assert.match(markdown, /Three-Arm Ablation/);
  assert.match(markdown, /Route-only - Control/);
  assert.match(markdown, /\| demo \| Reported tokens \| 1 \| 1,100 \| 1,100 \| 0 \[0, 0\] \|/);
});

test("uses Adaptive versus Full Palace as the v2 primary comparison", () => {
  const adaptiveEntry = entry("adaptive-1", true, true, 100, 80);
  adaptiveEntry.report.arms["adaptive-palace"] = {
    ...arm(true, 55),
    palaceContextEstimatedTokens: 400,
    palaceContextOutputChars: 1600
  };
  adaptiveEntry.report.arms["full-palace"] = {
    ...adaptiveEntry.report.arms["full-palace"],
    palaceContextEstimatedTokens: 1200,
    palaceContextOutputChars: 4800
  };

  const result = analyzeReports([adaptiveEntry], { iterations: 100, bootstrapSeed: "adaptive-test" });
  const scenario = result.scenarios.demo;
  assert.equal(result.schemaVersion, 2);
  assert.equal(scenario.primaryComparison.baselineArm, "fullPalace");
  assert.equal(scenario.primaryComparison.treatmentArm, "adaptivePalace");
  assert.equal(scenario.primaryComparison.metrics.durationMs.treatmentMinusBaseline.estimate, -25);
  assert.equal(
    scenario.primaryComparison.metrics.palaceContextEstimatedTokens.treatmentMinusBaseline.estimate,
    -800
  );
  assert.match(renderAnalysisMarkdown(result), /Four-Arm Adaptive Contrasts/);
  assert.match(renderAnalysisMarkdown(result), /Adaptive Palace - Full Palace/);
});

test("uses Adaptive versus Control as the v3 primary and names discordant scope outcomes", () => {
  const adaptiveWin = entry("control-first-1", false, true, 100, 80);
  adaptiveWin.report.arms["adaptive-palace"] = {
    ...arm(true, 60),
    changedFilePrecision: 1,
    changedFileRecall: 1,
    forbiddenViolation: false
  };
  adaptiveWin.report.arms.control = {
    ...adaptiveWin.report.arms.control,
    changedFilePrecision: 0.5,
    changedFileRecall: 1,
    forbiddenViolation: true
  };
  const mutual = entry("control-first-2", true, true, 120, 90);
  mutual.report.arms["adaptive-palace"] = arm(true, 70);

  const result = analyzeReports([adaptiveWin, mutual], {
    iterations: 100,
    bootstrapSeed: "control-first-test",
    manifest: {
      protocolVersion: "3.0.0",
      primaryComparison: "adaptive-vs-control",
      primaryEfficiencyMetric: "reportedTokens",
      trials: [{ trialId: "control-first-1" }, { trialId: "control-first-2" }]
    }
  });
  const scenario = result.scenarios.demo;
  assert.equal(result.schemaVersion, 3);
  assert.equal(result.primaryEfficiencyMetric, "reportedTokens");
  assert.equal("success" in scenario, false);
  assert.equal("metrics" in scenario, false);
  assert.equal(scenario.primaryComparison.baselineArm, "control");
  assert.equal(scenario.primaryComparison.treatmentArm, "adaptivePalace");
  assert.deepEqual(
    scenario.primaryComparison.success.discordant.treatmentOnlyIds,
    ["control-first-1"]
  );
  assert.equal(scenario.primaryComparison.scope.baseline.changedFilePrecisionMedian, 0.75);
  assert.equal(scenario.primaryComparison.scope.baseline.forbiddenViolationCount, 1);

  const markdown = renderAnalysisMarkdown(result);
  assert.match(markdown, /Primary comparison: Adaptive Palace versus Control/);
  assert.match(markdown, /Primary efficiency metric: cumulative reported tokens/);
  assert.match(markdown, /Scope Outcomes Across Valid Primary Pairs/);
  assert.match(markdown, /`control-first-1`/);
  assert.ok(markdown.indexOf("Adaptive Palace - Control") < markdown.indexOf("Adaptive Palace - Full Palace"));
});

function entry(trialId, controlSuccess, palaceSuccess, controlDuration, palaceDuration) {
  return {
    trial: { trialId, scenario: "demo" },
    report: {
      runId: trialId,
      scenario: "demo",
      arms: {
        control: arm(controlSuccess, controlDuration),
        "route-only": arm(true, 85),
        "full-palace": arm(palaceSuccess, palaceDuration)
      }
    }
  };
}

function arm(success, durationMs) {
  return {
    valid: true,
    success,
    durationMs,
    toolCalls: 5,
    failedCalls: 0,
    routerErrors: 0,
    inspectionCommands: 3,
    commandOutputChars: 100,
    inputTokens: 1000,
    cachedInputTokens: 500,
    uncachedInputTokens: 500,
    outputTokens: 100,
    reportedTokens: 1100,
    changedFilePrecision: 1,
    changedFileRecall: 1,
    route: { recallAtK: 1, precisionAtK: 0.5 },
    memory: { pitfallViolation: false, wrongMemoryAdopted: false }
  };
}
