# Vertex Palace Three-Arm Benchmark

Run: `stale-memory-adversarial-pilot-03`
Scenario: Stale scheduler-configuration memory
Shared Git tree: `d8908bb68b95d1676ab68915943d5a02cf094523`
Generated fixture files: 93
Comparable result: yes
Execution: sequential (Route-only -> Full Palace -> Control)

## Task

Fix the v2 batch scheduler returning a limit of 10 instead of the configured limit of 25. The configuration migration is complete; preserve compatibility data, keep the public API stable, and make the complete test suite pass without changing tests.

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
| Elapsed time | 101.0s | 150.3s | 121.2s | -20.2s |
| Recorded command/tool calls | 11 | 21 | 15 | -4 |
| Failed recorded calls | 3 | 4 | 4 | -1 |
| Codex router errors in stderr | 5 | 6 | 6 | -1 |
| Inspection commands | 3 | 8 | 5 | -2 |
| Files named in commands | 7 | 7 | 7 | 0 |
| Distinct repository path strings observed | 93 | 92 | 92 | +1 |
| Command output characters | 11,354 | 9,491 | 11,808 | -454 |
| Cumulative input tokens | 261,750 | 285,617 | 324,500 | -62,750 |
| Cached input tokens | 241,152 | 236,032 | 302,592 | -61,440 |
| Uncached input tokens | 20,598 | 49,585 | 21,908 | -1,310 |
| Output tokens | 3,103 | 4,221 | 4,085 | -982 |
| Cumulative reported tokens | 264,853 | 289,838 | 328,585 | -63,732 |
| Palace calls | 0 | 1 | 1 | - |

Positive values in the final column mean the Palace arm used less of that measured resource.

## Changed Files

### Control

- `src/scheduler/load-batch-limit.mjs`

### Route-only

- `src/scheduler/load-batch-limit.mjs`

### Full Palace

- `src/scheduler/load-batch-limit.mjs`

## Validity

- Control: 0 Palace calls detected; expected 0; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches d8908bb68b95d1676ab68915943d5a02cf094523
- Route-only: 1/1 successful/total Palace calls; expected 1/1; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches d8908bb68b95d1676ab68915943d5a02cf094523
- Full Palace: 1/1 successful/total Palace calls; expected 1/1; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches d8908bb68b95d1676ab68915943d5a02cf094523

## Route And Memory Signals

- Route-only Recall@K / Precision@K: 100.0% / 66.7% (K=6)
- Full Palace Recall@K / Precision@K: 100.0% / 66.7% (K=6)
- Control pitfall violation / wrong-memory adoption: n/a / no
- Route-only pitfall violation / wrong-memory adoption: n/a / no
- Full Palace pitfall violation / wrong-memory adoption: n/a / no

## Caveats

- Distinct repository path strings are matched anywhere in the transcript. An inventory command can list every path without reading every file's contents.
- Command-named files and command-output characters are transcript-derived context proxies, not an operating-system file-access audit.
- Codex input tokens are cumulative across model turns. Cached and uncached input are shown separately and are not an API billing statement.
- Paired arms run sequentially, never concurrently. Repeat pairs with alternating order and report medians to reduce order and service-load effects.
- A result is comparable only when both arms start from the recorded Git tree and pass their arm-validity checks.
- Correctness and scope determine the score. Speed and token metrics are reported, not rewarded.
