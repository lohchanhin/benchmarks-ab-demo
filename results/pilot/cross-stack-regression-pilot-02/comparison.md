# Vertex Palace Three-Arm Benchmark

Run: `cross-stack-regression-pilot-02`
Scenario: Cross-stack discounted shipping quote regression
Shared Git tree: `d3e28a98e4b1839454c56acf5e1e5a038721d93a`
Generated fixture files: 87
Comparable result: yes
Execution: sequential (Route-only -> Control -> Full Palace)

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
| Elapsed time | 88.4s | 114.7s | 113.0s | -24.6s |
| Recorded command/tool calls | 11 | 22 | 19 | -8 |
| Failed recorded calls | 5 | 3 | 2 | +3 |
| Codex router errors in stderr | 7 | 5 | 3 | +4 |
| Inspection commands | 4 | 8 | 7 | -3 |
| Files named in commands | 6 | 6 | 6 | 0 |
| Distinct repository path strings observed | 87 | 87 | 86 | +1 |
| Command output characters | 11,202 | 13,292 | 11,891 | -689 |
| Cumulative input tokens | 234,609 | 273,525 | 229,242 | +5,367 |
| Cached input tokens | 210,432 | 254,208 | 183,552 | +26,880 |
| Uncached input tokens | 24,177 | 19,317 | 45,690 | -21,513 |
| Output tokens | 2,971 | 3,831 | 3,514 | -543 |
| Cumulative reported tokens | 237,580 | 277,356 | 232,756 | +4,824 |
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

- Control: 0 Palace calls detected; expected 0; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches d3e28a98e4b1839454c56acf5e1e5a038721d93a
- Route-only: 1/1 successful/total Palace calls; expected 1/1; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches d3e28a98e4b1839454c56acf5e1e5a038721d93a
- Full Palace: 1/1 successful/total Palace calls; expected 1/1; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches d3e28a98e4b1839454c56acf5e1e5a038721d93a

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
