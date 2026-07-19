# Vertex Palace Four-Arm Adaptive Benchmark

Run: `small-local-bug-adaptive-v2-2-pilot-01`
Scenario: Small single-file negative-zero formatting bug
Shared Git tree: `7b0a63939fd285dfa73910ddf487e265e9c74a78`
Generated fixture files: 11
Palace index state: warm
Comparable result: yes
Execution: sequential (Control -> Route-only -> Adaptive Palace -> Full Palace)

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
| Elapsed time | 43.4s | 52.1s | 52.2s | 52.5s | -0.3s |
| Recorded command/tool calls | 4 | 11 | 6 | 8 | -2 |
| Failed recorded calls | 1 | 0 | 0 | 0 | 0 |
| Codex router errors in stderr | 1 | 0 | 0 | 0 | 0 |
| Native patch verification errors | 0 | 0 | 0 | 0 | 0 |
| Sandbox preparation errors | 0 | 0 | 0 | 0 | 0 |
| Inspection commands | 2 | 4 | 1 | 3 | -2 |
| Files named in commands | 4 | 4 | 4 | 3 | +1 |
| Distinct repository path strings observed | 11 | 4 | 4 | 4 | 0 |
| Command output characters | 3,876 | 4,173 | 4,186 | 2,980 | +1,206 |
| Palace context output characters | n/a | 2,086 | 2,086 | 1,218 | +868 |
| Palace context output bytes | n/a | 2,086 | 2,086 | 1,218 | +868 |
| Palace context estimated tokens | n/a | 522 | 522 | 305 | +217 |
| Cumulative input tokens | 86,565 | 119,385 | 119,937 | 102,696 | +17,241 |
| Cached input tokens | 53,248 | 93,440 | 96,512 | 92,416 | +4,096 |
| Uncached input tokens | 33,317 | 25,945 | 23,425 | 10,280 | +13,145 |
| Output tokens | 996 | 1,334 | 1,323 | 1,509 | -186 |
| Cumulative reported tokens | 87,561 | 120,719 | 121,260 | 104,205 | +17,055 |
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

- Control: 0 Palace calls detected; expected 0; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 7b0a63939fd285dfa73910ddf487e265e9c74a78
- Route-only: 1/1 successful/total Palace calls; adaptiveRequested=false; expected false; adaptivePayloadMatchesOutput=null; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 7b0a63939fd285dfa73910ddf487e265e9c74a78
- Full Palace: 1/1 successful/total Palace calls; adaptiveRequested=false; expected false; adaptivePayloadMatchesOutput=null; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 7b0a63939fd285dfa73910ddf487e265e9c74a78
- Adaptive Palace: 1/1 successful/total Palace calls; adaptiveRequested=true; expected true; adaptivePayloadMatchesOutput=true; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 7b0a63939fd285dfa73910ddf487e265e9c74a78

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
