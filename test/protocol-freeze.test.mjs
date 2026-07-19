import assert from "node:assert/strict";
import test from "node:test";
import { prepareControlFirstFrozenPlan } from "../src/lib/protocol-freeze.mjs";

const variantKey = "3333333333333333333333333333333333333333333333333333333333333333";

test("prepares only a public commitment and leaves the draft unchanged", () => {
  const draft = {
    schemaVersion: 6,
    protocolVersion: "3.0.0",
    protocolTag: "protocol-v3.0.0",
    revisedAt: "before",
    frozen: false,
    scenarioVariantPolicy: {
      "decision-memory-dependent": { blindingKeyCommitment: null }
    }
  };
  const prepared = prepareControlFirstFrozenPlan(draft, variantKey, "2026-07-20T06:00:00.000Z");

  assert.equal(draft.frozen, false);
  assert.equal(draft.scenarioVariantPolicy["decision-memory-dependent"].blindingKeyCommitment, null);
  assert.equal(prepared.plan.frozen, true);
  assert.match(prepared.summary.blindingKeyCommitment, /^[a-f0-9]{64}$/);
  assert.equal(prepared.summary.privateKeyPersisted, false);
  assert.equal(JSON.stringify(prepared).includes(variantKey), false);
});

test("refuses an already committed or malformed freeze input", () => {
  const draft = {
    schemaVersion: 6,
    protocolVersion: "3.0.0",
    protocolTag: "protocol-v3.0.0",
    frozen: false,
    scenarioVariantPolicy: {
      "decision-memory-dependent": { blindingKeyCommitment: "already-set" }
    }
  };
  assert.throws(() => prepareControlFirstFrozenPlan(draft, variantKey), /empty blinding key commitment/);
  draft.scenarioVariantPolicy["decision-memory-dependent"].blindingKeyCommitment = null;
  assert.throws(() => prepareControlFirstFrozenPlan(draft, "too-short"), /32-byte hexadecimal key/);
});
