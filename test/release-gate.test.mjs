import assert from "node:assert/strict";
import test from "node:test";
import { evaluateControlFirstReleaseGate } from "../src/lib/release-gate.mjs";

const version = "0.3.0";
const shasum = "04602918f8e661a57c8286fb7b6d344baf9fb3aa";
const integrity = "sha512-muQvR5KxELoxhFKCUfnASJW58g9xdWp3+u6UJxtzAtiCpz8nh2GWDSm6UNmVIMeFt+qY7IdQ/s5yWrCcwgPRvg==";

test("passes only when registry, lockfile, install, and empty v3 study agree", () => {
  const report = evaluateControlFirstReleaseGate(validFixture());
  assert.equal(report.passed, true);
  assert.deepEqual(report.summary, { checks: 19, passed: 19, failed: 0 });
  assert.equal(report.checks.every((entry) => entry.status === "passed"), true);
});

test("reports every release mismatch without running an Agent arm", () => {
  const fixture = validFixture();
  fixture.registry["dist.shasum"] = "0000000000000000000000000000000000000000";
  fixture.packageLock.packages["node_modules/vertex-palace"].integrity = "sha512-wrong";
  fixture.installedPackage.version = "0.2.3";
  fixture.manifest.trials.push({ trialId: "must-not-exist" });

  const report = evaluateControlFirstReleaseGate(fixture);
  assert.equal(report.passed, false);
  assert.deepEqual(
    report.checks.filter((entry) => entry.status === "failed").map((entry) => entry.id),
    ["manifest-empty", "registry-shasum", "lock-integrity", "installed-version"]
  );
  assert.equal(JSON.stringify(report).includes("session"), false);
});

function validFixture() {
  return {
    plan: {
      schemaVersion: 6,
      protocolVersion: "3.0.0",
      frozen: false,
      execution: {
        palaceVersion: version,
        palaceSourceCommit: "e901c1739c5aa907bc44ebcbd25bbdd7abd75e7a",
        palaceReleaseCommit: "f2e0ccabb0f5a7af77a72b971524122469f47172",
        palacePackageShasum: shasum,
        palacePackageIntegrity: integrity
      },
      trials: Array.from({ length: 16 }, (_, index) => ({ trialId: `trial-${index + 1}` }))
    },
    manifest: {
      protocolVersion: "3.0.0",
      plannedTrials: 16,
      trials: []
    },
    packageJson: {
      dependencies: { "vertex-palace": version }
    },
    packageLock: {
      packages: {
        "": { dependencies: { "vertex-palace": version } },
        "node_modules/vertex-palace": {
          version,
          resolved: `https://registry.npmjs.org/vertex-palace/-/vertex-palace-${version}.tgz`,
          integrity
        }
      }
    },
    installedPackage: { version },
    registry: {
      version,
      "dist.shasum": shasum,
      "dist.integrity": integrity
    }
  };
}
