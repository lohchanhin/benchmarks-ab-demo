# Vertex Palace Three-Arm Benchmark

Run: `tenant-memory-pitfall-pilot-04`
Scenario: Tenant-scoped article theme regression with prior pitfall
Shared Git tree: `693a3c0751289c8067d98ea75e51fcdc12fc0394`
Generated fixture files: 240
Comparable result: yes
Execution: sequential (Route-only -> Control -> Full Palace)

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
| Elapsed time | 115.2s | 145.1s | 186.5s | -71.3s |
| Recorded command/tool calls | 14 | 16 | 36 | -22 |
| Failed recorded calls | 2 | 5 | 9 | -7 |
| Codex router errors in stderr | 4 | 7 | 11 | -7 |
| Inspection commands | 5 | 5 | 11 | -6 |
| Files named in commands | 11 | 14 | 9 | +2 |
| Distinct repository path strings observed | 240 | 239 | 11 | +229 |
| Command output characters | 25,265 | 25,625 | 16,659 | +8,606 |
| Cumulative input tokens | 250,801 | 406,247 | 422,404 | -171,603 |
| Cached input tokens | 206,080 | 348,672 | 392,960 | -186,880 |
| Uncached input tokens | 44,721 | 57,575 | 29,444 | +15,277 |
| Output tokens | 4,154 | 4,655 | 6,123 | -1,969 |
| Cumulative reported tokens | 254,955 | 410,902 | 428,527 | -173,572 |
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

- Control: 0 Palace calls detected; expected 0; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches 693a3c0751289c8067d98ea75e51fcdc12fc0394
- Route-only: 1/1 successful/total Palace calls; expected 1/1; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches 693a3c0751289c8067d98ea75e51fcdc12fc0394
- Full Palace: 1/1 successful/total Palace calls; expected 1/1; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches 693a3c0751289c8067d98ea75e51fcdc12fc0394

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
