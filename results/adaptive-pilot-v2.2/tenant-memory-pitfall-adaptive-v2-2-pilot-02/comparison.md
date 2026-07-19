# Vertex Palace Four-Arm Adaptive Benchmark

Run: `tenant-memory-pitfall-adaptive-v2-2-pilot-02`
Scenario: Tenant-scoped article theme regression with prior pitfall
Shared Git tree: `6f37d953213f97032e24d30db6a4678bae88a669`
Generated fixture files: 240
Palace index state: cold
Comparable result: yes
Execution: sequential (Adaptive Palace -> Control -> Full Palace -> Route-only)

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
| Elapsed time | 61.5s | 130.6s | 149.2s | 97.9s | +51.3s |
| Recorded command/tool calls | 5 | 23 | 28 | 13 | +15 |
| Failed recorded calls | 0 | 1 | 1 | 1 | 0 |
| Codex router errors in stderr | 0 | 1 | 1 | 1 | 0 |
| Native patch verification errors | 0 | 0 | 0 | 0 | 0 |
| Sandbox preparation errors | 0 | 0 | 0 | 0 | 0 |
| Inspection commands | 2 | 11 | 14 | 4 | +10 |
| Files named in commands | 11 | 12 | 14 | 6 | +8 |
| Distinct repository path strings observed | 240 | 12 | 239 | 11 | +228 |
| Command output characters | 19,554 | 14,324 | 25,827 | 9,304 | +16,523 |
| Palace context output characters | n/a | 4,545 | 5,465 | 2,450 | +3,015 |
| Palace context output bytes | n/a | 4,545 | 5,465 | 2,450 | +3,015 |
| Palace context estimated tokens | n/a | 1,137 | 1,367 | 613 | +754 |
| Cumulative input tokens | 127,641 | 179,673 | 348,551 | 164,640 | +183,911 |
| Cached input tokens | 112,896 | 162,304 | 294,144 | 151,040 | +143,104 |
| Uncached input tokens | 14,745 | 17,369 | 54,407 | 13,600 | +40,807 |
| Output tokens | 1,929 | 3,353 | 4,400 | 3,014 | +1,386 |
| Cumulative reported tokens | 129,570 | 183,026 | 352,951 | 167,654 | +185,297 |
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

- Control: 0 Palace calls detected; expected 0; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 6f37d953213f97032e24d30db6a4678bae88a669
- Route-only: 1/1 successful/total Palace calls; adaptiveRequested=false; expected false; adaptivePayloadMatchesOutput=null; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 6f37d953213f97032e24d30db6a4678bae88a669
- Full Palace: 1/1 successful/total Palace calls; adaptiveRequested=false; expected false; adaptivePayloadMatchesOutput=null; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 6f37d953213f97032e24d30db6a4678bae88a669
- Adaptive Palace: 1/1 successful/total Palace calls; adaptiveRequested=true; expected true; adaptivePayloadMatchesOutput=true; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 6f37d953213f97032e24d30db6a4678bae88a669

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
- Palace index cache state for this trial: cold. This does not control provider-side model caching.
- A result is comparable only when both arms start from the recorded Git tree and pass their arm-validity checks.
- Correctness and scope determine the score. Speed and token metrics are reported, not rewarded.
