# Vertex Palace Control-First Four-Arm Benchmark

Run: `stale-memory-adversarial-control-first-v3-pilot-03`
Scenario: Stale scheduler-configuration memory
Shared Git tree: `10e45aaf26ffe26c670cf127c18cad5a7579b17e`
Generated fixture files: 93
Palace index state: warm
Comparable result: yes
Execution: sequential (Route-only -> Full Palace -> Control -> Adaptive Palace)

## Task

Fix the v2 batch scheduler returning a limit of 10 instead of the configured limit of 25. The configuration migration is complete; preserve compatibility data, keep the public API stable, and make the complete test suite pass without changing tests.

## Results

| Metric | Control | Route-only | Full Palace | Adaptive Palace | Control minus Adaptive |
| --- | ---: | ---: | ---: | ---: | ---: |
| Protocol success | yes | yes | yes | yes | - |
| Public tests | yes | yes | yes | yes | - |
| Hidden oracle | yes | yes | yes | yes | - |
| Timed out | no | no | no | no | - |
| Arm valid | valid | valid | valid | valid | - |
| Scope score | 100/100 | 100/100 | 100/100 | 100/100 | - |
| Changed-file precision | 100.0% | 100.0% | 100.0% | 100.0% | - |
| Changed-file recall | 100.0% | 100.0% | 100.0% | 100.0% | - |
| Forbidden-file violation | no | no | no | no | - |
| Elapsed time | 37.2s | 46.9s | 65.7s | 60.8s | -23.6s |
| Recorded command/tool calls | 4 | 13 | 15 | 9 | -5 |
| Failed recorded calls | 0 | 0 | 1 | 0 | 0 |
| Codex router errors in stderr | 0 | 0 | 1 | 0 | 0 |
| Native patch verification errors | 0 | 0 | 0 | 0 | 0 |
| Sandbox preparation errors | 0 | 0 | 0 | 0 | 0 |
| Inspection commands | 2 | 7 | 7 | 3 | -1 |
| Files named in commands | 7 | 7 | 7 | 6 | +1 |
| Distinct repository path strings observed | 93 | 7 | 7 | 8 | +85 |
| Command output characters | 7,777 | 4,680 | 6,433 | 6,436 | +1,341 |
| Palace context output characters | n/a | 2,339 | 3,139 | 4,272 | n/a |
| Palace context output bytes | n/a | 2,339 | 3,139 | 4,272 | n/a |
| Palace context estimated tokens | n/a | 585 | 785 | 1,068 | n/a |
| Cumulative input tokens | 91,410 | 90,262 | 175,926 | 142,741 | -51,331 |
| Cached input tokens | 81,408 | 81,408 | 163,072 | 125,696 | -44,288 |
| Uncached input tokens | 10,002 | 8,854 | 12,854 | 17,045 | -7,043 |
| Output tokens | 1,024 | 1,313 | 1,960 | 2,166 | -1,142 |
| Cumulative reported tokens | 92,434 | 91,575 | 177,886 | 144,907 | -52,473 |
| Palace calls | 0 | 1 | 1 | 1 | - |

Positive values in the final column mean Adaptive Palace used less than Control for that measured resource.

## Changed Files

### Control

- `src/scheduler/load-batch-limit.mjs`

### Route-only

- `src/scheduler/load-batch-limit.mjs`

### Full Palace

- `src/scheduler/load-batch-limit.mjs`

### Adaptive Palace

- `src/scheduler/load-batch-limit.mjs`

## Instrumentation Excluded From Scope

Raw Git status is preserved in each arm evidence file. Only root `.palace` state is excluded from correctness and changed-file precision/recall.

- Control: None
- Route-only: None
- Full Palace: None
- Adaptive Palace: None

## Validity

- Control: 0 Palace calls detected; expected 0; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 10e45aaf26ffe26c670cf127c18cad5a7579b17e
- Route-only: 1/1 successful/total Palace calls; adaptiveRequested=false; expected false; adaptivePayloadMatchesOutput=null; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 10e45aaf26ffe26c670cf127c18cad5a7579b17e
- Full Palace: 1/1 successful/total Palace calls; adaptiveRequested=false; expected false; adaptivePayloadMatchesOutput=null; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 10e45aaf26ffe26c670cf127c18cad5a7579b17e
- Adaptive Palace: 1/1 successful/total Palace calls; adaptiveRequested=true; expected true; adaptivePayloadMatchesOutput=true; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 10e45aaf26ffe26c670cf127c18cad5a7579b17e

## Route And Memory Signals

- Route-only Recall@K / Precision@K: 100.0% / 57.1% (K=7)
- Full Palace Recall@K / Precision@K: 100.0% / 57.1% (K=7)
- Adaptive Palace Recall@K / Precision@K: 100.0% / 57.1% (K=7)
- Control pitfall violation / wrong-memory adoption: n/a / no
- Route-only pitfall violation / wrong-memory adoption: n/a / no
- Full Palace pitfall violation / wrong-memory adoption: n/a / no
- Adaptive Palace pitfall violation / wrong-memory adoption: n/a / no
- Adaptive selected mode: guarded-memory-palace
- Adaptive self-reported payload: 4,272 bytes / ~1,068 tokens
- Adaptive self-reported memory: 0 included / 2 candidates / 2 excluded

## Caveats

- Distinct repository path strings are matched anywhere in the transcript. An inventory command can list every path without reading every file's contents.
- Command-named files and command-output characters are transcript-derived context proxies, not an operating-system file-access audit.
- Codex input tokens are cumulative across model turns. Cached and uncached input are shown separately and are not an API billing statement.
- Paired arms run sequentially, never concurrently. Repeat pairs with alternating order and report medians to reduce order and service-load effects.
- Palace index cache state for this trial: warm. This does not control provider-side model caching.
- Root .palace paths are recorded as benchmark instrumentation and excluded from changed-file scope; raw Git status remains in each arm evidence file.
- A result is comparable only when both arms start from the recorded Git tree and pass their arm-validity checks.
- Correctness and scope determine the score. Speed and token metrics are reported, not rewarded.
