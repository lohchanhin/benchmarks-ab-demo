import { mkdir } from "node:fs/promises";
import path from "node:path";
import { pathExists, readJson, writeJson, writeText } from "../lib/files.mjs";
import { loadRun, resolveRunDirectory } from "../lib/run-state.mjs";

export async function reportCommand(flags) {
  const runDirectory = await resolveRunDirectory(flags);
  const run = await loadRun(runDirectory);
  const report = await writeComparisonReport(run);
  console.log(`Markdown report: ${report.markdownPath}`);
  console.log(`JSON report: ${report.jsonPath}`);
}

export async function writeComparisonReport(run) {
  const artifacts = path.join(run.runDirectory, "artifacts");
  const evidence = {};
  for (const arm of ["control", "palace"]) {
    const source = path.join(artifacts, `${arm}-evidence.json`);
    if (!(await pathExists(source))) throw new Error(`Missing ${arm} evidence. Run verify first.`);
    evidence[arm] = await readJson(source);
  }

  const comparison = buildComparison(run, evidence);
  const reports = path.join(run.runDirectory, "reports");
  await mkdir(reports, { recursive: true });
  const markdownPath = path.join(reports, "comparison.md");
  const jsonPath = path.join(reports, "comparison.json");
  await Promise.all([
    writeText(markdownPath, renderMarkdown(comparison)),
    writeJson(jsonPath, comparison)
  ]);
  return { comparison, markdownPath, jsonPath };
}

export function buildComparison(run, evidence) {
  const control = summarize(evidence.control);
  const palace = summarize(evidence.palace);
  const comparable = control.valid === true && palace.valid === true && control.testsPassed && palace.testsPassed;
  return {
    schemaVersion: 2,
    runId: run.manifest.id,
    createdAt: new Date().toISOString(),
    scenario: run.manifest.scenario,
    scenarioTitle: run.manifest.scenarioTitle,
    task: run.manifest.task,
    repositoryTree: run.manifest.repositoryTree,
    generatedFileCount: run.manifest.generatedFileCount,
    control,
    palace,
    comparable,
    execution: {
      mode: "sequential",
      order: executionOrder(control, palace)
    },
    delta: {
      durationMsSaved: comparable ? subtract(control.durationMs, palace.durationMs) : null,
      toolCallsSaved: comparable ? subtract(control.toolCalls, palace.toolCalls) : null,
      failedCallsSaved: comparable ? subtract(control.failedCalls, palace.failedCalls) : null,
      routerErrorsSaved: comparable ? subtract(control.routerErrors, palace.routerErrors) : null,
      inspectionCommandsSaved: comparable ? subtract(control.inspectionCommands, palace.inspectionCommands) : null,
      inspectedFilesSaved: comparable ? subtract(control.inspectedFiles, palace.inspectedFiles) : null,
      referencedFilesSaved: comparable ? subtract(control.referencedFiles, palace.referencedFiles) : null,
      commandOutputCharsSaved: comparable ? subtract(control.commandOutputChars, palace.commandOutputChars) : null,
      inputTokensSaved: comparable ? subtract(control.inputTokens, palace.inputTokens) : null,
      cachedInputTokensSaved: comparable ? subtract(control.cachedInputTokens, palace.cachedInputTokens) : null,
      uncachedInputTokensSaved: comparable ? subtract(control.uncachedInputTokens, palace.uncachedInputTokens) : null,
      outputTokensSaved: comparable ? subtract(control.outputTokens, palace.outputTokens) : null,
      reportedTokensSaved: comparable ? subtract(control.reportedTokens, palace.reportedTokens) : null
    },
    caveats: [
      "Distinct repository path strings are matched anywhere in the transcript. An inventory command can list every path without reading every file's contents.",
      "Command-named files and command-output characters are transcript-derived context proxies, not an operating-system file-access audit.",
      "Codex input tokens are cumulative across model turns. Cached and uncached input are shown separately and are not an API billing statement.",
      "Paired arms run sequentially, never concurrently. Repeat pairs with alternating order and report medians to reduce order and service-load effects.",
      "A result is comparable only when both arms start from the recorded Git tree and pass their arm-validity checks.",
      "Correctness and scope determine the score. Speed and token metrics are reported, not rewarded."
    ]
  };
}

function summarize(evidence) {
  return {
    model: evidence.model,
    valid: evidence.validity.passed,
    validityVerified: evidence.validity.verified,
    validityReason: evidence.validity.reason,
    testsPassed: evidence.tests.passed,
    score: evidence.score.total,
    durationMs: evidence.execution?.durationMs ?? null,
    startedAt: evidence.execution?.startedAt ?? null,
    sequence: evidence.execution?.sequence ?? null,
    toolCalls: evidence.transcript.toolCalls,
    failedCalls: evidence.transcript.failedCalls ?? null,
    commandOutputChars: evidence.transcript.commandOutputChars ?? null,
    inspectionCommands: evidence.transcript.inspectionCommands,
    palaceCalls: evidence.transcript.palaceCalls,
    successfulPalaceCalls: evidence.transcript.successfulPalaceCalls ?? 0,
    inspectedFiles: evidence.transcript.inspectedFiles?.length ?? 0,
    referencedFiles: evidence.transcript.referencedFiles.length,
    referencedFilePaths: evidence.transcript.referencedFiles,
    inputTokens: tokenValue(evidence.transcript.usage.inputTokens),
    cachedInputTokens: tokenValue(evidence.transcript.usage.cachedInputTokens),
    uncachedInputTokens: tokenValue(
      evidence.transcript.usage.uncachedInputTokens
        ?? Math.max(0, (evidence.transcript.usage.inputTokens ?? 0) - (evidence.transcript.usage.cachedInputTokens ?? 0))
    ),
    outputTokens: tokenValue(evidence.transcript.usage.outputTokens),
    reportedTokens: tokenValue(evidence.transcript.usage.totalTokens),
    routerErrors: evidence.runtimeDiagnostics?.routerErrors ?? null,
    changedFiles: evidence.git.changedFiles,
    forbiddenChanged: evidence.score.forbiddenChanged,
    unexpectedChanged: evidence.score.unexpectedChanged,
    expectedCoverage: evidence.score.expectedCoverage,
    palaceEvaluation: evidence.palaceEvaluation
  };
}

function renderMarkdown(report) {
  const rows = [
    ["Tests passed", yesNo(report.control.testsPassed), yesNo(report.palace.testsPassed), "-"],
    ["Scope score", `${report.control.score}/100`, `${report.palace.score}/100`, "-"],
    ["Arm valid", validity(report.control), validity(report.palace), "-"],
    ["Elapsed time", duration(report.control.durationMs), duration(report.palace.durationMs), signedDuration(report.delta.durationMsSaved)],
    ["Recorded command/tool calls", number(report.control.toolCalls), number(report.palace.toolCalls), signed(report.delta.toolCallsSaved)],
    ["Failed recorded calls", number(report.control.failedCalls), number(report.palace.failedCalls), signed(report.delta.failedCallsSaved)],
    ["Codex router errors in stderr", number(report.control.routerErrors), number(report.palace.routerErrors), signed(report.delta.routerErrorsSaved)],
    ["Inspection commands", number(report.control.inspectionCommands), number(report.palace.inspectionCommands), signed(report.delta.inspectionCommandsSaved)],
    ["Files named in commands", number(report.control.inspectedFiles), number(report.palace.inspectedFiles), signed(report.delta.inspectedFilesSaved)],
    ["Distinct repository path strings observed", number(report.control.referencedFiles), number(report.palace.referencedFiles), signed(report.delta.referencedFilesSaved)],
    ["Command output characters", number(report.control.commandOutputChars), number(report.palace.commandOutputChars), signed(report.delta.commandOutputCharsSaved)],
    ["Cumulative input tokens", number(report.control.inputTokens), number(report.palace.inputTokens), signed(report.delta.inputTokensSaved)],
    ["Cached input tokens", number(report.control.cachedInputTokens), number(report.palace.cachedInputTokens), signed(report.delta.cachedInputTokensSaved)],
    ["Uncached input tokens", number(report.control.uncachedInputTokens), number(report.palace.uncachedInputTokens), signed(report.delta.uncachedInputTokensSaved)],
    ["Output tokens", number(report.control.outputTokens), number(report.palace.outputTokens), signed(report.delta.outputTokensSaved)],
    ["Cumulative reported tokens", number(report.control.reportedTokens), number(report.palace.reportedTokens), signed(report.delta.reportedTokensSaved)],
    ["Palace calls", number(report.control.palaceCalls), number(report.palace.palaceCalls), "-"]
  ];
  const lines = [
    "# Vertex Palace A/B Benchmark",
    "",
    `Run: \`${report.runId}\``,
    `Scenario: ${report.scenarioTitle}`,
    `Shared Git tree: \`${report.repositoryTree}\``,
    `Generated fixture files: ${report.generatedFileCount}`,
    `Comparable result: ${report.comparable ? "yes" : "no"}`,
    `Execution: sequential (${report.execution.order.map(armLabel).join(" -> ")})`,
    "",
    "## Task",
    "",
    report.task,
    "",
    "## Results",
    "",
    "| Metric | Control | Vertex Palace | Control minus Palace |",
    "| --- | ---: | ---: | ---: |",
    ...rows.map((row) => `| ${row.join(" | ")} |`),
    "",
    report.comparable
      ? "Positive values in the final column mean the Palace arm used less of that measured resource."
      : "Efficiency deltas are withheld because both arms did not complete as valid, passing runs.",
    "",
    "## Changed Files",
    "",
    "### Control",
    "",
    ...fileLines(report.control.changedFiles),
    "",
    "### Vertex Palace",
    "",
    ...fileLines(report.palace.changedFiles),
    "",
    "## Validity",
    "",
    `- Control: ${report.control.validityReason}`,
    `- Vertex Palace: ${report.palace.validityReason}`,
    "",
    "## Caveats",
    "",
    ...report.caveats.map((item) => `- ${item}`),
    ""
  ];

  const evaluation = report.palace.palaceEvaluation;
  if (evaluation?.context) {
    lines.splice(lines.indexOf("## Changed Files"), 0,
      "## Palace Context Evaluation",
      "",
      `- Repository estimate: ${number(evaluation.context.repositoryTokens)} tokens`,
      `- Context pack: ${number(evaluation.context.packTokens)} tokens`,
      `- Estimated reduction: ${number(evaluation.context.tokenReductionPercent)}%`,
      ""
    );
  }
  return lines.join("\n");
}

function fileLines(files) {
  return files.length ? files.map((file) => `- \`${file}\``) : ["- None"];
}

function subtract(first, second) {
  return first === null || second === null ? null : first - second;
}

function executionOrder(control, palace) {
  const arms = [
    { name: "control", sequence: control.sequence, startedAt: control.startedAt },
    { name: "palace", sequence: palace.sequence, startedAt: palace.startedAt }
  ];
  return arms
    .sort((first, second) => {
      if (first.sequence !== null && second.sequence !== null) return first.sequence - second.sequence;
      return String(first.startedAt ?? "").localeCompare(String(second.startedAt ?? ""));
    })
    .map((item) => item.name);
}

function armLabel(value) {
  return value === "palace" ? "Vertex Palace" : "Control";
}

function tokenValue(value) {
  return Number.isFinite(value) ? Number(value) : null;
}

function number(value) {
  return value === null || value === undefined ? "n/a" : new Intl.NumberFormat("en-US").format(value);
}

function signed(value) {
  if (value === null) return "n/a";
  return `${value > 0 ? "+" : ""}${number(value)}`;
}

function duration(value) {
  return value === null ? "n/a" : `${(value / 1000).toFixed(1)}s`;
}

function signedDuration(value) {
  if (value === null) return "n/a";
  return `${value > 0 ? "+" : ""}${(value / 1000).toFixed(1)}s`;
}

function yesNo(value) {
  return value ? "yes" : "no";
}

function validity(arm) {
  if (!arm.validityVerified) return "unverified";
  return arm.valid ? "valid" : "invalid";
}
