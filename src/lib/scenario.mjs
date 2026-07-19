import { createHash, createHmac } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { copyDirectory, listFiles, readJson } from "./files.mjs";
import { runProcess } from "./process.mjs";
import { repositoryRoot } from "./root.mjs";

export const defaultScenarioId = "tenant-theme-regression";
export const pilotScenarioIds = Object.freeze([
  "small-local-bug",
  "cross-stack-regression",
  "tenant-memory-pitfall",
  "stale-memory-adversarial"
]);

export const controlFirstScenarioIds = Object.freeze([
  "small-local-bug",
  "cross-stack-regression",
  "decision-memory-dependent",
  "stale-memory-adversarial"
]);

export const seededTenantOwnerVariantId = "seeded-tenant-owner-v1";
export const decisionMemoryOwnerCandidates = Object.freeze(["aurora", "borealis", "cedar"]);
export const scenarioVariantKeyEnvironment = "VERTEX_PALACE_BENCHMARK_VARIANT_KEY";

export function seededDecisionMemoryStratum(seed) {
  return seededInteger(
    String(seed),
    `decision-memory-dependent:${seededTenantOwnerVariantId}:stratum`
  ) % decisionMemoryOwnerCandidates.length;
}

export function scenarioVariantKeyCommitment(variantKey) {
  const key = requiredVariantKey(variantKey);
  return createHash("sha256")
    .update(`${seededTenantOwnerVariantId}\0${key}`)
    .digest("hex");
}

export function seededDecisionMemoryOwner(seed, variantKey) {
  const key = requiredVariantKey(variantKey);
  const permutation = decisionMemoryOwnerCandidates
    .map((candidate) => ({
      candidate,
      rank: createHmac("sha256", Buffer.from(key, "hex"))
        .update(`${seededTenantOwnerVariantId}\0candidate\0${candidate}`)
        .digest("hex")
    }))
    .sort((first, second) => first.rank.localeCompare(second.rank) || first.candidate.localeCompare(second.candidate))
    .map(({ candidate }) => candidate);
  return permutation[seededDecisionMemoryStratum(seed)];
}

export function createScenarioVariant(scenario, { protocolVersion, seed, variantKey } = {}) {
  if (protocolVersion !== "3.0.0" || scenario.seededOwner?.id !== seededTenantOwnerVariantId) return null;
  validateSeededOwnerConfig(scenario.seededOwner);
  const key = requiredVariantKey(variantKey);
  const owner = seededDecisionMemoryOwner(seed, key);
  return {
    id: seededTenantOwnerVariantId,
    stratum: seededDecisionMemoryStratum(seed),
    blindingKeyCommitment: scenarioVariantKeyCommitment(key),
    assignmentCommitment: ownerCommitment(key, seed, owner),
    candidateCount: decisionMemoryOwnerCandidates.length,
    ownerDisclosedToPrompt: false
  };
}

export function applyScenarioVariant(scenario, variant, seed, { variantKey } = {}) {
  if (!variant) return scenario;
  if (variant.id !== seededTenantOwnerVariantId || scenario.seededOwner?.id !== variant.id) {
    throw new Error(`Unsupported scenario variant: ${variant.id}`);
  }
  validateSeededOwnerConfig(scenario.seededOwner);
  const key = requiredVariantKey(variantKey);
  if (variant.blindingKeyCommitment !== scenarioVariantKeyCommitment(key)) {
    throw new Error("Scenario blinding key does not match its preregistered commitment");
  }
  if (variant.stratum !== seededDecisionMemoryStratum(seed)) {
    throw new Error("Scenario owner stratum does not match the run seed");
  }
  const owner = seededDecisionMemoryOwner(seed, key);
  if (variant.assignmentCommitment !== ownerCommitment(key, seed, owner)) {
    throw new Error("Scenario owner assignment commitment does not match the run seed");
  }

  const ownerPath = tenantTokenPath(owner);
  const siblingOwners = decisionMemoryOwnerCandidates.filter((candidate) => candidate !== owner);
  const candidatePaths = decisionMemoryOwnerCandidates.map(tenantTokenPath);
  const fixedForbidden = scenario.forbiddenChangedFiles.filter((file) => !candidatePaths.includes(file));
  const ownerName = title(owner);
  const siblingNames = siblingOwners.map(title).join(" and ");
  return {
    ...scenario,
    expectedChangedFiles: [ownerPath],
    forbiddenChangedFiles: [
      ...siblingOwners.map(tenantTokenPath),
      ...fixedForbidden
    ],
    history: {
      ...scenario.history,
      client: owner,
      decision: `${ownerName} is the independently governed launch tenant. Its article text token is client-owned; ${siblingNames} and the shared fallback remain under shared governance.`,
      pitfall: `A prior launch contrast fix changed the shared article token and altered every tenant. Resolve launch-only contrast in ${ownerName}'s client-owned token without changing shared or sibling tenant behavior.`,
      changedFiles: [ownerPath]
    },
    memorySignals: {
      ...scenario.memorySignals,
      pitfallViolationFiles: [
        ...siblingOwners.map(tenantTokenPath),
        "src/themes/shared-article-tokens.mjs"
      ]
    },
    oracleArguments: [owner],
    repairArguments: [owner],
    resolvedVariant: { id: variant.id, owner }
  };
}

export async function loadScenario(id = defaultScenarioId) {
  const directory = path.join(repositoryRoot, "scenarios", id);
  const scenario = await readJson(path.join(directory, "scenario.json"));
  validateScenario(scenario);
  const templateDirectory = path.resolve(directory, scenario.template ?? "template");
  const scenariosRoot = path.resolve(repositoryRoot, "scenarios");
  if (templateDirectory !== scenariosRoot && !templateDirectory.startsWith(`${scenariosRoot}${path.sep}`)) {
    throw new Error(`Scenario template escapes scenarios directory: ${scenario.template}`);
  }
  return { ...scenario, directory, templateDirectory };
}

export async function materializeScenario(scenario, destination, options = {}) {
  const seed = String(options.seed ?? "fixture-default");
  await copyDirectory(scenario.templateDirectory ?? path.join(scenario.directory, "template"), destination);
  await generateDomainNoise(destination, scenario.noise, seed);
  await generateTenantNoise(destination, scenario.noise, seed);
  return listFiles(destination);
}

export async function runScenarioOracle(scenario, workspace) {
  if (!scenario.oracleCommand) return null;
  return runExternalScenarioCommand(scenario, scenario.oracleCommand, workspace, scenario.oracleArguments);
}

export async function applyCanonicalRepair(scenario, workspace) {
  if (!scenario.repairCommand) throw new Error(`Scenario ${scenario.id} has no repairCommand`);
  return runExternalScenarioCommand(scenario, scenario.repairCommand, workspace, scenario.repairArguments);
}

function validateScenario(scenario) {
  const requiredStrings = ["id", "title", "task"];
  for (const key of requiredStrings) {
    if (typeof scenario[key] !== "string" || !scenario[key].trim()) {
      throw new Error(`Scenario is missing ${key}`);
    }
  }
  for (const key of ["testCommand", "expectedChangedFiles", "forbiddenChangedFiles"]) {
    if (!Array.isArray(scenario[key]) || scenario[key].length === 0) {
      throw new Error(`Scenario is missing ${key}`);
    }
  }
  for (const key of ["oracleCommand", "repairCommand"]) {
    if (scenario[key] !== undefined && (!Array.isArray(scenario[key]) || scenario[key].length === 0)) {
      throw new Error(`Scenario ${key} must be a non-empty command array`);
    }
  }
  for (const key of ["baselineExpectedToFail", "baselinePublicExpectedToFail", "baselineOracleExpectedToFail"]) {
    if (scenario[key] !== undefined && typeof scenario[key] !== "boolean") {
      throw new Error(`Scenario ${key} must be a boolean`);
    }
  }
}

async function generateDomainNoise(root, noise = {}, seed) {
  for (const domain of noise.domains ?? []) {
    for (let index = 1; index <= (noise.modulesPerDomain ?? 0); index += 1) {
      const suffix = String(index).padStart(3, "0");
      const target = path.join(root, "packages", domain, "src", `module-${suffix}.mjs`);
      const exportName = `${camel(domain)}Module${suffix}`;
      const nonce = seededInteger(seed, `domain:${domain}:${index}`);
      const source = [
        `export function ${exportName}(input) {`,
        `  return { domain: "${domain}", module: ${index}, nonce: ${nonce}, input };`,
        "}",
        ""
      ].join("\n");
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, source, "utf8");
    }
  }
}

async function generateTenantNoise(root, noise = {}, seed) {
  for (let index = 1; index <= (noise.tenantCount ?? 0); index += 1) {
    const suffix = String(index).padStart(3, "0");
    const target = path.join(root, "clients", `tenant-${suffix}`, "theme.mjs");
    const revision = seededInteger(seed, `tenant:${index}`);
    const source = [
      `export const tenant${suffix}Theme = Object.freeze({`,
      `  metadata: Object.freeze({ label: "Tenant ${suffix}", revision: ${revision} })`,
      "});",
      ""
    ].join("\n");
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, source, "utf8");
  }
}

function camel(value) {
  return value.replace(/[^a-z0-9]+(.)/g, (_, letter) => letter.toUpperCase());
}

function seededInteger(seed, label) {
  const digest = createHash("sha256").update(`${seed}\0${label}`).digest();
  return digest.readUInt32BE(0);
}

function ownerCommitment(key, seed, owner) {
  return createHmac("sha256", Buffer.from(key, "hex"))
    .update(`${seed}\0${seededTenantOwnerVariantId}\0${owner}`)
    .digest("hex");
}

function requiredVariantKey(explicit) {
  const key = explicit ?? process.env[scenarioVariantKeyEnvironment];
  if (typeof key !== "string" || !/^[a-f0-9]{64}$/i.test(key)) {
    throw new Error(
      `${scenarioVariantKeyEnvironment} must contain a 32-byte hexadecimal key for blinded scenario variants`
    );
  }
  return key.toLowerCase();
}

function tenantTokenPath(owner) {
  return `clients/${owner}/article-tokens.mjs`;
}

function title(value) {
  return `${value[0].toUpperCase()}${value.slice(1)}`;
}

function validateSeededOwnerConfig(config) {
  if (JSON.stringify(config.candidates) !== JSON.stringify(decisionMemoryOwnerCandidates)) {
    throw new Error("Seeded tenant owner candidates do not match the benchmark contract");
  }
}

function runExternalScenarioCommand(scenario, command, workspace, extraArguments = []) {
  return runProcess(command[0], [...command.slice(1), workspace, ...(extraArguments ?? [])], {
    cwd: scenario.directory,
    unsetEnv: ["NODE_TEST_CONTEXT", scenarioVariantKeyEnvironment]
  });
}
