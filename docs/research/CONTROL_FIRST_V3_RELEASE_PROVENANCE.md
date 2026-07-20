# Control-First v3 Release Provenance Gate

Date: 2026-07-20

Machine evidence: [control-first-v3-release-provenance-2026-07-20.json](./evidence/control-first-v3-release-provenance-2026-07-20.json)

## Status

The formal v3 study remains intentionally unfrozen with 0/16 trials and 0/64
Agent arms attempted. This stage adds an executable package-provenance gate; it
does not add an Agent outcome or claim an efficiency improvement.

The final Vertex Palace package-content source is commit
`e901c1739c5aa907bc44ebcbd25bbdd7abd75e7a`. The checked release evidence is
committed at `f2e0ccabb0f5a7af77a72b971524122469f47172`; later commits add only
research assets outside the npm file list. Repeated `npm pack --dry-run`
produced the same seven-file `vertex-palace@0.3.0` tarball:

- SHA-1: `04602918f8e661a57c8286fb7b6d344baf9fb3aa`
- integrity: `sha512-muQvR5KxELoxhFKCUfnASJW58g9xdWp3+u6UJxtzAtiCpz8nh2GWDSm6UNmVIMeFt+qY7IdQ/s5yWrCcwgPRvg==`

Product lint, 90 product tests, build, MCP smoke, clean-package validation, and
pinned Zod and Requests validation passed before publication was attempted.
The earlier candidate remains attached to the non-formal preflight record; no
formal v3 outcome was generated before this final rebind.

## Real-Repository Provenance

The real-repository gate has now been regenerated from the exact release source
`e901c1739c5aa907bc44ebcbd25bbdd7abd75e7a` and the exact seven-file tarball
above. Its checked evidence is committed at
[`f2e0ccabb0f5a7af77a72b971524122469f47172`](https://github.com/lohchanhin/vertex-palace/commit/f2e0ccabb0f5a7af77a72b971524122469f47172),
and descendant [CI run 29743726827](https://github.com/lohchanhin/vertex-palace/actions/runs/29743726827)
passed on Ubuntu, Windows, macOS, and the package dry-run job.

Zod is the pinned TypeScript monorepo case; Requests is the pinned Python case.
Each repository was cloned at an exact commit and routed twice from a clean
tarball install under a 6,000-token ceiling. In all four runs, Palace returned
only the known implementation and focused test: target recall `1.000`, strict
target precision `1.000`, deterministic boundaries `2/2`, empty
selected-versus-Excluded overlap, and clean tracked worktrees. The full tasks,
expected and observed paths, repository commits, and
command are copied into the machine evidence for single-repository audit. This
is a product routing gate with no Control arm, so timing remains diagnostic and
does not support an Agent speed or Token claim.

The benchmark-side sync route matched only `test/docs.test.mjs` among five
changed files (coverage `0.20`, focus `0.10`, confidence `0.35`). It missed the
machine JSON and all three release/preflight records. That `needs-review`
result is retained beside the passing repository gate; it is direct evidence
that evidence-to-bilingual-document routing still needs work.

## Publication Attempt

`npm whoami` succeeded as `lohchanhin`. The subsequent public 0.3.0 publish
reached npm's official browser authorization step, but the authorization was
not completed before the CLI endpoint expired and returned `E404`. Registry
readback still returned 404 for `vertex-palace@0.3.0`; therefore no partial or
ambiguous 0.3.0 release exists. The benchmark dependency remains 0.2.1 until a
fresh interactive authorization succeeds and registry readback is verified.

## New Guardrail

The v3 plan schema is now 6. In addition to the package version and source
commit, it preregisters the release commit, tarball SHA-1, and npm integrity.
Before a formal Agent arm can start, the study runner checks:

1. `package.json` requests the exact preregistered version;
2. the root and package entries in `package-lock.json` request that version;
3. the lock entry resolves to the expected npm tarball;
4. the lock integrity equals the preregistered integrity; and
5. the installed package reports the exact version.

A unit test proves that the gate accepts the exact fixture and rejects a changed
integrity. Before the executable gate was added, the complete benchmark check
passed with 63/63 tests, all five
fixture contracts, every retained evidence audit, the v2.2 analysis
reproduction, and the v3 public manifest still at 0/16.

The follow-up executable gate adds `npm run gate:control-first:v3` and the
combined `npm run check:release-ready`. Its first real run passed 11/19 checks
and failed eight for the expected reasons: public 0.3.0 metadata was absent,
and `package.json` plus both lockfile version entries, tarball URL, and integrity
still described 0.2.1. The installed directory reported 0.3.0, demonstrating
why checking only `node_modules` would have produced a false sense of readiness.
The gate invokes no Codex process and exposes no registry error body or auth URL.
It explicitly queries `https://registry.npmjs.org` and removes the blinded
scenario key from the npm subprocess environment.
The complete suite then passed 65/65 tests with the same fixture, evidence, and
empty-manifest guarantees.

## Route Self-Evaluation

Vertex Palace routed 5/7 changed files (coverage 0.71, focus 0.71, confidence
0.35). It missed `README.zh-CN.md` and the core `src/commands/study.mjs`, so the
assessment remains `needs-review`. The reported 99.6% repository-to-pack token
reduction measures selected context only and is not evidence of lower Agent
tokens or wall time.

The executable-gate follow-up exposed a sharper release-routing weakness. The
default route found 3/11 changed files (coverage 0.27, focus 0.30); a route limit
of 40 found only 4/11 (coverage 0.36) while focus fell to 0.17. Both used
confidence 0.35 and were well calibrated, but both missed the new core
`src/lib/release-gate.mjs` plus most bilingual evidence surfaces. Increasing the
route limit mostly added unrelated fixtures and old memory evidence. This is
direct evidence for future source-to-test-to-script-to-document sibling routing,
not a reason to claim the smaller pack was sufficient.

## Next Gate

With the user present, repeat the official npm browser authorization, verify the
published shasum and integrity from the registry, install exact 0.3.0 into this
repository, run a clean `npm ci` and the complete check, and only then prepare
the private key commitment and protocol freeze commit. No formal arm may run
before that freeze commit is tagged.

## Freeze And Tag Execution Gate

The harness now enforces the final sequencing rule instead of leaving it to the
operator. `npm run freeze:control-first:v3` first requires a clean worktree and
the complete release-ready command. Only after every subprocess has finished
does it read the 32-byte key. Its default is a non-writing preview; `-- --write`
stores only the commitment and sets the plan to frozen. The private key is not
included in the returned object, output, plan, or child environment.

Before any v3 Agent arm, `study --execute` verifies the Git state. A first run
must use the exact clean commit pointed to by `protocol-v3.0.0`. A resume may use
that commit or a descendant only when every committed path is under
`results/control-first-v3/` except `plan.json`, and the only worktree change is
the v3 manifest. This permits interruption recovery without allowing source or
protocol drift.

The first resume test exposed a real parser defect: the shared line helper
trimmed Git porcelain prefixes before slicing the path, turning `results/...`
into `esults/...`. A dedicated prefix-preserving parser fixed it. The focused
suite then passed 17/17, including missing-tag, dirty-tree, wrong-HEAD,
result-only resume, private-key non-persistence, and malformed-freeze cases.
The complete benchmark check passed 70/70 with every prior fixture and evidence
audit unchanged and the formal v3 manifest still at 0/16.

Palace self-evaluation found 5/14 changed files (coverage 0.36, focus 0.50,
confidence 0.35, well calibrated). It recovered the three core implementation
files but missed the wrapper script, both direct regression tests, and most
bilingual evidence. The result remains `needs-review` and is retained as another
source-to-test-to-script sibling-routing gap, not an efficiency result.
