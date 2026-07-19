# Vertex Palace Four-Arm Adaptive Benchmark

Run: `tenant-memory-pitfall-adaptive-v2-2-pilot-03`
Scenario: Tenant-scoped article theme regression with prior pitfall
Shared Git tree: `96c9741bb172b24f8c0baa1fa1a547b60c467d8f`
Generated fixture files: 240
Palace index state: warm
Comparable result: yes
Execution: sequential (Control -> Route-only -> Adaptive Palace -> Full Palace)

## Task

Fix the Aurora article hero contrast regression while preserving the appearance of every other tenant. The renderer must honor an explicit tenant text-color override, the Aurora hero must meet WCAG AA contrast, and the complete test suite must pass. Do not weaken or rewrite the tests.

## Results

| Metric | Control | Route-only | Full Palace | Adaptive Palace | Full Palace minus Adaptive |
| --- | ---: | ---: | ---: | ---: | ---: |
| Protocol success | yes | yes | yes | yes | - |
| Public tests | yes | yes | yes | yes | - |
| Hidden oracle | yes | yes | yes | yes | - |
| Timed out | no | no | no | no | - |
| Arm valid | valid | valid | valid | valid | - |
| Scope score | 100/100 | 100/100 | 100/100 | 100/100 | - |
| Changed-file precision | 100.0% | 100.0% | 100.0% | 100.0% | - |
| Changed-file recall | 100.0% | 100.0% | 100.0% | 100.0% | - |
| Forbidden-file violation | no | no | no | no | - |
| Elapsed time | 151.9s | 225.0s | 79.7s | 85.0s | -5.3s |
| Recorded command/tool calls | 8 | 9 | 7 | 6 | +1 |
| Failed recorded calls | 2 | 1 | 0 | 0 | 0 |
| Codex router errors in stderr | 2 | 1 | 0 | 0 | 0 |
| Native patch verification errors | 0 | 0 | 0 | 0 | 0 |
| Sandbox preparation errors | 0 | 0 | 0 | 0 | 0 |
| Inspection commands | 4 | 3 | 3 | 2 | +1 |
| Files named in commands | 11 | 14 | 9 | 4 | +5 |
| Distinct repository path strings observed | 202 | 239 | 12 | 8 | +4 |
| Command output characters | 20,407 | 22,536 | 12,612 | 7,225 | +5,387 |
| Palace context output characters | n/a | 4,545 | 5,465 | 2,450 | +3,015 |
| Palace context output bytes | n/a | 4,545 | 5,465 | 2,450 | +3,015 |
| Palace context estimated tokens | n/a | 1,137 | 1,367 | 613 | +754 |
| Cumulative input tokens | 246,702 | 209,179 | 152,553 | 125,096 | +27,457 |
| Cached input tokens | 217,088 | 190,720 | 126,720 | 114,688 | +12,032 |
| Uncached input tokens | 29,614 | 18,459 | 25,833 | 10,408 | +15,425 |
| Output tokens | 3,080 | 2,469 | 2,159 | 2,244 | -85 |
| Cumulative reported tokens | 249,782 | 211,648 | 154,712 | 127,340 | +27,372 |
| Palace calls | 0 | 1 | 1 | 1 | - |

Positive values in the final column mean Adaptive Palace used less than Full Palace for that measured resource.

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

### Adaptive Palace

- `clients/aurora/theme.mjs`
- `src/rendering/article-page.mjs`

## Validity

- Control: 0 Palace calls detected; expected 0; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 96c9741bb172b24f8c0baa1fa1a547b60c467d8f
- Route-only: 1/1 successful/total Palace calls; adaptiveRequested=false; expected false; adaptivePayloadMatchesOutput=null; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 96c9741bb172b24f8c0baa1fa1a547b60c467d8f
- Full Palace: 1/1 successful/total Palace calls; adaptiveRequested=false; expected false; adaptivePayloadMatchesOutput=null; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 96c9741bb172b24f8c0baa1fa1a547b60c467d8f
- Adaptive Palace: 1/1 successful/total Palace calls; adaptiveRequested=true; expected true; adaptivePayloadMatchesOutput=true; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 96c9741bb172b24f8c0baa1fa1a547b60c467d8f

## Route And Memory Signals

- Route-only Recall@K / Precision@K: 100.0% / 50.0% (K=8)
- Full Palace Recall@K / Precision@K: 100.0% / 50.0% (K=8)
- Adaptive Palace Recall@K / Precision@K: 100.0% / 50.0% (K=8)
- Control pitfall violation / wrong-memory adoption: no / n/a
- Route-only pitfall violation / wrong-memory adoption: no / n/a
- Full Palace pitfall violation / wrong-memory adoption: no / n/a
- Adaptive Palace pitfall violation / wrong-memory adoption: no / n/a
- Adaptive selected mode: full-palace
- Adaptive self-reported payload: 2,450 bytes / ~613 tokens

## Caveats

- Distinct repository path strings are matched anywhere in the transcript. An inventory command can list every path without reading every file's contents.
- Command-named files and command-output characters are transcript-derived context proxies, not an operating-system file-access audit.
- Codex input tokens are cumulative across model turns. Cached and uncached input are shown separately and are not an API billing statement.
- Paired arms run sequentially, never concurrently. Repeat pairs with alternating order and report medians to reduce order and service-load effects.
- Palace index cache state for this trial: warm. This does not control provider-side model caching.
- A result is comparable only when both arms start from the recorded Git tree and pass their arm-validity checks.
- Correctness and scope determine the score. Speed and token metrics are reported, not rewarded.
