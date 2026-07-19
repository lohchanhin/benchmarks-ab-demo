# Vertex Palace Four-Arm Adaptive Benchmark

Run: `small-local-bug-adaptive-v2-2-pilot-03`
Scenario: Small single-file negative-zero formatting bug
Shared Git tree: `2ec5b38cf07772f446ea62ca05385601bff044dd`
Generated fixture files: 11
Palace index state: warm
Comparable result: yes
Execution: sequential (Full Palace -> Adaptive Palace -> Route-only -> Control)

## Task

Fix currency formatting so negative zero is rendered as $0.00 while genuinely negative cent values keep their minus sign. Keep the public API stable and make the complete test suite pass without changing tests.

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
| Elapsed time | 74.8s | 43.2s | 60.2s | 58.8s | +1.4s |
| Recorded command/tool calls | 11 | 9 | 11 | 8 | +3 |
| Failed recorded calls | 3 | 0 | 0 | 0 | 0 |
| Codex router errors in stderr | 3 | 0 | 0 | 0 | 0 |
| Native patch verification errors | 0 | 0 | 0 | 0 | 0 |
| Sandbox preparation errors | 0 | 0 | 0 | 0 | 0 |
| Inspection commands | 3 | 4 | 4 | 3 | +1 |
| Files named in commands | 4 | 4 | 4 | 3 | +1 |
| Distinct repository path strings observed | 11 | 4 | 10 | 4 | +6 |
| Command output characters | 7,129 | 4,002 | 4,496 | 2,978 | +1,518 |
| Palace context output characters | n/a | 2,086 | 2,086 | 1,218 | +868 |
| Palace context output bytes | n/a | 2,086 | 2,086 | 1,218 | +868 |
| Palace context estimated tokens | n/a | 522 | 522 | 305 | +217 |
| Cumulative input tokens | 122,454 | 89,109 | 121,380 | 149,629 | -28,249 |
| Cached input tokens | 110,592 | 80,384 | 111,616 | 133,632 | -22,016 |
| Uncached input tokens | 11,862 | 8,725 | 9,764 | 15,997 | -6,233 |
| Output tokens | 2,330 | 1,372 | 1,544 | 1,832 | -288 |
| Cumulative reported tokens | 124,784 | 90,481 | 122,924 | 151,461 | -28,537 |
| Palace calls | 0 | 1 | 1 | 1 | - |

Positive values in the final column mean Adaptive Palace used less than Full Palace for that measured resource.

## Changed Files

### Control

- `src/format-currency.mjs`

### Route-only

- `src/format-currency.mjs`

### Full Palace

- `src/format-currency.mjs`

### Adaptive Palace

- `src/format-currency.mjs`

## Validity

- Control: 0 Palace calls detected; expected 0; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 2ec5b38cf07772f446ea62ca05385601bff044dd
- Route-only: 1/1 successful/total Palace calls; adaptiveRequested=false; expected false; adaptivePayloadMatchesOutput=null; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 2ec5b38cf07772f446ea62ca05385601bff044dd
- Full Palace: 1/1 successful/total Palace calls; adaptiveRequested=false; expected false; adaptivePayloadMatchesOutput=null; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 2ec5b38cf07772f446ea62ca05385601bff044dd
- Adaptive Palace: 1/1 successful/total Palace calls; adaptiveRequested=true; expected true; adaptivePayloadMatchesOutput=true; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 2ec5b38cf07772f446ea62ca05385601bff044dd

## Route And Memory Signals

- Route-only Recall@K / Precision@K: 100.0% / 50.0% (K=4)
- Full Palace Recall@K / Precision@K: 100.0% / 50.0% (K=4)
- Adaptive Palace Recall@K / Precision@K: 100.0% / 50.0% (K=4)
- Control pitfall violation / wrong-memory adoption: n/a / n/a
- Route-only pitfall violation / wrong-memory adoption: n/a / n/a
- Full Palace pitfall violation / wrong-memory adoption: n/a / n/a
- Adaptive Palace pitfall violation / wrong-memory adoption: n/a / n/a
- Adaptive selected mode: route-lite
- Adaptive self-reported payload: 1,218 bytes / ~305 tokens

## Caveats

- Distinct repository path strings are matched anywhere in the transcript. An inventory command can list every path without reading every file's contents.
- Command-named files and command-output characters are transcript-derived context proxies, not an operating-system file-access audit.
- Codex input tokens are cumulative across model turns. Cached and uncached input are shown separately and are not an API billing statement.
- Paired arms run sequentially, never concurrently. Repeat pairs with alternating order and report medians to reduce order and service-load effects.
- Palace index cache state for this trial: warm. This does not control provider-side model caching.
- A result is comparable only when both arms start from the recorded Git tree and pass their arm-validity checks.
- Correctness and scope determine the score. Speed and token metrics are reported, not rewarded.
