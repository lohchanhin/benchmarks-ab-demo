# Vertex Palace Three-Arm Benchmark

Run: `cross-stack-regression-pilot-04`
Scenario: Cross-stack discounted shipping quote regression
Shared Git tree: `f3e550c71615deb2a6d66102749e72f810c7aeca`
Generated fixture files: 87
Comparable result: yes
Execution: sequential (Route-only -> Full Palace -> Control)

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
| Elapsed time | 97.3s | 93.9s | 117.8s | -20.5s |
| Recorded command/tool calls | 11 | 18 | 25 | -14 |
| Failed recorded calls | 3 | 2 | 5 | -2 |
| Codex router errors in stderr | 5 | 3 | 7 | -2 |
| Inspection commands | 3 | 7 | 8 | -5 |
| Files named in commands | 6 | 6 | 6 | 0 |
| Distinct repository path strings observed | 87 | 6 | 6 | +81 |
| Command output characters | 12,495 | 8,636 | 11,054 | +1,441 |
| Cumulative input tokens | 242,037 | 231,164 | 288,639 | -46,602 |
| Cached input tokens | 223,744 | 197,376 | 260,096 | -36,352 |
| Uncached input tokens | 18,293 | 33,788 | 28,543 | -10,250 |
| Output tokens | 3,263 | 2,961 | 4,278 | -1,015 |
| Cumulative reported tokens | 245,300 | 234,125 | 292,917 | -47,617 |
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

- Control: 0 Palace calls detected; expected 0; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches f3e550c71615deb2a6d66102749e72f810c7aeca
- Route-only: 1/1 successful/total Palace calls; expected 1/1; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches f3e550c71615deb2a6d66102749e72f810c7aeca
- Full Palace: 1/1 successful/total Palace calls; expected 1/1; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches f3e550c71615deb2a6d66102749e72f810c7aeca

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
