import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { repositoryRoot } from "../src/lib/root.mjs";
import { verifyControlFirstV3Reveal } from "../scripts/reveal-control-first-v3.mjs";

test("published control-first v3 reveal reproduces every blinded assignment", async () => {
  const reveal = await verifyControlFirstV3Reveal(
    path.join(repositoryRoot, "results", "control-first-v3", "blinding-reveal.json")
  );

  assert.equal(reveal.verification.resultsComplete, true);
  assert.equal(reveal.verification.keyMatchesFrozenCommitment, true);
  assert.equal(reveal.verification.allAssignmentCommitmentsMatch, true);
  assert.equal(reveal.assignments.length, 4);
});
