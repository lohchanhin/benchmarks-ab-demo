# Benchmark Methodology

## Research question

For the same repository task and starting tree, does Vertex Palace change the
amount of repository exploration and context used by Codex while preserving
correctness and implementation scope?

## Independent variable

- Control: Vertex Palace use is explicitly prohibited.
- Treatment: one `palace context` call is required before ordinary exploration.
  It performs stale-index refresh, task routing, compact packing, and relevant
  pitfall retrieval behind one measured interface.

Tool installation by itself is not the treatment. The JSONL transcript must
show zero Palace calls in Control and at least one Palace call in Treatment.

## Constants

The harness records or enforces:

- Identical Git tree
- Identical engineering task
- Identical generated file set
- Identical test command
- Same Codex model selected by the runner
- Fresh, ephemeral Codex executions
- No network requirement inside the fixture

Reasoning effort and service tier should also be held constant by the person
running the benchmark. These settings are not inferred from output text.

## Scenario design

The fixture contains 240 deterministic files. Relevant behavior crosses tenant
configuration, client lookup, shared defaults, rendering, and tests. Noise is
spread across eight unrelated domains and 36 unrelated tenants.

The untouched fixture has two failing requirements. A complete repair must:

1. Set an accessible Aurora-specific color.
2. Make the renderer honor explicit tenant text-color overrides.
3. Preserve shared behavior for Borealis and Cedar.
4. Leave the specification tests intact.

The Palace arm is seeded with a previous failed attempt and a tenant-isolation
pitfall. This models accumulated project knowledge rather than giving away the
literal final patch.

## Measurements

### Ground-truth measurements

- Test exit status and duration
- Git changed files and line counts
- Forbidden and unrelated changed files
- `git diff --check`
- Shared starting tree hash

### Transcript-derived measurements

- Codex execution duration
- Command and tool-call counts
- Failed recorded calls and Codex router errors from stderr
- Inspection-command count
- Repository paths explicitly named in command invocations
- Distinct repository path strings observed anywhere in JSONL events
- Command-output characters captured in completed tool events
- Palace-call count
- Codex-reported cumulative input, cached input, uncached input, and output usage

Command-named files and observed path strings are not an operating-system
access audit. An inventory command such as `rg --files` can print every path
without reading every file's contents, while a directory or stream operation
can read content without naming each file in the transcript. These fields are
repeatable transcript-derived proxies and must not be labeled "files read."

Codex-reported tokens are not an API invoice. The parser takes the largest
usage values reported in a run to avoid double-counting nested events. Input
usage is cumulative across turns, so a workflow that sends repeated context
can have high input usage even when its final pack is small. Cached and
uncached input are therefore reported separately.

### Palace evaluation

When the Palace arm writes a route-evaluation artifact, the comparison report
includes repository-token estimates, context-pack estimates, changed-file
coverage, and confidence calibration. These are Palace estimates and are kept
separate from Codex-reported usage.

## Score

The 100-point score evaluates engineering outcome, not speed:

- 60 points for a passing complete test suite
- Up to 20 points for covering the two expected root-cause files
- Up to 20 points for a clean, scoped diff

Changing a forbidden file removes the scope points. Extra changed files and
whitespace errors also reduce scope points.

## Recommended experiment

Each pair runs sequentially; the harness never launches both arms concurrently.
Run at least three paired trials with fresh workspaces. Alternate which arm
runs first to reduce warm-cache, queue, and service-load effects. Report each
trial and the median; do not publish only the best Palace run or worst Control
run. The default five-second cooldown is recorded in `artifacts/run-plan.json`.

## Claims this benchmark cannot support

- That every non-Palace agent scans an entire repository
- Exact billing savings for all repositories
- Universal routing accuracy across languages and architectures
- Replacement of tests, Git review, deployment checks, or engineering judgment

The benchmark supports narrow claims about recorded runs on its fixed scenario.
Additional scenarios should be added before making broader claims.
