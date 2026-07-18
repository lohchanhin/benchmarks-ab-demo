# Vertex Palace Three-Arm Benchmark

Run: `stale-memory-adversarial-pilot-02`
Scenario: Stale scheduler-configuration memory
Shared Git tree: `53f104f0363219231e4b6d6d17cee3f74993c617`
Generated fixture files: 93
Comparable result: yes
Execution: sequential (Full Palace -> Control -> Route-only)

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
| Elapsed time | 118.5s | 124.9s | 153.5s | -35.0s |
| Recorded command/tool calls | 12 | 16 | 31 | -19 |
| Failed recorded calls | 4 | 4 | 4 | 0 |
| Codex router errors in stderr | 6 | 6 | 6 | 0 |
| Inspection commands | 4 | 3 | 9 | -5 |
| Files named in commands | 7 | 7 | 7 | 0 |
| Distinct repository path strings observed | 92 | 7 | 92 | 0 |
| Command output characters | 8,940 | 6,446 | 16,225 | -7,285 |
| Cumulative input tokens | 278,298 | 283,634 | 349,214 | -70,916 |
| Cached input tokens | 258,048 | 249,600 | 316,928 | -58,880 |
| Uncached input tokens | 20,250 | 34,034 | 32,286 | -12,036 |
| Output tokens | 3,978 | 3,818 | 4,926 | -948 |
| Cumulative reported tokens | 282,276 | 287,452 | 354,140 | -71,864 |
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

- Control: 0 Palace calls detected; expected 0; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches 53f104f0363219231e4b6d6d17cee3f74993c617
- Route-only: 1/1 successful/total Palace calls; expected 1/1; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches 53f104f0363219231e4b6d6d17cee3f74993c617
- Full Palace: 1/1 successful/total Palace calls; expected 1/1; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches 53f104f0363219231e4b6d6d17cee3f74993c617

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
