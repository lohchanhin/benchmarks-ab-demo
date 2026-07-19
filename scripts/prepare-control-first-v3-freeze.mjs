import path from "node:path";
import { readJson, writeJson } from "../src/lib/files.mjs";
import { assertCleanGitWorktree } from "../src/lib/git.mjs";
import { runProcess } from "../src/lib/process.mjs";
import { prepareControlFirstFrozenPlan } from "../src/lib/protocol-freeze.mjs";
import { repositoryRoot } from "../src/lib/root.mjs";
import { scenarioVariantKeyEnvironment } from "../src/lib/scenario.mjs";

const planPath = path.join(repositoryRoot, "results", "control-first-v3", "plan.json");
await assertCleanGitWorktree(repositoryRoot);
const releaseReady = await runProcess(
  "npm",
  ["run", "check:release-ready"],
  {
    cwd: repositoryRoot,
    windowsShim: true,
    timeoutMs: 180000,
    unsetEnv: [scenarioVariantKeyEnvironment],
    echo: true
  }
);
if (releaseReady.exitCode !== 0) {
  throw new Error("Release readiness checks failed; the protocol plan was not changed");
}

const variantKey = process.env[scenarioVariantKeyEnvironment];
delete process.env[scenarioVariantKeyEnvironment];
const plan = await readJson(planPath);
const prepared = prepareControlFirstFrozenPlan(plan, variantKey);
const write = process.argv.slice(2).includes("--write");
if (write) await writeJson(planPath, prepared.plan);
process.stdout.write(`${JSON.stringify({
  ...prepared.summary,
  writeRequested: write,
  planChanged: write
}, null, 2)}\n`);
