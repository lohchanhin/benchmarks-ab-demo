# Vertex Palace Three-Arm Benchmark

Run: `small-local-bug-pilot-04`
Scenario: Small single-file negative-zero formatting bug
Shared Git tree: `01f922b5020464cf939cb42ea72696c11290c367`
Generated fixture files: 11
Comparable result: yes
Execution: sequential (Full Palace -> Control -> Route-only)

## Task

Fix currency formatting so negative zero is rendered as $0.00 while genuinely negative cent values keep their minus sign. Keep the public API stable and make the complete test suite pass without changing tests.

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
| Elapsed time | 179.4s | 139.4s | 153.9s | +25.5s |
| Recorded command/tool calls | 15 | 12 | 19 | -4 |
| Failed recorded calls | 4 | 3 | 9 | -5 |
| Codex router errors in stderr | 6 | 5 | 10 | -4 |
| Inspection commands | 3 | 2 | 2 | +1 |
| Files named in commands | 4 | 4 | 4 | 0 |
| Distinct repository path strings observed | 11 | 10 | 10 | +1 |
| Command output characters | 7,539 | 7,206 | 8,590 | -1,051 |
| Cumulative input tokens | 307,134 | 284,310 | 377,840 | -70,706 |
| Cached input tokens | 275,200 | 254,720 | 338,688 | -63,488 |
| Uncached input tokens | 31,934 | 29,590 | 39,152 | -7,218 |
| Output tokens | 5,787 | 4,016 | 5,796 | -9 |
| Cumulative reported tokens | 312,921 | 288,326 | 383,636 | -70,715 |
| Palace calls | 0 | 1 | 1 | - |

Positive values in the final column mean the Palace arm used less of that measured resource.

## Changed Files

### Control

- `src/format-currency.mjs`

### Route-only

- `src/format-currency.mjs`

### Full Palace

- `src/format-currency.mjs`

## Validity

- Control: 0 Palace calls detected; expected 0; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches 01f922b5020464cf939cb42ea72696c11290c367
- Route-only: 1/1 successful/total Palace calls; expected 1/1; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches 01f922b5020464cf939cb42ea72696c11290c367
- Full Palace: 1/1 successful/total Palace calls; expected 1/1; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches 01f922b5020464cf939cb42ea72696c11290c367

## Route And Memory Signals

- Route-only Recall@K / Precision@K: 100.0% / 50.0% (K=4)
- Full Palace Recall@K / Precision@K: 100.0% / 50.0% (K=4)
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
