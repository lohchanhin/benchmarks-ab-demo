# Vertex Palace Control-First Four-Arm Benchmark

Run: `stale-memory-adversarial-control-first-v3-candidate-04`
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
| Elapsed time | 32.3s | 49.1s | 53.9s | 44.8s | -12.5s |
| Recorded command/tool calls | 3 | 11 | 6 | 5 | -2 |
| Failed recorded calls | 0 | 0 | 0 | 0 | 0 |
| Codex router errors in stderr | 0 | 0 | 0 | 0 | 0 |
| Native patch verification errors | 0 | 0 | 0 | 0 | 0 |
| Sandbox preparation errors | 0 | 0 | 0 | 0 | 0 |
| Inspection commands | 2 | 5 | 2 | 1 | +1 |
| Files named in commands | 5 | 5 | 5 | 4 | +1 |
| Distinct repository path strings observed | 10 | 5 | 5 | 7 | +3 |
| Command output characters | 2,946 | 4,004 | 4,699 | 6,101 | -3,155 |
| Palace context output characters | n/a | 2,082 | 2,882 | 4,427 | n/a |
| Palace context output bytes | n/a | 2,082 | 2,882 | 4,427 | n/a |
| Palace context estimated tokens | n/a | 521 | 721 | 1,107 | n/a |
| Cumulative input tokens | 71,124 | 119,797 | 120,668 | 107,355 | -36,231 |
| Cached input tokens | 64,256 | 109,568 | 110,592 | 97,536 | -33,280 |
| Uncached input tokens | 6,868 | 10,229 | 10,076 | 9,819 | -2,951 |
| Output tokens | 912 | 1,314 | 1,225 | 1,149 | -237 |
| Cumulative reported tokens | 72,036 | 121,111 | 121,893 | 108,504 | -36,468 |
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
