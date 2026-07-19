# Vertex Palace Four-Arm Adaptive Benchmark

Run: `stale-memory-adversarial-adaptive-v2-2-pilot-03`
Scenario: Stale scheduler-configuration memory
Shared Git tree: `19d9292721a234400b16aa9a129d9524372f9ebb`
Generated fixture files: 93
Palace index state: warm
Comparable result: yes
Execution: sequential (Route-only -> Full Palace -> Control -> Adaptive Palace)

## Task

Fix the v2 batch scheduler returning a limit of 10 instead of the configured limit of 25. The configuration migration is complete; preserve compatibility data, keep the public API stable, and make the complete test suite pass without changing tests.

## Results

| Metric | Control | Route-only | Full Palace | Adaptive Palace | Full Palace minus Adaptive |
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
| Elapsed time | 74.4s | 59.0s | 63.9s | 56.8s | +7.1s |
| Recorded command/tool calls | 5 | 15 | 7 | 9 | -2 |
| Failed recorded calls | 0 | 0 | 1 | 0 | +1 |
| Codex router errors in stderr | 0 | 0 | 1 | 0 | +1 |
| Native patch verification errors | 0 | 0 | 0 | 0 | 0 |
| Sandbox preparation errors | 0 | 0 | 0 | 0 | 0 |
| Inspection commands | 4 | 7 | 2 | 5 | -3 |
| Files named in commands | 7 | 7 | 7 | 5 | +2 |
| Distinct repository path strings observed | 93 | 92 | 92 | 7 | +85 |
| Command output characters | 8,966 | 7,950 | 9,021 | 4,825 | +4,196 |
| Palace context output characters | n/a | 2,327 | 3,127 | 2,894 | +233 |
| Palace context output bytes | n/a | 2,327 | 3,127 | 2,894 | +233 |
| Palace context estimated tokens | n/a | 582 | 782 | 724 | +58 |
| Cumulative input tokens | 127,029 | 127,089 | 145,250 | 105,730 | +39,520 |
| Cached input tokens | 109,568 | 109,568 | 132,864 | 91,392 | +41,472 |
| Uncached input tokens | 17,461 | 17,521 | 12,386 | 14,338 | -1,952 |
| Output tokens | 1,703 | 1,591 | 1,643 | 1,574 | +69 |
| Cumulative reported tokens | 128,732 | 128,680 | 146,893 | 107,304 | +39,589 |
| Palace calls | 0 | 1 | 1 | 1 | - |

Positive values in the final column mean Adaptive Palace used less than Full Palace for that measured resource.

## Changed Files

### Control

- `src/scheduler/load-batch-limit.mjs`

### Route-only

- `src/scheduler/load-batch-limit.mjs`

### Full Palace

- `src/scheduler/load-batch-limit.mjs`

### Adaptive Palace

- `src/scheduler/load-batch-limit.mjs`

## Validity

- Control: 0 Palace calls detected; expected 0; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 19d9292721a234400b16aa9a129d9524372f9ebb
- Route-only: 1/1 successful/total Palace calls; adaptiveRequested=false; expected false; adaptivePayloadMatchesOutput=null; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 19d9292721a234400b16aa9a129d9524372f9ebb
- Full Palace: 1/1 successful/total Palace calls; adaptiveRequested=false; expected false; adaptivePayloadMatchesOutput=null; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 19d9292721a234400b16aa9a129d9524372f9ebb
- Adaptive Palace: 1/1 successful/total Palace calls; adaptiveRequested=true; expected true; adaptivePayloadMatchesOutput=true; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 19d9292721a234400b16aa9a129d9524372f9ebb

## Route And Memory Signals

- Route-only Recall@K / Precision@K: 100.0% / 66.7% (K=6)
- Full Palace Recall@K / Precision@K: 100.0% / 66.7% (K=6)
- Adaptive Palace Recall@K / Precision@K: 100.0% / 66.7% (K=6)
- Control pitfall violation / wrong-memory adoption: n/a / no
- Route-only pitfall violation / wrong-memory adoption: n/a / no
- Full Palace pitfall violation / wrong-memory adoption: n/a / no
- Adaptive Palace pitfall violation / wrong-memory adoption: n/a / no
- Adaptive selected mode: guarded-memory-palace
- Adaptive self-reported payload: 2,894 bytes / ~724 tokens

## Caveats

- Distinct repository path strings are matched anywhere in the transcript. An inventory command can list every path without reading every file's contents.
- Command-named files and command-output characters are transcript-derived context proxies, not an operating-system file-access audit.
- Codex input tokens are cumulative across model turns. Cached and uncached input are shown separately and are not an API billing statement.
- Paired arms run sequentially, never concurrently. Repeat pairs with alternating order and report medians to reduce order and service-load effects.
- Palace index cache state for this trial: warm. This does not control provider-side model caching.
- A result is comparable only when both arms start from the recorded Git tree and pass their arm-validity checks.
- Correctness and scope determine the score. Speed and token metrics are reported, not rewarded.
