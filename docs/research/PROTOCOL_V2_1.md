# Vertex Palace Adaptive Benchmark Protocol 2.1

> Historical protocol notice: one valid trial was executed, then the remaining
> plan was retired after a post-outcome Windows split-writable-root defect was
> identified in the benchmark harness. The result remains public; future runs
> require a fresh successor protocol and seeds. The original frozen text is
> available at tag `protocol-v2.1.0`.

Protocol version: 2.1.0

Status: preregistered exploratory successor pilot

Freeze tag: `protocol-v2.1.0`

Freeze date: 2026-07-19

This protocol supersedes v2.0.0 for future execution. The first v2.0.0 trial
was inspected before a PowerShell task-transport defect was found: `$0.00` was
delivered to Palace as `.00`. That attempt is retained and classified as
incomparable. Protocol 2.1 uses new trial ids, new fixture seeds, Vertex Palace
0.2.1, and exact treatment-fidelity validation. It does not replace or relabel
the frozen v2.0.0 plan.

## Research Questions

1. Is Adaptive Palace non-inferior to always-on Full Palace for fixture-defined
   task success?
2. Among mutually successful and valid pairs, does Adaptive Palace reduce the
   Palace command payload?
3. Do payload reductions carry through to cumulative uncached input tokens,
   total reported tokens, tool calls, or wall time?
4. Does the selected adaptive mode match the preregistered scenario role?
5. Does guarded memory retain useful tenant evidence without adopting stale
   adversarial advice?

Null, slower, more expensive, or less-correct outcomes remain in the dataset.
Fewer routed paths alone are not evidence of end-to-end efficiency.

## Scope And Sample

The four preregistered scenarios are unchanged:

1. `small-local-bug`: negative control for routing overhead.
2. `cross-stack-regression`: indirect frontend/backend dependency coverage.
3. `tenant-memory-pitfall`: useful client-scoped historical evidence.
4. `stale-memory-adversarial`: plausible but wrong historical evidence.

Each scenario has four new independently materialized seeds. Every seed runs
four arms from byte-identical tracked Git trees: 4 scenarios x 4 seeds x 4
arms = 64 agent runs. Four pairs per scenario are exploratory and are not
powered to establish non-inferiority.

## Experimental Arms

### Control

- No Palace call and no `.palace` read.
- Ordinary Codex repository exploration.

### Route-only

- Prepared structural index without task history.
- Exactly one legacy `palace context` call.

### Full Palace

- Scenario history is seeded when defined.
- Exactly one legacy `palace context` call.
- Represents the always-on treatment.

### Adaptive Palace

- Receives the same independently seeded history as Full Palace.
- Exactly one `palace context --auto` call.
- May choose `bypass`, `route-lite`, `full-palace`, or
  `guarded-memory-palace`.
- Current code and tests outrank remembered evidence.

Post-task evaluation, memory writes, publication, and index maintenance are
outside timed treatment.

## Task Transport And Fidelity

The frozen task is passed to Palace as a PowerShell single-quoted argument;
embedded single quotes are doubled. This is the only task-transport change
from protocol 2.0.0.

Every Palace arm must expose the received task under `## Task`. Verification
extracts that value from captured command stdout and exact-compares it with
the run manifest. A mismatch makes that arm invalid even when its code, tests,
or hidden oracle pass. Control remains individually assessable, but no
cross-arm comparison is eligible unless all arms required by that comparison
are valid. The exact host shell and platform are recorded as execution
environment limitations; this pilot is executed on Windows PowerShell.

## Cache And Order Balance

Each scenario has two `warm` and two `cold` local Palace-index trials. Cold
preparation removes only `.palace/indexes/` after creating equivalent Palace
state. Provider-side cache, service load, and network conditions cannot be
held constant.

Each scenario uses all four Williams sequences once:

1. Control, Route-only, Adaptive, Full.
2. Route-only, Full, Control, Adaptive.
3. Full, Adaptive, Route-only, Control.
4. Adaptive, Control, Full, Route-only.

Every sequence occurs twice warm and twice cold across the complete study.
Arms run sequentially in separate workspaces and fresh Codex processes; they
never run concurrently.

## Fixed Execution Conditions

- Model: `gpt-5.6-sol`.
- Reasoning effort: `xhigh`.
- Codex CLI: `codex-cli 0.145.0-alpha.18`.
- Vertex Palace: `0.2.1`.
- Timeout: 600,000 ms per arm.
- Cooldown: 15,000 ms between arms.
- Public tests and hidden oracle are identical across arms.
- Network access is unnecessary for fixture tasks.

Version or model mismatch is infrastructure invalidity. Attempts remain
recorded and require an explicit amendment before rerun.

## Outcomes

The primary comparison is Adaptive Palace versus Full Palace task success.
Success requires a valid treatment, exit before timeout, passing public tests,
passing hidden oracle, the frozen starting Git tree, and no forbidden change.

Adaptive validity additionally requires `--auto`, one successful Palace call,
a parseable adaptive payload, exact final-output byte accounting, and exact
task fidelity. Route-only and Full are invalid if they use `--auto`; every
Palace arm requires exact task fidelity.

Secondary outcomes are:

- Palace output characters, UTF-8 bytes, and common estimated tokens;
- adaptive mode, route tiers, memory items, and guardrails;
- cumulative, cached, uncached, and output Codex tokens;
- tool calls, failed calls, inspection commands, and command-output size;
- wall time, changed-file precision/recall, and forbidden changes;
- route Recall@K/Precision@K and memory safety signals.

Efficiency is reported only for mutually successful valid pairs. Correctness
is never traded for lower Token or time values.

## Analysis And Publication

- Adaptive minus Full is the primary paired view.
- Raw paired outcomes, exact paired success tests, paired differences, and
  seeded bootstrap 95% intervals are reported.
- Scenario p-values use Holm adjustment when inferential tests are eligible.
- Continuous metrics include every raw value, medians, paired medians, and
  missingness; invalid pairs are named, not discarded.
- Warm/cold strata are descriptive unless enough valid pairs exist.
- No unfavorable run or metric may be removed.

Raw JSONL transcripts remain local because they may contain session ids and
absolute paths. Public bundles contain sanitized manifests, all four evidence
files, reports, and SHA-256 coverage for every public file.

The frozen plan is `results/adaptive-pilot-v2.1/plan.json`. The frozen empty
results manifest is `results/adaptive-pilot-v2.1/manifest.json`. Any later code,
protocol, fixture, metric, exclusion, or validity change requires a dated
amendment and a new successor protocol before affected agent execution.
