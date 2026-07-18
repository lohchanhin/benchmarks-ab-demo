import assert from "node:assert/strict";
import test from "node:test";
import { orderedArms } from "../src/commands/run.mjs";

test("runs paired arms sequentially in the requested order", () => {
  assert.deepEqual(orderedArms("both", "control-first"), ["control", "palace"]);
  assert.deepEqual(orderedArms("both", "palace-first"), ["palace", "control"]);
  assert.deepEqual(orderedArms("control", "palace-first"), ["control"]);
});
