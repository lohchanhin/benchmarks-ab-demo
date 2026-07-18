# Vertex Palace Three-Arm Benchmark

Run: `tenant-memory-pitfall-pilot-02`
Scenario: Tenant-scoped article theme regression with prior pitfall
Shared Git tree: `bc9fb0cc176783a8dd40bda747439a04f48ba639`
Generated fixture files: 240
Comparable result: yes
Execution: sequential (Control -> Full Palace -> Route-only)

## Task

Fix the Aurora article hero contrast regression while preserving the appearance of every other tenant. The renderer must honor an explicit tenant text-color override, the Aurora hero must meet WCAG AA contrast, and the complete test suite must pass. Do not weaken or rewrite the tests.

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
| Elapsed time | 149.7s | 148.1s | 218.2s | -68.5s |
| Recorded command/tool calls | 15 | 34 | 35 | -20 |
| Failed recorded calls | 6 | 7 | 9 | -3 |
| Codex router errors in stderr | 8 | 9 | 11 | -3 |
| Inspection commands | 4 | 15 | 14 | -10 |
| Files named in commands | 10 | 11 | 11 | -1 |
| Distinct repository path strings observed | 239 | 11 | 11 | +228 |
| Command output characters | 21,863 | 14,744 | 20,211 | +1,652 |
| Cumulative input tokens | 371,210 | 389,074 | 520,600 | -149,390 |
| Cached input tokens | 342,528 | 352,256 | 488,448 | -145,920 |
| Uncached input tokens | 28,682 | 36,818 | 32,152 | -3,470 |
| Output tokens | 5,091 | 5,128 | 7,564 | -2,473 |
| Cumulative reported tokens | 376,301 | 394,202 | 528,164 | -151,863 |
| Palace calls | 0 | 1 | 1 | - |

Positive values in the final column mean the Palace arm used less of that measured resource.

## Changed Files

### Control

- `clients/aurora/theme.mjs`
- `src/rendering/article-page.mjs`

### Route-only

- `clients/aurora/theme.mjs`
- `src/rendering/article-page.mjs`

### Full Palace

- `clients/aurora/theme.mjs`
- `src/rendering/article-page.mjs`

## Validity

- Control: 0 Palace calls detected; expected 0; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches bc9fb0cc176783a8dd40bda747439a04f48ba639
- Route-only: 1/1 successful/total Palace calls; expected 1/1; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches bc9fb0cc176783a8dd40bda747439a04f48ba639
- Full Palace: 1/1 successful/total Palace calls; expected 1/1; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches bc9fb0cc176783a8dd40bda747439a04f48ba639

## Route And Memory Signals

- Route-only Recall@K / Precision@K: 100.0% / 50.0% (K=8)
- Full Palace Recall@K / Precision@K: 100.0% / 50.0% (K=8)
- Control pitfall violation / wrong-memory adoption: no / n/a
- Route-only pitfall violation / wrong-memory adoption: no / n/a
- Full Palace pitfall violation / wrong-memory adoption: no / n/a

## Caveats

- Distinct repository path strings are matched anywhere in the transcript. An inventory command can list every path without reading every file's contents.
- Command-named files and command-output characters are transcript-derived context proxies, not an operating-system file-access audit.
- Codex input tokens are cumulative across model turns. Cached and uncached input are shown separately and are not an API billing statement.
- Paired arms run sequentially, never concurrently. Repeat pairs with alternating order and report medians to reduce order and service-load effects.
- A result is comparable only when both arms start from the recorded Git tree and pass their arm-validity checks.
- Correctness and scope determine the score. Speed and token metrics are reported, not rewarded.
