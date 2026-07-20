# Vertex Palace 0.3.0 Candidate Validation: Final Report

Status: **complete, non-formal, preregistered engineering validation**.

Release recommendation: **hold stable npm publication and revise the
candidate**. The exact 0.3.0 package demonstrated useful memory safety and
auditable routing, but it did not meet its end-to-end efficiency objective
against normal Codex.

## Study completed

- 16/16 planned trials across four synthetic scenarios.
- 64 sequential Agent arms: Control, Route-only, Full Palace, Adaptive Palace.
- 63 valid arms and 58 successful arms.
- 128 sanitized evidence files with verified checksums and no detected session
  IDs or private paths.
- Exact local `vertex-palace@0.3.0` tarball and source provenance remained fixed.
- One Full timeout and one Adaptive network-startup invalidity came from the
  same disclosed small-local system-sleep incident; no result was replaced.
- The formal Control-first v3 study remains unfrozen and untouched at 0/16.

## Arm outcomes

| Arm | Attempted | Valid | Successful | Observed failure source |
| --- | ---: | ---: | ---: | --- |
| Control | 16 | 16 | 15 | One wrong tenant scope in decision-memory |
| Route-only | 16 | 16 | 13 | Three wrong tenant scopes in decision-memory |
| Full Palace | 16 | 16 | 15 | One retained infrastructure timeout |
| Adaptive Palace | 16 | 15 | 15 | One invalid network-startup arm |

Among the 15 valid Adaptive-versus-Control pairs, Adaptive succeeded 15/15 and
Control 14/15. The sole discordant pair favored Adaptive, but the exact McNemar
p-value was `1.0`; every Holm-adjusted scenario p-value was also `1.0`. This is
encouraging mechanism evidence, not a statistically established correctness
effect.

## Scenario findings

| Scenario | Main observation | What it supports |
| --- | --- | --- |
| Small local | Adaptive chose `bypass` in all 3 valid runs and emitted only 177 bytes, but still used +14,029 reported tokens and +2 calls versus Control | Bypass shrinks Palace payload relative to Full, not total Agent cost versus Control |
| Cross-stack | Every arm was 4/4 correct; Palace route Recall@K was 1.0, but Adaptive used +30,630.5 tokens and +3 calls versus Control | Accurate routing without an observed correctness or efficiency advantage |
| Decision memory | Adaptive and Full were 4/4, Control 3/4, Route-only 1/4; one Control scope violation was prevented | Historical decisions can prevent a plausible wrong-scope change |
| Stale memory | Every arm was 4/4; Adaptive adopted no obsolete advice, but carried two stale memories as guarded warnings | Guardrails resisted stale memory, while exclusion and payload still need work |

Adaptive's 15 valid mode selections were three `bypass`, four `full-palace`,
and eight `guarded-memory-palace`. Its selected modes matched the intended task
profiles. Selection quality alone did not remove the cost of calling Palace and
then letting the Agent re-inspect the repository.

## Primary comparison

Efficiency includes only the 14 pairs where both Adaptive and Control produced
successful answers.

| Metric | Adaptive - Control paired median | 95% bootstrap CI |
| --- | ---: | ---: |
| Reported tokens | **+19,922.5** | +14,029 to +37,892 |
| Wall time | **+10.135 s** | +6.086 to +14.799 s |
| Tool calls | **+2.5** | +2 to +4 |

All three intervals are above zero. On this candidate matrix, Adaptive was
systematically more expensive than Control after conditioning on correctness.
This directly rejects a claim that 0.3.0 already improves general Agent speed
or Token efficiency.

Adaptive and Full were both successful in every valid pair. Adaptive minus Full
was -13,389 reported tokens (CI -19,868 to +19,881), -0.802 seconds (CI -9.056
to +6.772), and -2 tool calls (CI -3 to +1). These intervals do not establish a
reliable end-to-end advantage over Full either.

## What 0.3.0 did prove useful

1. The router found the required synthetic code with high recall and strict,
   auditable scope evidence.
2. True bypass reduced Palace's own context payload for trivial tasks.
3. Decision memory produced one concrete Control-fail / Adaptive-success scope
   correction that Route-only could not reproduce.
4. Guardrails prevented obsolete v1 memory from causing a wrong change in all
   four stale-memory trials.
5. Memory inclusion, candidates, exclusions, guardrails, and context cost are
   now machine-readable instead of implicit.

That value is **structured routing, historical-decision safety, stale-memory
resistance, and auditability**. It is not yet performance acceleration.

## Why npm is held

The release was conditioned on the candidate changes being useful under the
full Agent test, not merely passing unit tests. Correctness safety passed, but
the true-bypass objective required end-to-end overhead near Control; instead,
the aggregate Token, time, and call costs were all higher. Publishing 0.3.0 as
an efficiency release would therefore outrun the evidence.

The exact tarball remains archived and reproducible. It can still be described
as a successful research candidate for memory safety, but stable npm
publication should wait for a revised candidate and fresh confirmation.

## Next development direction

1. Remove the mandatory explicit Palace call for obvious single-file tasks, or
   move the bypass decision into a host hook that returns no packed context.
2. Bound cross-stack payload and stop the Agent from repeating inspection that
   the route has already resolved.
3. Exclude clear stale scope mismatches from source context; retain only compact
   conflict metadata and verification requirements.
4. Keep memory fidelity and changed-file scope as release gates while reducing
   telemetry delivered inside the Agent context.
5. Build a revised immutable candidate, use fresh seeds, and rerun a targeted
   preregistered confirmation before npm or the formal v3 freeze.

## Claim boundary

This is a small synthetic, single-model, non-formal candidate study. It can
diagnose the tested package and reject unsupported release claims. It cannot
prove general behavior on real repositories, teams, languages, or future model
versions. The complete sanitized evidence and analysis are public so the
decision can be independently inspected.
