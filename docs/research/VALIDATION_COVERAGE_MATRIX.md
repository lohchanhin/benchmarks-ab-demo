# Validation Coverage Matrix

Date: 2026-07-20

[Simplified Chinese](../zh-CN/VALIDATION_COVERAGE_MATRIX.md) | [Machine-readable matrix](./evidence/validation-coverage-matrix-2026-07-20.json)

## Why This Exists

Vertex Palace has several different kinds of evidence. A deterministic routing
gate is not an Agent benchmark, a fixture preflight is not a real-repository
result, and a historical exploratory study is not a result for the unpublished
0.3.0 candidate. This matrix keeps those boundaries visible for judges and for
future development.

Palace's own route for creating this matrix matched `0/7` actual files
(coverage `0`, focus `0`, confidence `0.35`). It remained inside fixture source
and missed the bilingual matrices, machine artifact, navigation, and direct
test. The overconfident `needs-review` result is retained as evidence that
documentation and claim-inventory tasks still route poorly.

## Research Evolution

### First study: fixed Palace treatments (v1.0.0)

The first preregistered study used four deterministic synthetic repositories,
five paired trials per scenario, and three sequential arms: Control,
Route-only, and Full Palace. The protocol, seeds, model, timeout, scoring, and
hidden oracles were frozen before outcomes. Efficiency was compared only when
both paired arms were valid and successful.

All 20 trials and 60 Arms passed, so no correctness loss was observed. Full
Palace versus Control nevertheless added a paired median of 67,223.5 reported
tokens (95% interval 25,362.5 to 112,437.5), 8.5 tool calls (6 to 16), and
29.8 seconds (16.4 to 49.2). Memory did not improve tenant-task correctness
because Control and Route-only also avoided the trap. Stale advice was rejected
in 5/5 Full runs, which was useful safety evidence but not an efficiency win.

### Second study: Adaptive Palace (v2.2)

The second study added Adaptive as a fourth Arm and focused on whether mode
selection could avoid Full Palace overhead. Four scenarios each used four
trials, balanced Williams order, two warm and two cold indexes, sequential
execution, public tests, hidden oracles, and frozen `protocol-v2.2.0` evidence.
An earlier v2.0 attempt was invalid because PowerShell changed `$0.00` in three
task prompts; v2.1 was stopped after Windows split writable roots caused patch
verification failures. Both failed attempts remain public.

All 16 v2.2 trials and 64 Arms were valid and successful. Adaptive reduced
Palace-owned output by 898.5 bytes versus Full, with an interval fully below
zero. End-to-end Token, tool-call, and time intervals versus Full crossed zero.
Against Control, Adaptive used a median 30,147 more reported tokens and 10.919
more seconds, both inconclusive, plus 4.5 more tool calls with a 95% interval of
2.5 to 6.5. The study also found that 0.2.1 Adaptive omitted useful memory in
4/4 trials. The supported value was smaller, auditable routing and stale-memory
guardrails, not a universal speed or Token advantage.

### Current direction: corrected 0.3.0 and Control-first v3

The negative findings drove true bypass, explicit memory telemetry, scoped
guardrails, execution boundaries, confidence calibration, and exact package
provenance in 0.3.0. The next protocol makes Adaptive versus Control primary,
uses a hidden tenant owner selected with a secret commitment, and blocks any
formal Arm until public npm metadata, clean installation, freeze commit, and
Git tag agree. It remains `frozen:false` at 0/16 trials and 0/64 Arms.

## Coverage

| Surface | Status | Evidence | Honest interpretation |
| --- | --- | --- | --- |
| Local clean package, CLI, and MCP | **Validated product gate** | Seven-file 0.3.0 tarball; clean install; 10 MCP tools; cross-platform CI | The candidate package works before publication. This is not an Agent comparison. |
| TypeScript monorepo routing | **Validated product gate** | Pinned Zod, two identical routes, recall 1.000, strict precision 1.000 | The known issue-style implementation and test are retrieved in this fixed case. |
| Python repository routing | **Validated product gate** | Pinned Requests, two identical routes, recall 1.000, strict precision 1.000 | The known issue-style implementation and test are retrieved in this fixed case. |
| Independent small-OSS stratum | **Not separately tested** | Requests has 123 indexed files, but no size threshold was preregistered | Do not relabel Requests after seeing the result. Add a separately defined small-OSS case later. |
| Real-repository issue-style tasks | **Validated product gate** | Zod and Requests retrieval only | Routing is supported for two fixed tasks; end-to-end Agent repair is not tested. |
| Real-repository history-dependent task | **Not tested** | None | Memory value on a real project remains unknown. |
| Real-repository architecture/refactor task | **Not tested** | None | Cross-module architecture coverage remains unknown. |
| True adaptive bypass contract | **Validated product gate** | Four repeated 3-field, 200-byte bypass outputs | The router can bypass packed source. The Agent may still explore afterward. |
| Memory-dependent tenant fixture | **Engineering preflight** | One sequential run: Route-only failed; Full, Adaptive, and Control passed | Memory beat structure-only routing once, but did not beat Control on correctness. |
| Stale-memory resistance | **Historical exploratory evidence** | v2.2 stale-memory block: 4 trials, 16 valid successful Arms, no wrong-memory adoption | Guardrails were safe in this synthetic block for 0.2.1; 0.3.0 v3 replication is pending. |
| Adaptive versus Control efficiency | **Historical exploratory evidence** | v2.2: 16 mutual successes; Adaptive +30,147 reported tokens, +10.919 s, +4.5 tool calls | Token and time intervals crossed zero; tool-call overhead did not. No general efficiency win was shown. |
| Control-first v3 formal study | **Blocked, not run** | `frozen:false`; 0/16 trials; 0/64 Arms | No 0.3.0 formal outcome exists yet. |
| Public npm installation | **Blocked** | Registry latest remains 0.2.3; browser authorization expired | Local 0.3.0 evidence cannot substitute for immutable public registry metadata. |

## Claims We Can Make

- The packed 0.3.0 candidate deterministically retrieves the exact known code
  and focused tests for the pinned Zod and Requests tasks.
- The candidate has a compact true-bypass contract and auditable memory
  inclusion/exclusion telemetry.
- In the retained v2.2 study, Adaptive reduced Palace's own payload relative to
  Full Palace, but did not demonstrate lower end-to-end Token use or wall time
  than Control.
- One engineered memory-dependent preflight produced a Route-only failure and
  an Adaptive success, while Control also succeeded.

## Claims We Cannot Make Yet

- Vertex Palace generally saves Agent Token, time, or tool calls.
- Vertex Palace improves correctness over ordinary Codex on real repositories.
- The current evidence covers a separately preregistered small-OSS stratum,
  real-repository historical decisions, or architecture/refactor tasks.
- `vertex-palace@0.3.0` is publicly installable from npm.

## Next Evidence

1. Publish and read back immutable npm 0.3.0 metadata.
2. Install exact 0.3.0 from a clean clone, pass the release gate, freeze the v3
   plan, and create `protocol-v3.0.0`.
3. Run the 16 preregistered Control-first trials sequentially.
4. In a separate future protocol, define a small-OSS size threshold before
   selecting a repository and add real-repository history and architecture
   tasks with hidden, objective oracles.
