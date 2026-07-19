import { runProcess } from "./process.mjs";

export async function initializeFixtureGit(workspace) {
  await runProcess("git", ["init", "--initial-branch=main"], { cwd: workspace, check: true });
  await runProcess("git", ["add", "--all"], { cwd: workspace, check: true });
  await runProcess(
    "git",
    [
      "-c",
      "user.name=Vertex Palace Benchmark",
      "-c",
      "user.email=benchmark@example.invalid",
      "commit",
      "-m",
      "benchmark baseline"
    ],
    { cwd: workspace, check: true }
  );
  const commit = await runProcess("git", ["rev-parse", "HEAD"], { cwd: workspace, check: true });
  const tree = await runProcess("git", ["rev-parse", "HEAD^{tree}"], { cwd: workspace, check: true });
  return { commit: commit.stdout.trim(), tree: tree.stdout.trim() };
}

export async function assertCleanGitWorktree(workspace) {
  const status = await runProcess(
    "git",
    ["status", "--porcelain", "--untracked-files=all"],
    { cwd: workspace, check: true }
  );
  if (status.stdout.trim()) {
    throw new Error("Formal protocol execution requires a clean Git worktree");
  }
  return true;
}

export async function assertFrozenProtocolGitState(plan, workspace, options = {}) {
  if (plan.protocolVersion !== "3.0.0") return { required: false };
  const tag = plan.protocolTag;
  if (typeof tag !== "string" || !/^protocol-v\d+\.\d+\.\d+$/.test(tag)) {
    throw new Error("Formal protocol plan has an invalid Git tag");
  }
  const resume = options.resume === true;
  const [status, head, taggedCommit] = await Promise.all([
    runProcess("git", ["status", "--porcelain", "--untracked-files=all"], { cwd: workspace, check: true }),
    runProcess("git", ["rev-parse", "HEAD"], { cwd: workspace, check: true }),
    runProcess("git", ["rev-list", "-n", "1", `refs/tags/${tag}`], { cwd: workspace })
  ]);
  const headCommit = head.stdout.trim();
  const tagCommit = taggedCommit.exitCode === 0 ? taggedCommit.stdout.trim() : "";
  if (!tagCommit) throw new Error(`Formal protocol tag ${tag} does not exist`);
  if (!resume && status.stdout.trim()) {
    throw new Error("Initial formal protocol execution requires a clean Git worktree");
  }
  if (!resume && tagCommit !== headCommit) {
    throw new Error(`Formal protocol tag ${tag} does not point to the current HEAD`);
  }
  if (resume) {
    const dirtyPaths = porcelainPaths(status.stdout);
    const forbiddenDirty = dirtyPaths.filter((file) => file !== "results/control-first-v3/manifest.json");
    if (forbiddenDirty.length) {
      throw new Error(`Formal protocol resume has non-result worktree changes: ${forbiddenDirty.join(", ")}`);
    }
    const ancestor = await runProcess(
      "git",
      ["merge-base", "--is-ancestor", `refs/tags/${tag}`, "HEAD"],
      { cwd: workspace }
    );
    if (ancestor.exitCode !== 0) {
      throw new Error(`Formal protocol tag ${tag} is not an ancestor of the current HEAD`);
    }
    const committed = await runProcess(
      "git",
      ["diff", "--name-only", `refs/tags/${tag}..HEAD`],
      { cwd: workspace, check: true }
    );
    const forbiddenCommitted = lines(committed.stdout).map(normalize).filter((file) => (
      !file.startsWith("results/control-first-v3/")
      || file === "results/control-first-v3/plan.json"
    ));
    if (forbiddenCommitted.length) {
      throw new Error(`Formal protocol resume has non-result commits: ${forbiddenCommitted.join(", ")}`);
    }
  }
  return { required: true, tag, tagCommit, headCommit, resume };
}

export async function collectGitEvidence(workspace) {
  const [status, changed, numstat, check, tree] = await Promise.all([
    runProcess("git", ["status", "--short"], { cwd: workspace, check: true }),
    runProcess("git", ["diff", "--name-only", "HEAD"], { cwd: workspace, check: true }),
    runProcess("git", ["diff", "--numstat", "HEAD"], { cwd: workspace, check: true }),
    runProcess("git", ["diff", "--check", "HEAD"], { cwd: workspace }),
    runProcess("git", ["rev-parse", "HEAD^{tree}"], { cwd: workspace, check: true })
  ]);
  const statusLines = lines(status.stdout);
  const diffFiles = lines(changed.stdout).map(normalize);
  const rawUntrackedFiles = statusLines
    .filter((line) => line.startsWith("?? "))
    .map((line) => normalize(line.slice(3)));
  const allChangedFiles = mergeChangedFiles(diffFiles, rawUntrackedFiles);
  const instrumentationFiles = allChangedFiles.filter(isPalaceInstrumentationPath);
  return {
    status: statusLines,
    changedFiles: allChangedFiles.filter((file) => !isPalaceInstrumentationPath(file)),
    untrackedFiles: rawUntrackedFiles.filter((file) => !isPalaceInstrumentationPath(file)),
    instrumentationFiles,
    instrumentationUntrackedFiles: rawUntrackedFiles.filter(isPalaceInstrumentationPath),
    numstat: parseNumstat(numstat.stdout),
    diffCheckPassed: check.exitCode === 0,
    diffCheckOutput: `${check.stdout}${check.stderr}`.trim(),
    headTree: tree.stdout.trim()
  };
}

export function mergeChangedFiles(diffFiles, untrackedFiles) {
  return [...new Set([...diffFiles, ...untrackedFiles])].sort();
}

export function isPalaceInstrumentationPath(value) {
  const normalized = normalize(value).replace(/^\.\//, "");
  return normalized === ".palace" || normalized.startsWith(".palace/");
}

function parseNumstat(value) {
  return lines(value).map((line) => {
    const [added, deleted, ...file] = line.split("\t");
    return {
      file: normalize(file.join("\t")),
      added: added === "-" ? null : Number(added),
      deleted: deleted === "-" ? null : Number(deleted)
    };
  });
}

function lines(value) {
  return value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

function porcelainPaths(value) {
  return value
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => normalize(line.slice(3).trim()));
}

function normalize(value) {
  return value.replaceAll("\\", "/");
}
