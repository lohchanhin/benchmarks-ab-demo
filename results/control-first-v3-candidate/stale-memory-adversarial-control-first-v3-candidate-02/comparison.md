# Vertex Palace Control-First Four-Arm Benchmark

Run: `stale-memory-adversarial-control-first-v3-candidate-02`
Scenario: Stale scheduler-configuration memory
Shared Git tree: `565beecb80ae3252e3d2004bebf6f31add347284`
Generated fixture files: 93
Palace index state: cold
Comparable result: yes
Execution: sequential (Control -> Route-only -> Adaptive Palace -> Full Palace)

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
| Elapsed time | 45.0s | 59.5s | 61.0s | 65.4s | -20.4s |
| Recorded command/tool calls | 4 | 12 | 12 | 11 | -7 |
| Failed recorded calls | 0 | 0 | 0 | 0 | 0 |
| Codex router errors in stderr | 0 | 0 | 0 | 0 | 0 |
| Native patch verification errors | 0 | 0 | 0 | 0 | 0 |
| Sandbox preparation errors | 0 | 0 | 0 | 0 | 0 |
| Inspection commands | 2 | 5 | 5 | 4 | -2 |
| Files named in commands | 7 | 5 | 5 | 4 | +3 |
| Distinct repository path strings observed | 8 | 5 | 5 | 7 | +1 |
| Command output characters | 4,274 | 4,043 | 4,825 | 6,212 | -1,938 |
| Palace context output characters | n/a | 2,082 | 2,882 | 4,427 | n/a |
| Palace context output bytes | n/a | 2,082 | 2,882 | 4,427 | n/a |
| Palace context estimated tokens | n/a | 521 | 721 | 1,107 | n/a |
| Cumulative input tokens | 86,458 | 120,595 | 138,581 | 125,131 | -38,673 |
| Cached input tokens | 78,336 | 95,488 | 126,720 | 113,664 | -35,328 |
| Uncached input tokens | 8,122 | 25,107 | 11,861 | 11,467 | -3,345 |
| Output tokens | 981 | 1,569 | 1,695 | 1,624 | -643 |
| Cumulative reported tokens | 87,439 | 122,164 | 140,276 | 126,755 | -39,316 |
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

- Control: 0 Palace calls detected; expected 0; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 565beecb80ae3252e3d2004bebf6f31add347284
- Route-only: 1/1 successful/total Palace calls; adaptiveRequested=false; expected false; adaptivePayloadMatchesOutput=null; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 565beecb80ae3252e3d2004bebf6f31add347284
- Full Palace: 1/1 successful/total Palace calls; adaptiveRequested=false; expected false; adaptivePayloadMatchesOutput=null; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 565beecb80ae3252e3d2004bebf6f31add347284
- Adaptive Palace: 1/1 successful/total Palace calls; adaptiveRequested=true; expected true; adaptivePayloadMatchesOutput=true; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 565beecb80ae3252e3d2004bebf6f31add347284

## Route And Memory Signals

- Route-only Recall@K / Precision@K: 75.0% / 75.0% (K=4)
- Full Palace Recall@K / Precision@K: 75.0% / 75.0% (K=4)
- Adaptive Palace Recall@K / Precision@K: 75.0% / 75.0% (K=4)
- Control pitfall violation / wrong-memory adoption: n/a / no
- Route-only pitfall violation / wrong-memory adoption: n/a / no
- Full Palace pitfall violation / wrong-memory adoption: n/a / no
- Adaptive Palace pitfall violation / wrong-memory adoption: n/a / no
- Adaptive selected mode: guarded-memory-palace
- Adaptive self-reported payload: 4,427 bytes / ~1,107 tokens
- Adaptive self-reported memory: 2 included / 2 candidates / 0 excluded

## Caveats

- Distinct repository path strings are matched anywhere in the transcript. An inventory command can list every path without reading every file's contents.
- Command-named files and command-output characters are transcript-derived context proxies, not an operating-system file-access audit.
- Codex input tokens are cumulative across model turns. Cached and uncached input are shown separately and are not an API billing statement.
- Paired arms run sequentially, never concurrently. Repeat pairs with alternating order and report medians to reduce order and service-load effects.
- Palace index cache state for this trial: cold. This does not control provider-side model caching.
- Root .palace paths are recorded as benchmark instrumentation and excluded from changed-file scope; raw Git status remains in each arm evidence file.
- A result is comparable only when both arms start from the recorded Git tree and pass their arm-validity checks.
- Correctness and scope determine the score. Speed and token metrics are reported, not rewarded.
