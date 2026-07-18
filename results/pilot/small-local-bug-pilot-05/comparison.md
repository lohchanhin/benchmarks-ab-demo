# Vertex Palace Three-Arm Benchmark

Run: `small-local-bug-pilot-05`
Scenario: Small single-file negative-zero formatting bug
Shared Git tree: `b668adb9ce1daa0fea7659dd2fc80ec91bc55d4f`
Generated fixture files: 11
Comparable result: yes
Execution: sequential (Route-only -> Full Palace -> Control)

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
| Elapsed time | 128.8s | 182.9s | 190.9s | -62.0s |
| Recorded command/tool calls | 14 | 27 | 20 | -6 |
| Failed recorded calls | 5 | 6 | 8 | -3 |
| Codex router errors in stderr | 7 | 8 | 10 | -3 |
| Inspection commands | 3 | 5 | 3 | 0 |
| Files named in commands | 3 | 4 | 4 | -1 |
| Distinct repository path strings observed | 11 | 10 | 10 | +1 |
| Command output characters | 13,239 | 8,146 | 6,233 | +7,006 |
| Cumulative input tokens | 307,937 | 353,422 | 332,807 | -24,870 |
| Cached input tokens | 286,464 | 329,728 | 299,520 | -13,056 |
| Uncached input tokens | 21,473 | 23,694 | 33,287 | -11,814 |
| Output tokens | 4,097 | 5,582 | 6,304 | -2,207 |
| Cumulative reported tokens | 312,034 | 359,004 | 339,111 | -27,077 |
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

- Control: 0 Palace calls detected; expected 0; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches b668adb9ce1daa0fea7659dd2fc80ec91bc55d4f
- Route-only: 1/1 successful/total Palace calls; expected 1/1; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches b668adb9ce1daa0fea7659dd2fc80ec91bc55d4f
- Full Palace: 1/1 successful/total Palace calls; expected 1/1; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches b668adb9ce1daa0fea7659dd2fc80ec91bc55d4f

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
