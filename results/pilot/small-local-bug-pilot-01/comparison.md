# Vertex Palace Three-Arm Benchmark

Run: `small-local-bug-pilot-01`
Scenario: Small single-file negative-zero formatting bug
Shared Git tree: `69e0df68407acb2557a51073acda0095170fc76a`
Generated fixture files: 11
Comparable result: yes
Execution: sequential (Route-only -> Control -> Full Palace)

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
| Elapsed time | 147.7s | 171.2s | 130.9s | +16.8s |
| Recorded command/tool calls | 15 | 21 | 21 | -6 |
| Failed recorded calls | 7 | 6 | 6 | +1 |
| Codex router errors in stderr | 9 | 7 | 8 | +1 |
| Inspection commands | 3 | 5 | 5 | -2 |
| Files named in commands | 4 | 4 | 4 | 0 |
| Distinct repository path strings observed | 11 | 4 | 4 | +7 |
| Command output characters | 7,413 | 6,578 | 6,257 | +1,156 |
| Cumulative input tokens | 307,235 | 297,889 | 306,081 | +1,154 |
| Cached input tokens | 258,048 | 265,216 | 257,024 | +1,024 |
| Uncached input tokens | 49,187 | 32,673 | 49,057 | +130 |
| Output tokens | 5,797 | 5,866 | 4,506 | +1,291 |
| Cumulative reported tokens | 313,032 | 303,755 | 310,587 | +2,445 |
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

- Control: 0 Palace calls detected; expected 0; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches 69e0df68407acb2557a51073acda0095170fc76a
- Route-only: 1/1 successful/total Palace calls; expected 1/1; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches 69e0df68407acb2557a51073acda0095170fc76a
- Full Palace: 1/1 successful/total Palace calls; expected 1/1; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches 69e0df68407acb2557a51073acda0095170fc76a

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
