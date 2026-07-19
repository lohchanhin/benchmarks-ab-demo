# Vertex Palace Four-Arm Adaptive Benchmark

Run: `small-local-bug-adaptive-v2-1-pilot-01`
Scenario: Small single-file negative-zero formatting bug
Shared Git tree: `0ce2b7827d0f630c99e2f20961941d054050e6f1`
Generated fixture files: 11
Palace index state: warm
Comparable result: yes
Execution: sequential (Control -> Route-only -> Adaptive Palace -> Full Palace)

## Task

Fix currency formatting so negative zero is rendered as $0.00 while genuinely negative cent values keep their minus sign. Keep the public API stable and make the complete test suite pass without changing tests.

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
| Elapsed time | 487.6s | 194.4s | 219.6s | 223.7s | -4.1s |
| Recorded command/tool calls | 38 | 18 | 27 | 18 | +9 |
| Failed recorded calls | 20 | 10 | 10 | 6 | +4 |
| Codex router errors in stderr | 22 | 12 | 12 | 8 | +4 |
| Inspection commands | 4 | 2 | 5 | 4 | +1 |
| Files named in commands | 4 | 4 | 4 | 3 | +1 |
| Distinct repository path strings observed | 11 | 4 | 10 | 4 | +6 |
| Command output characters | 15,913 | 7,648 | 10,825 | 7,048 | +3,777 |
| Palace context output characters | n/a | 2,086 | 2,086 | 1,218 | +868 |
| Palace context output bytes | n/a | 2,086 | 2,086 | 1,218 | +868 |
| Palace context estimated tokens | n/a | 522 | 522 | 305 | +217 |
| Cumulative input tokens | 1,042,972 | 370,696 | 436,777 | 303,489 | +133,288 |
| Cached input tokens | 981,760 | 327,680 | 395,520 | 259,840 | +135,680 |
| Uncached input tokens | 61,212 | 43,016 | 41,257 | 43,649 | -2,392 |
| Output tokens | 18,240 | 5,488 | 8,090 | 5,409 | +2,681 |
| Cumulative reported tokens | 1,061,212 | 376,184 | 444,867 | 308,898 | +135,969 |
| Palace calls | 0 | 1 | 1 | 1 | - |

Positive values in the final column mean Adaptive Palace used less than Full Palace for that measured resource.

## Changed Files

### Control

- `src/format-currency.mjs`

### Route-only

- `src/format-currency.mjs`

### Full Palace

- `src/format-currency.mjs`

### Adaptive Palace

- `src/format-currency.mjs`

## Validity

- Control: 0 Palace calls detected; expected 0; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches 0ce2b7827d0f630c99e2f20961941d054050e6f1
- Route-only: 1/1 successful/total Palace calls; adaptiveRequested=false; expected false; adaptivePayloadMatchesOutput=null; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches 0ce2b7827d0f630c99e2f20961941d054050e6f1
- Full Palace: 1/1 successful/total Palace calls; adaptiveRequested=false; expected false; adaptivePayloadMatchesOutput=null; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches 0ce2b7827d0f630c99e2f20961941d054050e6f1
- Adaptive Palace: 1/1 successful/total Palace calls; adaptiveRequested=true; expected true; adaptivePayloadMatchesOutput=true; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches 0ce2b7827d0f630c99e2f20961941d054050e6f1

## Route And Memory Signals

- Route-only Recall@K / Precision@K: 100.0% / 50.0% (K=4)
- Full Palace Recall@K / Precision@K: 100.0% / 50.0% (K=4)
- Adaptive Palace Recall@K / Precision@K: 100.0% / 50.0% (K=4)
- Control pitfall violation / wrong-memory adoption: n/a / n/a
- Route-only pitfall violation / wrong-memory adoption: n/a / n/a
- Full Palace pitfall violation / wrong-memory adoption: n/a / n/a
- Adaptive Palace pitfall violation / wrong-memory adoption: n/a / n/a
- Adaptive selected mode: route-lite
- Adaptive self-reported payload: 1,218 bytes / ~305 tokens

## Caveats

- Distinct repository path strings are matched anywhere in the transcript. An inventory command can list every path without reading every file's contents.
- Command-named files and command-output characters are transcript-derived context proxies, not an operating-system file-access audit.
- Codex input tokens are cumulative across model turns. Cached and uncached input are shown separately and are not an API billing statement.
- Paired arms run sequentially, never concurrently. Repeat pairs with alternating order and report medians to reduce order and service-load effects.
- Palace index cache state for this trial: warm. This does not control provider-side model caching.
- A result is comparable only when both arms start from the recorded Git tree and pass their arm-validity checks.
- Correctness and scope determine the score. Speed and token metrics are reported, not rewarded.
