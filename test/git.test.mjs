import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  assertFrozenProtocolGitState,
  collectGitEvidence,
  initializeFixtureGit,
  isPalaceInstrumentationPath,
  mergeChangedFiles
} from "../src/lib/git.mjs";
import { runProcess } from "../src/lib/process.mjs";

test("includes untracked paths in changed-file evidence", () => {
  assert.deepEqual(
    mergeChangedFiles(["src/existing.mjs"], ["notes/new.md", "src/existing.mjs"]),
    ["notes/new.md", "src/existing.mjs"]
  );
});

test("recognizes only the root Vertex Palace state as instrumentation", () => {
  assert.equal(isPalaceInstrumentationPath(".palace/"), true);
  assert.equal(isPalaceInstrumentationPath(".palace/indexes/nodes.json"), true);
  assert.equal(isPalaceInstrumentationPath("./.palace/routes/latest-route.json"), true);
  assert.equal(isPalaceInstrumentationPath("fixtures/project/.palace/config.json"), false);
  assert.equal(isPalaceInstrumentationPath(".palace-notes.md"), false);
});

test("keeps Palace state auditable while excluding it from changed-file scope", async (context) => {
  const workspace = await mkdtemp(path.join(os.tmpdir(), "benchmark-git-evidence-"));
  context.after(() => rm(workspace, { recursive: true, force: true }));
  await writeFile(path.join(workspace, "tracked.txt"), "baseline\n", "utf8");
  await initializeFixtureGit(workspace);

  await writeFile(path.join(workspace, "tracked.txt"), "changed\n", "utf8");
  await writeFile(path.join(workspace, "notes.md"), "untracked\n", "utf8");
  await mkdir(path.join(workspace, ".palace", "indexes"), { recursive: true });
  await writeFile(path.join(workspace, ".palace", "indexes", "nodes.json"), "{}\n", "utf8");

  const evidence = await collectGitEvidence(workspace);
  assert.deepEqual(evidence.changedFiles, ["notes.md", "tracked.txt"]);
  assert.deepEqual(evidence.untrackedFiles, ["notes.md"]);
  assert.deepEqual(evidence.instrumentationFiles, [".palace/"]);
  assert.deepEqual(evidence.instrumentationUntrackedFiles, [".palace/"]);
  assert.ok(evidence.status.includes("?? .palace/"));
});

test("requires protocol v3 to run only from its clean tagged commit", async (context) => {
  const workspace = await mkdtemp(path.join(os.tmpdir(), "benchmark-protocol-tag-"));
  context.after(() => rm(workspace, { recursive: true, force: true }));
  const trackedPath = path.join(workspace, "tracked.txt");
  await writeFile(trackedPath, "baseline\n", "utf8");
  await initializeFixtureGit(workspace);
  const plan = { protocolVersion: "3.0.0", protocolTag: "protocol-v3.0.0" };

  await assert.rejects(
    assertFrozenProtocolGitState(plan, workspace),
    /tag protocol-v3\.0\.0 does not exist/
  );
  await runProcess("git", ["tag", "protocol-v3.0.0"], { cwd: workspace, check: true });
  assert.deepEqual(
    await assertFrozenProtocolGitState(plan, workspace),
    {
      required: true,
      tag: "protocol-v3.0.0",
      tagCommit: (await runProcess("git", ["rev-parse", "HEAD"], { cwd: workspace, check: true })).stdout.trim(),
      headCommit: (await runProcess("git", ["rev-parse", "HEAD"], { cwd: workspace, check: true })).stdout.trim(),
      resume: false
    }
  );

  await writeFile(trackedPath, "dirty\n", "utf8");
  await assert.rejects(
    assertFrozenProtocolGitState(plan, workspace),
    /Initial formal protocol execution requires a clean Git worktree/
  );
  await runProcess("git", ["add", "tracked.txt"], { cwd: workspace, check: true });
  await runProcess(
    "git",
    ["-c", "user.name=Vertex Palace Benchmark", "-c", "user.email=benchmark@example.invalid", "commit", "-m", "new head"],
    { cwd: workspace, check: true }
  );
  await assert.rejects(
    assertFrozenProtocolGitState(plan, workspace),
    /does not point to the current HEAD/
  );
});

test("allows v3 resume only for result-only worktree and descendant commits", async (context) => {
  const workspace = await mkdtemp(path.join(os.tmpdir(), "benchmark-protocol-resume-"));
  context.after(() => rm(workspace, { recursive: true, force: true }));
  const resultRoot = path.join(workspace, "results", "control-first-v3");
  await mkdir(resultRoot, { recursive: true });
  await writeFile(path.join(workspace, "source.mjs"), "export const value = 1;\n", "utf8");
  await writeFile(path.join(resultRoot, "plan.json"), "{}\n", "utf8");
  await writeFile(path.join(resultRoot, "manifest.json"), "{\"trials\":[]}\n", "utf8");
  await initializeFixtureGit(workspace);
  await runProcess("git", ["tag", "protocol-v3.0.0"], { cwd: workspace, check: true });
  const plan = { protocolVersion: "3.0.0", protocolTag: "protocol-v3.0.0" };

  await writeFile(path.join(resultRoot, "manifest.json"), "{\"trials\":[{}]}\n", "utf8");
  assert.equal((await assertFrozenProtocolGitState(plan, workspace, { resume: true })).resume, true);
  await runProcess("git", ["add", "results/control-first-v3/manifest.json"], { cwd: workspace, check: true });
  await runProcess(
    "git",
    ["-c", "user.name=Vertex Palace Benchmark", "-c", "user.email=benchmark@example.invalid", "commit", "-m", "record result"],
    { cwd: workspace, check: true }
  );
  assert.equal((await assertFrozenProtocolGitState(plan, workspace, { resume: true })).resume, true);

  await writeFile(path.join(workspace, "source.mjs"), "export const value = 2;\n", "utf8");
  await assert.rejects(
    assertFrozenProtocolGitState(plan, workspace, { resume: true }),
    /non-result worktree changes: source\.mjs/
  );
});

test("does not impose the v3 tag gate on historical protocols", async () => {
  assert.deepEqual(
    await assertFrozenProtocolGitState({ protocolVersion: "2.2.0" }, "unused"),
    { required: false }
  );
});
