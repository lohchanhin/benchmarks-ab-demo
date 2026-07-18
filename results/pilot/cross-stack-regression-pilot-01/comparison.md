# Vertex Palace Three-Arm Benchmark

Run: `cross-stack-regression-pilot-01`
Scenario: Cross-stack discounted shipping quote regression
Shared Git tree: `7ce47ce9aa221d7f970723d8ba4d2396d9f2d034`
Generated fixture files: 87
Comparable result: yes
Execution: sequential (Full Palace -> Route-only -> Control)

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
| Elapsed time | 123.3s | 113.9s | 135.9s | -12.5s |
| Recorded command/tool calls | 17 | 13 | 28 | -11 |
| Failed recorded calls | 5 | 3 | 5 | 0 |
| Codex router errors in stderr | 7 | 5 | 7 | 0 |
| Inspection commands | 8 | 4 | 6 | +2 |
| Files named in commands | 6 | 6 | 6 | 0 |
| Distinct repository path strings observed | 87 | 86 | 6 | +81 |
| Command output characters | 11,616 | 13,100 | 9,751 | +1,865 |
| Cumulative input tokens | 258,220 | 292,150 | 281,172 | -22,952 |
| Cached input tokens | 228,864 | 264,192 | 235,008 | -6,144 |
| Uncached input tokens | 29,356 | 27,958 | 46,164 | -16,808 |
| Output tokens | 3,771 | 3,753 | 4,467 | -696 |
| Cumulative reported tokens | 261,991 | 295,903 | 285,639 | -23,648 |
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

- Control: 0 Palace calls detected; expected 0; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches 7ce47ce9aa221d7f970723d8ba4d2396d9f2d034
- Route-only: 1/1 successful/total Palace calls; expected 1/1; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches 7ce47ce9aa221d7f970723d8ba4d2396d9f2d034
- Full Palace: 1/1 successful/total Palace calls; expected 1/1; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches 7ce47ce9aa221d7f970723d8ba4d2396d9f2d034

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
