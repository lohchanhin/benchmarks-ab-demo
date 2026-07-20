# Vertex Palace Control-First Four-Arm Benchmark

Run: `stale-memory-adversarial-control-first-v3-pilot-04`
Scenario: Stale scheduler-configuration memory
Shared Git tree: `c09790a75fc3539bc1b2dc513b482405e5e3bb69`
Generated fixture files: 93
Palace index state: cold
Comparable result: yes
Execution: sequential (Full Palace -> Adaptive Palace -> Route-only -> Control)

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
| Elapsed time | 38.9s | 47.8s | 51.2s | 60.6s | -21.7s |
| Recorded command/tool calls | 5 | 12 | 8 | 11 | -6 |
| Failed recorded calls | 0 | 0 | 0 | 0 | 0 |
| Codex router errors in stderr | 0 | 0 | 0 | 0 | 0 |
| Native patch verification errors | 0 | 0 | 0 | 0 | 0 |
| Sandbox preparation errors | 0 | 0 | 0 | 0 | 0 |
| Inspection commands | 3 | 7 | 1 | 5 | -2 |
| Files named in commands | 7 | 7 | 7 | 5 | +2 |
| Distinct repository path strings observed | 33 | 7 | 7 | 8 | +25 |
| Command output characters | 7,090 | 4,527 | 5,737 | 6,216 | +874 |
| Palace context output characters | n/a | 2,339 | 3,139 | 4,272 | n/a |
| Palace context output bytes | n/a | 2,339 | 3,139 | 4,272 | n/a |
| Palace context estimated tokens | n/a | 585 | 785 | 1,068 | n/a |
| Cumulative input tokens | 107,436 | 106,413 | 122,690 | 141,321 | -33,885 |
| Cached input tokens | 94,464 | 96,512 | 106,496 | 124,672 | -30,208 |
| Uncached input tokens | 12,972 | 9,901 | 16,194 | 16,649 | -3,677 |
| Output tokens | 1,125 | 1,459 | 1,510 | 1,886 | -761 |
| Cumulative reported tokens | 108,561 | 107,872 | 124,200 | 143,207 | -34,646 |
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

- Control: 0 Palace calls detected; expected 0; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches c09790a75fc3539bc1b2dc513b482405e5e3bb69
- Route-only: 1/1 successful/total Palace calls; adaptiveRequested=false; expected false; adaptivePayloadMatchesOutput=null; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches c09790a75fc3539bc1b2dc513b482405e5e3bb69
- Full Palace: 1/1 successful/total Palace calls; adaptiveRequested=false; expected false; adaptivePayloadMatchesOutput=null; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches c09790a75fc3539bc1b2dc513b482405e5e3bb69
- Adaptive Palace: 1/1 successful/total Palace calls; adaptiveRequested=true; expected true; adaptivePayloadMatchesOutput=true; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches c09790a75fc3539bc1b2dc513b482405e5e3bb69

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
- Palace index cache state for this trial: cold. This does not control provider-side model caching.
- Root .palace paths are recorded as benchmark instrumentation and excluded from changed-file scope; raw Git status remains in each arm evidence file.
- A result is comparable only when both arms start from the recorded Git tree and pass their arm-validity checks.
- Correctness and scope determine the score. Speed and token metrics are reported, not rewarded.
