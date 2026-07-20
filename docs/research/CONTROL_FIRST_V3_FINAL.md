# Control-First v3 Final Report

Status: complete, exploratory, and preregistered. The 16 formal trials and 64
Agent arms are published under `results/control-first-v3/`.

[Simplified Chinese](../zh-CN/CONTROL_FIRST_V3_FINAL.md) | [Protocol](PROTOCOL_V3.md) | [Machine analysis](../../results/control-first-v3/analysis.json) | [Blinding reveal](../../results/control-first-v3/blinding-reveal.json)

## Executive Finding

Vertex Palace 0.3.0 showed a meaningful **synthetic decision-memory signal**,
not a general performance win. Adaptive Palace completed 16/16 tasks; Control
completed 13/16. All three discordant outcomes occurred in the hidden
tenant-ownership scenario, where Control made a plausible but forbidden scope
choice and Adaptive used the relevant historical decision.

The small pilot does not establish statistical significance for that
correctness difference: the raw exact paired p-value is 0.25 and the
scenario-family Holm-adjusted p-value is 1.00. Across the 13 pairs where both
arms succeeded, the overall Token, wall-time, and tool-call intervals all cross
zero. Vertex Palace therefore is **not proven generally faster or cheaper**.

## Frozen Design

- Product: public `vertex-palace@0.3.0`, pinned by npm SHA-1 and integrity.
- Protocol: `3.0.0`, frozen at tag `protocol-v3.0.0` before Agent outcomes.
- Design: four scenarios, four seeds per scenario, and four sequential arms.
- Arms: Control, Route-only, Full Palace, and Adaptive Palace.
- Order: balanced four-arm Williams order; two warm and two cold indexes per
  scenario.
- Correctness: public tests, hidden oracle, exact changed-file scope, and
  forbidden-file checks.
- Blinding: the decision owner was hidden behind a committed 256-bit key until
  commit `0c81fb268ed3f4c856fd33e11612a82b769fd7b3` locked every outcome.

## Primary Results

Differences are `Adaptive - Control`. Negative efficiency values favor
Adaptive. Efficiency includes only mutually successful pairs.

| Scenario | Control success | Adaptive success | Reported Token difference, 95% CI | Wall-time difference, 95% CI | Tool-call difference, 95% CI |
| --- | ---: | ---: | ---: | ---: | ---: |
| Small local bug | 4/4 | 4/4 | -1,443.5 [-37,997, 38] | -3.7 s [-25.9, 3.0] | +0.5 [-2, 2] |
| Cross-stack regression | 4/4 | 4/4 | -13,822.5 [-27,995, 2,429] | +0.1 s [-10.0, 10.7] | -1 [-1, 0] |
| Decision-memory dependent | 1/4 | 4/4 | -97,299 [n=1] | -79.2 s [n=1] | -16 [n=1] |
| Stale-memory adversarial | 4/4 | 4/4 | +36,954 [22,498, 52,473] | +22.6 s [11.9, 25.0] | +4.5 [3, 6] |

The decision-memory efficiency row has only one mutually successful pair and
is descriptive, not a stable effect estimate.

## Overall Results

- All 16 Adaptive-Control pairs were valid.
- Adaptive success was 100%; Control success was 81.25%.
- Adaptive had three treatment-only successes and no Control-only success.
- The success difference was +18.75 percentage points, 95% bootstrap interval
  [0, 37.5]; raw exact paired p=0.25.
- Across 13 mutual successes, the paired median reported-Token difference was
  -806 [-14,743, 22,498].
- Across those pairs, wall time was +3.0 seconds [-6.1, 11.9], and tool calls
  were 0 [-1, 3].
- Adaptive achieved 100% median changed-file precision and recall with zero
  forbidden changes. Control had three forbidden-scope violations, all in the
  decision-memory scenario.

Pooling hides important heterogeneity: bypass and cross-stack tasks were
neutral or directionally favorable, while guarded stale-memory handling had a
clear fixed cost against a Control that already solved the task.

## Memory Findings

In the decision-memory block, Control and Route-only succeeded once each;
Adaptive and Full Palace succeeded four times each. Route-only violated the
historical pitfall in 3/4 trials, while both memory-bearing modes avoided it in
4/4. This is the strongest evidence that project history can disambiguate a
locally plausible repair scope.

In the stale-memory block, Adaptive included zero stale memories, adopted no
wrong advice, and succeeded 4/4. The guard was safe, but it cost a supported
median +36,954 reported tokens, +22.6 seconds, and +4.5 calls versus Control in
this synthetic task.

## Blinding Audit

The reveal was generated only after all formal results were committed. The
published key reproduces the frozen SHA-256 commitment, all four HMAC assignment
commitments, and all three owner strata. Public per-trial evidence remains
redacted; the separate reveal artifact publishes the mapping needed for audit.

```sh
npm run audit:control-first:v3
npm run analysis:control-first:v3
npm run verify:reveal:control-first:v3
```

Expected audit totals are 16/16 trials, 64/64 valid arms, 58 successful arms,
and 128 checksum-verified public evidence files.

## Claim Boundary

This study supports the claim that structured historical memory can prevent
specific scope mistakes in an underdetermined synthetic task, and that 0.3.0
can reject stale memory. It does not prove a universal Token, speed, or tool-call
advantage, nor does it establish correctness benefits on real repositories.

The next study should be a new preregistered v4 protocol using real issues,
repository history, architecture decisions, TypeScript and Python projects, and
objective hidden oracles. It must not reuse v3 outcomes as if they were new
evidence.
