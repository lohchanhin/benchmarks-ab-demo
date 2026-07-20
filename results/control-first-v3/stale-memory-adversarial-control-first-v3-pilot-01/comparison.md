# Vertex Palace Control-First Four-Arm Benchmark

Run: `stale-memory-adversarial-control-first-v3-pilot-01`
Scenario: Stale scheduler-configuration memory
Shared Git tree: `c25dea63c2a0f2c93ef3214bd4302b367af6b2f3`
Generated fixture files: 93
Palace index state: warm
Comparable result: yes
Execution: sequential (Adaptive Palace -> Control -> Full Palace -> Route-only)

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
| Elapsed time | 35.2s | 82.3s | 55.0s | 60.2s | -25.0s |
| Recorded command/tool calls | 4 | 14 | 9 | 8 | -4 |
| Failed recorded calls | 0 | 0 | 1 | 0 | 0 |
| Codex router errors in stderr | 0 | 0 | 1 | 0 | 0 |
| Native patch verification errors | 0 | 0 | 0 | 0 | 0 |
| Sandbox preparation errors | 0 | 0 | 0 | 0 | 0 |
| Inspection commands | 2 | 7 | 1 | 2 | 0 |
| Files named in commands | 6 | 7 | 7 | 5 | +1 |
| Distinct repository path strings observed | 8 | 7 | 7 | 8 | 0 |
| Command output characters | 3,144 | 4,651 | 6,659 | 6,293 | -3,149 |
| Palace context output characters | n/a | 2,339 | 3,139 | 4,272 | n/a |
| Palace context output bytes | n/a | 2,339 | 3,139 | 4,272 | n/a |
| Palace context estimated tokens | n/a | 585 | 785 | 1,068 | n/a |
| Cumulative input tokens | 86,496 | 122,076 | 125,184 | 124,955 | -38,459 |
| Cached input tokens | 78,336 | 106,496 | 107,520 | 112,640 | -34,304 |
| Uncached input tokens | 8,160 | 15,580 | 17,664 | 12,315 | -4,155 |
| Output tokens | 1,060 | 1,549 | 1,651 | 1,863 | -803 |
| Cumulative reported tokens | 87,556 | 123,625 | 126,835 | 126,818 | -39,262 |
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

- Control: 0 Palace calls detected; expected 0; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches c25dea63c2a0f2c93ef3214bd4302b367af6b2f3
- Route-only: 1/1 successful/total Palace calls; adaptiveRequested=false; expected false; adaptivePayloadMatchesOutput=null; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches c25dea63c2a0f2c93ef3214bd4302b367af6b2f3
- Full Palace: 1/1 successful/total Palace calls; adaptiveRequested=false; expected false; adaptivePayloadMatchesOutput=null; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches c25dea63c2a0f2c93ef3214bd4302b367af6b2f3
- Adaptive Palace: 1/1 successful/total Palace calls; adaptiveRequested=true; expected true; adaptivePayloadMatchesOutput=true; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches c25dea63c2a0f2c93ef3214bd4302b367af6b2f3

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
