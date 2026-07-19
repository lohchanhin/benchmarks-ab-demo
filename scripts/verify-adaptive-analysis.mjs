import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { analyzeManifest, renderAnalysisMarkdown } from "../analysis/paired-analysis.mjs";
import { repositoryRoot } from "../src/lib/root.mjs";

const defaultManifest = path.join(repositoryRoot, "results", "adaptive-pilot-v2.2", "manifest.json");
const defaultAnalysis = path.join(repositoryRoot, "results", "adaptive-pilot-v2.2", "analysis.json");

export async function verifyAdaptiveAnalysis(options = {}) {
  const manifestPath = path.resolve(options.manifestPath ?? defaultManifest);
  const analysisPath = path.resolve(options.analysisPath ?? defaultAnalysis);
  const expected = JSON.parse(await readFile(analysisPath, "utf8"));
  const generated = await analyzeManifest(manifestPath, {
    iterations: Number(options.iterations ?? 10000),
    bootstrapSeed: options.bootstrapSeed ?? "pilot-v1"
  });

  assert.deepEqual(
    withoutGeneratedAt(generated),
    withoutGeneratedAt(expected),
    "Regenerated Adaptive v2.2 analysis differs from the published JSON beyond generatedAt."
  );

  const markdownPath = analysisPath.replace(/\.json$/i, ".md");
  const expectedMarkdown = await readFile(markdownPath, "utf8");
  assert.equal(
    renderAnalysisMarkdown(generated),
    expectedMarkdown,
    "Regenerated Adaptive v2.2 Markdown differs from the published report."
  );

  return {
    manifestPath,
    analysisPath,
    ignoredField: "generatedAt",
    trials: generated.attemptedTrials,
    arms: generated.armSummaries
      ? Object.values(generated.armSummaries).reduce((sum, arm) => sum + (arm.runCount ?? 0), 0)
      : null
  };
}

function withoutGeneratedAt(analysis) {
  const { generatedAt: _generatedAt, ...comparable } = analysis;
  return comparable;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await verifyAdaptiveAnalysis();
  console.log(
    `Adaptive v2.2 analysis reproduction passed (${result.trials} trials; ignored ${result.ignoredField} only).`
  );
}
