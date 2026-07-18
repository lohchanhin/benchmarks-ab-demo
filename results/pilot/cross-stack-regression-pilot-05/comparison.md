# Vertex Palace Three-Arm Benchmark

Run: `cross-stack-regression-pilot-05`
Scenario: Cross-stack discounted shipping quote regression
Shared Git tree: `eeb78f197aceb5be4294562c7624ee2e68888c83`
Generated fixture files: 87
Comparable result: yes
Execution: sequential (Full Palace -> Control -> Route-only)

## Task

Fix checkout shipping quotes end to end. Free shipping must use the discounted merchandise subtotal, and the checkout view model must display the shipping amount returned by the quote service. Preserve the public response contract and make the complete test suite pass without changing tests.

## Results

| Metric | Control | Route-only | Full Palace | Control minus Full Palace |
| --- | ---: | ---: | ---: | ---: |
| Protocol success | yes | yes | yes | - |
| Public tests | yes | yes | yes | - |
| Hidden oracle | yes | yes | yes | - |
| Timed out | no | no | no | - |
| Arm valid | valid | valid | valid | - |
| Scope score | 100/100 | 100/100 | 100/100 | - |
| Changed-file precision | 100.0% | 100.0% | 100.0% | - |
| Changed-file recall | 100.0% | 100.0% | 100.0% | - |
| Forbidden-file violation | no | no | no | - |
| Elapsed time | 71.2s | 117.4s | 108.7s | -37.5s |
| Recorded command/tool calls | 7 | 21 | 24 | -17 |
| Failed recorded calls | 1 | 4 | 5 | -4 |
| Codex router errors in stderr | 3 | 6 | 6 | -3 |
| Inspection commands | 2 | 7 | 8 | -6 |
| Files named in commands | 5 | 6 | 6 | -1 |
| Distinct repository path strings observed | 87 | 86 | 86 | +1 |
| Command output characters | 13,866 | 11,928 | 17,122 | -3,256 |
| Cumulative input tokens | 152,474 | 276,268 | 236,906 | -84,432 |
| Cached input tokens | 137,984 | 231,936 | 216,832 | -78,848 |
| Uncached input tokens | 14,490 | 44,332 | 20,074 | -5,584 |
| Output tokens | 2,610 | 3,829 | 4,032 | -1,422 |
| Cumulative reported tokens | 155,084 | 280,097 | 240,938 | -85,854 |
| Palace calls | 0 | 1 | 1 | - |

Positive values in the final column mean the Palace arm used less of that measured resource.

## Changed Files

### Control

- `client/src/checkout/quote-view-model.mjs`
- `server/src/pricing/create-quote.mjs`

### Route-only

- `client/src/checkout/quote-view-model.mjs`
- `server/src/pricing/create-quote.mjs`

### Full Palace

- `client/src/checkout/quote-view-model.mjs`
- `server/src/pricing/create-quote.mjs`

## Validity

- Control: 0 Palace calls detected; expected 0; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches eeb78f197aceb5be4294562c7624ee2e68888c83
- Route-only: 1/1 successful/total Palace calls; expected 1/1; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches eeb78f197aceb5be4294562c7624ee2e68888c83
- Full Palace: 1/1 successful/total Palace calls; expected 1/1; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches eeb78f197aceb5be4294562c7624ee2e68888c83

## Route And Memory Signals

- Route-only Recall@K / Precision@K: 100.0% / 80.0% (K=5)
- Full Palace Recall@K / Precision@K: 100.0% / 80.0% (K=5)
- Control pitfall violation / wrong-memory adoption: n/a / n/a
- Route-only pitfall violation / wrong-memory adoption: n/a / n/a
- Full Palace pitfall violation / wrong-memory adoption: n/a / n/a

## Caveats

- Distinct repository path strings are matched anywhere in the transcript. An inventory command can list every path without reading every file's contents.
- Command-named files and command-output characters are transcript-derived context proxies, not an operating-system file-access audit.
- Codex input tokens are cumulative across model turns. Cached and uncached input are shown separately and are not an API billing statement.
- Paired arms run sequentially, never concurrently. Repeat pairs with alternating order and report medians to reduce order and service-load effects.
- A result is comparable only when both arms start from the recorded Git tree and pass their arm-validity checks.
- Correctness and scope determine the score. Speed and token metrics are reported, not rewarded.
