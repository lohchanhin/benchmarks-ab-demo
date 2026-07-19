import { scenarioVariantKeyCommitment } from "./scenario.mjs";

export function prepareControlFirstFrozenPlan(plan, variantKey, revisedAt = new Date().toISOString()) {
  if (plan.protocolVersion !== "3.0.0" || plan.protocolTag !== "protocol-v3.0.0") {
    throw new Error("Only the reviewed control-first v3 plan can be frozen");
  }
  if (plan.schemaVersion !== 6 || plan.frozen !== false) {
    throw new Error("Control-first v3 plan must be an unfrozen schema-6 draft");
  }
  const scenario = "decision-memory-dependent";
  const policy = plan.scenarioVariantPolicy?.[scenario];
  if (!policy || policy.blindingKeyCommitment !== null) {
    throw new Error("Control-first v3 plan must have an empty blinding key commitment before freeze");
  }
  const commitment = scenarioVariantKeyCommitment(variantKey);
  const frozenPlan = structuredClone(plan);
  frozenPlan.frozen = true;
  frozenPlan.revisedAt = revisedAt;
  frozenPlan.scenarioVariantPolicy[scenario].blindingKeyCommitment = commitment;
  return {
    plan: frozenPlan,
    summary: {
      protocolVersion: frozenPlan.protocolVersion,
      protocolTag: frozenPlan.protocolTag,
      frozen: frozenPlan.frozen,
      revisedAt,
      blindingKeyCommitment: commitment,
      privateKeyPersisted: false
    }
  };
}
