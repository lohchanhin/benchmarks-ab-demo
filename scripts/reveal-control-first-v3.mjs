import assert from "node:assert/strict";
import { createHash, createHmac } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readJson, writeJson } from "../src/lib/files.mjs";
import { repositoryRoot } from "../src/lib/root.mjs";
import {
  decisionMemoryOwnerCandidates,
  scenarioVariantKeyCommitment,
  scenarioVariantKeyEnvironment,
  seededDecisionMemoryOwner,
  seededDecisionMemoryStratum,
  seededTenantOwnerVariantId
} from "../src/lib/scenario.mjs";
import { auditPublishedResults } from "./audit-results.mjs";

const scenarioId = "decision-memory-dependent";
const defaultResultsRoot = path.join(repositoryRoot, "results", "control-first-v3");
const defaultRevealPath = path.join(defaultResultsRoot, "blinding-reveal.json");

export async function buildControlFirstV3Reveal(options = {}) {
  const resultsRoot = path.resolve(options.resultsRoot ?? defaultResultsRoot);
  const planPath = path.join(resultsRoot, "plan.json");
  const manifestPath = path.join(resultsRoot, "manifest.json");
  const analysisPath = path.join(resultsRoot, "analysis.json");
  const plan = await readJson(planPath);
  const manifest = await readJson(manifestPath);
  const variantKey = String(options.variantKey ?? "").toLowerCase();
  const outcomesLockedAtCommit = String(options.outcomesLockedAtCommit ?? "");

  assert.match(outcomesLockedAtCommit, /^[a-f0-9]{40}$/, "A full result-lock commit is required");
  assert.equal(plan.protocolVersion, "3.0.0");
  assert.equal(plan.frozen, true);
  assert.equal(manifest.protocolVersion, plan.protocolVersion);
  assert.equal(manifest.trials.length, manifest.plannedTrials);
  assert.ok(manifest.trials.every((trial) => trial.status === "completed"));

  const audit = await auditPublishedResults(manifestPath);
  assert.deepEqual(audit.errors, [], "Published result audit must pass before key reveal");
  assert.equal(audit.trialCount, audit.plannedTrials);

  const policy = plan.scenarioVariantPolicy?.[scenarioId];
  assert.equal(policy?.id, seededTenantOwnerVariantId);
  assert.equal(policy?.revealPolicy, "publish-key-after-study-lock");
  assert.deepEqual(policy?.candidates, [...decisionMemoryOwnerCandidates]);
  const keyCommitment = scenarioVariantKeyCommitment(variantKey);
  assert.equal(keyCommitment, policy.blindingKeyCommitment, "Key does not match the frozen commitment");

  const assignments = [];
  for (const trial of plan.trials.filter((entry) => entry.scenario === scenarioId)) {
    const resultEntry = manifest.trials.find((entry) => entry.trialId === trial.trialId);
    assert.ok(resultEntry, `Missing published result for ${trial.trialId}`);
    const publicManifest = await readJson(path.join(resultsRoot, resultEntry.evidenceDirectory, "manifest.json"));
    const variant = publicManifest.scenarioVariant;
    const stratum = seededDecisionMemoryStratum(trial.seed);
    const owner = seededDecisionMemoryOwner(trial.seed, variantKey);
    const assignmentCommitment = createHmac("sha256", Buffer.from(variantKey, "hex"))
      .update(`${trial.seed}\0${seededTenantOwnerVariantId}\0${owner}`)
      .digest("hex");

    assert.equal(publicManifest.id, trial.trialId);
    assert.equal(publicManifest.seed, trial.seed);
    assert.equal(variant?.stratum, stratum);
    assert.equal(variant?.blindingKeyCommitment, keyCommitment);
    assert.equal(variant?.assignmentCommitment, assignmentCommitment);
    assert.equal(publicManifest.publication?.tenantIdentifiersRedacted, true);

    assignments.push({
      trialId: trial.trialId,
      seed: trial.seed,
      stratum,
      owner,
      assignmentCommitment,
      commitmentMatchesPublishedManifest: true
    });
  }

  const stratumMapping = [...new Map(assignments.map(({ stratum, owner }) => [stratum, owner]))]
    .map(([stratum, owner]) => ({ stratum, owner }))
    .sort((first, second) => first.stratum - second.stratum);
  assert.equal(stratumMapping.length, decisionMemoryOwnerCandidates.length);
  assert.equal(new Set(stratumMapping.map(({ owner }) => owner)).size, decisionMemoryOwnerCandidates.length);

  return {
    schemaVersion: 1,
    artifact: "control-first-v3-blinding-reveal",
    revealedAt: options.revealedAt ?? new Date().toISOString(),
    study: {
      id: plan.id,
      protocolVersion: plan.protocolVersion,
      outcomesLockedAtCommit,
      manifestSha256: await sha256File(manifestPath),
      analysisSha256: await sha256File(analysisPath)
    },
    blinding: {
      variantId: seededTenantOwnerVariantId,
      keyEncoding: "64-character lowercase hexadecimal",
      key: variantKey,
      keyCommitment,
      commitmentFormula: `sha256(UTF-8 ${seededTenantOwnerVariantId} + NUL + UTF-8 hex key)`,
      assignmentFormula: "hmac-sha256(hex key, UTF-8 seed + NUL + variant id + NUL + owner)",
      candidates: [...decisionMemoryOwnerCandidates]
    },
    verification: {
      resultsComplete: true,
      plannedTrials: audit.plannedTrials,
      attemptedTrials: audit.trialCount,
      armRuns: audit.armCount,
      validArmRuns: audit.validArmCount,
      successfulArmRuns: audit.successfulArmCount,
      checksumVerifiedEvidenceFiles: audit.verifiedFileCount,
      keyMatchesFrozenCommitment: true,
      allAssignmentCommitmentsMatch: true,
      allOwnerStrataCovered: true
    },
    stratumMapping,
    assignments
  };
}

export async function verifyControlFirstV3Reveal(revealPath = defaultRevealPath, options = {}) {
  const absoluteRevealPath = path.resolve(revealPath);
  const reveal = await readJson(absoluteRevealPath);
  const rebuilt = await buildControlFirstV3Reveal({
    resultsRoot: options.resultsRoot ?? path.dirname(absoluteRevealPath),
    variantKey: reveal.blinding?.key,
    outcomesLockedAtCommit: reveal.study?.outcomesLockedAtCommit,
    revealedAt: reveal.revealedAt
  });
  assert.deepEqual(reveal, rebuilt, "Published reveal does not reproduce from the frozen plan and results");
  return rebuilt;
}

async function sha256File(filePath) {
  return createHash("sha256").update(await readFile(filePath)).digest("hex");
}

function argumentValue(args, flag) {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
}

async function main() {
  const args = process.argv.slice(2);
  const outputPath = path.resolve(argumentValue(args, "--out") ?? defaultRevealPath);
  if (args.includes("--verify")) {
    const reveal = await verifyControlFirstV3Reveal(outputPath);
    process.stdout.write(`${JSON.stringify({
      mode: "verify",
      outputPath,
      keyCommitment: reveal.blinding.keyCommitment,
      assignmentsVerified: reveal.assignments.length,
      keyPrinted: false
    }, null, 2)}\n`);
    return;
  }

  const variantKey = process.env[scenarioVariantKeyEnvironment];
  delete process.env[scenarioVariantKeyEnvironment];
  const reveal = await buildControlFirstV3Reveal({
    resultsRoot: path.dirname(outputPath),
    variantKey,
    outcomesLockedAtCommit: argumentValue(args, "--locked-commit")
  });
  const write = args.includes("--write");
  if (write) await writeJson(outputPath, reveal);
  process.stdout.write(`${JSON.stringify({
    mode: write ? "write" : "preview",
    outputPath,
    keyCommitment: reveal.blinding.keyCommitment,
    assignmentsVerified: reveal.assignments.length,
    allOwnerStrataCovered: reveal.verification.allOwnerStrataCovered,
    keyPrinted: false
  }, null, 2)}\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
