import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { sha256V4RunnerSources } from "../src/lib/v4-execution.mjs";
import { sha256Canonical } from "../src/lib/v4-protocol.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const publicArtifactPaths = [
  "protocol/v4/execution.binding.candidate.json",
  "protocol/v4/execution.review.receipt.json",
  "protocol/v4/execution.results.empty.json",
  "protocol/v4/execution.actual.json",
  "protocol/v4/execution.gate.json",
  "protocol/v4/execution.binding.frozen.json",
  "docs/research/evidence/real-repository-v4-execution-freeze.json"
];

test("committed V4 execution artifacts form one frozen zero-outcome binding", async () => {
  const [candidate, receipt, empty, actual, gate, frozen, evidence] = await Promise.all(
    publicArtifactPaths.map(readJson)
  );

  assert.equal(candidate.frozen, false);
  assert.equal(candidate.executionAllowed, false);
  assert.equal(candidate.formalAgentArmsRun, 0);
  assert.equal(receipt.approved, true);
  assert.equal(receipt.bindingSha256, sha256Canonical(candidate));
  assert.equal(empty.status, "not-started");
  assert.equal(empty.formalAgentArmsRun, 0);
  assert.deepEqual(empty.arms, []);

  assert.equal(actual.runnerSourceCommit, candidate.runner.sourceCommit);
  assert.equal(actual.runnerSourceSha256, candidate.runner.sourceSha256);
  assert.equal(actual.runnerSourceSha256, await sha256V4RunnerSources(repositoryRoot));
  assert.equal(actual.productSourceCommit, candidate.product.sourceCommit);
  assert.equal(actual.productTarballSha256, candidate.product.tarball.sha256);
  assert.equal(actual.productTarballIntegrity, candidate.product.tarball.sha512Integrity);
  assert.equal(actual.executionProfileSha256, sha256Canonical(candidate.executionProfile));
  assert.equal(actual.evaluatorSha256, candidate.evaluator.sourceSha256);

  assert.equal(gate.passed, true);
  assert.equal(gate.executionAllowed, true);
  assert.deepEqual(gate.summary, { checks: 10, passed: 10, failed: 0 });
  assert.equal(gate.checks.every((check) => check.status === "passed"), true);

  assert.equal(frozen.status, "frozen-human-reviewed");
  assert.equal(frozen.frozen, true);
  assert.equal(frozen.humanReviewApproved, true);
  assert.equal(frozen.executionAllowed, true);
  assert.equal(frozen.formalAgentArmsRun, 0);
  assert.equal(frozen.executionReviewReceiptSha256, sha256Canonical(receipt));
  assert.equal(frozen.runner.sourceSha256, actual.runnerSourceSha256);
  assert.equal(frozen.product.tarball.sha256, actual.productTarballSha256);
  assert.equal(frozen.freezeAudit.passed, true);
  assert.equal(frozen.freezeAudit.checks, 10);

  assert.equal(evidence.status, frozen.status);
  assert.equal(evidence.formalAgentArmsRun, 0);
  assert.deepEqual(evidence.gateSummary, gate.summary);
  assert.equal(evidence.ownerReview, true);
  assert.equal(evidence.independentThirdPartyReview, false);
});

test("public V4 execution artifacts exclude private evaluator inputs and local paths", async () => {
  for (const relativePath of publicArtifactPaths) {
    const text = await readFile(path.join(repositoryRoot, relativePath), "utf8");
    const value = JSON.parse(text);
    const keys = collectKeys(value);

    assert.doesNotMatch(text, /[A-Za-z]:\\\\/, `${relativePath} contains an absolute Windows path`);
    assert.doesNotMatch(text, /\.benchmark-private/i, `${relativePath} exposes the private root`);
    for (const forbidden of [
      "blindingKey",
      "privateOracle",
      "referenceResolution",
      "exactChangedFiles",
      "transcript",
      "sessionId"
    ]) {
      assert.equal(keys.has(forbidden), false, `${relativePath} exposes ${forbidden}`);
    }
  }
});

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(repositoryRoot, relativePath), "utf8"));
}

function collectKeys(value, keys = new Set()) {
  if (Array.isArray(value)) {
    for (const item of value) collectKeys(item, keys);
    return keys;
  }
  if (!value || typeof value !== "object") return keys;
  for (const [key, item] of Object.entries(value)) {
    keys.add(key);
    collectKeys(item, keys);
  }
  return keys;
}
