# Vertex Palace Four-Arm Adaptive Benchmark

Run: `small-local-bug-adaptive-pilot-01`
Scenario: Small single-file negative-zero formatting bug
Shared Git tree: `78ddc8cb526ac7135821798df2b57b283d15c079`
Generated fixture files: 11
Palace index state: warm
Comparable result: no
Execution: sequential (Route-only -> Full Palace -> Control -> Adaptive Palace)

## Task

Fix currency formatting so negative zero is rendered as $0.00 while genuinely negative cent values keep their minus sign. Keep the public API stable and make the complete test suite pass without changing tests.

## Results

| Metric | Control | Route-only | Full Palace | Adaptive Palace | Full Palace minus Adaptive |
| --- | ---: | ---: | ---: | ---: | ---: |
| Protocol success | yes | no | no | no | - |
| Public tests | yes | yes | yes | yes | - |
| Hidden oracle | yes | yes | yes | yes | - |
| Timed out | no | no | no | no | - |
| Arm valid | valid | invalid | invalid | invalid | - |
| Scope score | 100/100 | 100/100 | 100/100 | 100/100 | - |
| Changed-file precision | 100.0% | 100.0% | 100.0% | 100.0% | - |
| Changed-file recall | 100.0% | 100.0% | 100.0% | 100.0% | - |
| Forbidden-file violation | no | no | no | no | - |
| Elapsed time | 132.1s | 82.4s | 145.9s | 219.0s | n/a |
| Recorded command/tool calls | 13 | 7 | 22 | 23 | n/a |
| Failed recorded calls | 6 | 1 | 8 | 8 | n/a |
| Codex router errors in stderr | 8 | 3 | 10 | 9 | n/a |
| Inspection commands | 3 | 1 | 1 | 5 | n/a |
| Files named in commands | 4 | 4 | 4 | 4 | n/a |
| Distinct repository path strings observed | 11 | 4 | 10 | 4 | n/a |
| Command output characters | 8,276 | 4,897 | 9,898 | 8,076 | n/a |
| Palace context output characters | n/a | 2,084 | 2,084 | 1,763 | n/a |
| Palace context output bytes | n/a | 2,084 | 2,084 | 1,763 | n/a |
| Palace context estimated tokens | n/a | 521 | 521 | 441 | n/a |
| Cumulative input tokens | 259,180 | 154,577 | 284,495 | 362,637 | n/a |
| Cached input tokens | 223,488 | 132,608 | 254,976 | 316,672 | n/a |
| Uncached input tokens | 35,692 | 21,969 | 29,519 | 45,965 | n/a |
| Output tokens | 3,704 | 2,274 | 5,866 | 5,822 | n/a |
| Cumulative reported tokens | 262,884 | 156,851 | 290,361 | 368,459 | n/a |
| Palace calls | 0 | 1 | 1 | 1 | - |

Efficiency deltas are withheld because the primary baseline and treatment did not both complete as valid, passing runs.

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

- Control: 0 Palace calls detected; expected 0; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches 78ddc8cb526ac7135821798df2b57b283d15c079
- Route-only: 1/1 successful/total Palace calls; adaptiveRequested=false; expected false; adaptivePayloadMatchesOutput=null; taskFidelity=false; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches 78ddc8cb526ac7135821798df2b57b283d15c079
- Full Palace: 1/1 successful/total Palace calls; adaptiveRequested=false; expected false; adaptivePayloadMatchesOutput=null; taskFidelity=false; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches 78ddc8cb526ac7135821798df2b57b283d15c079
- Adaptive Palace: 1/1 successful/total Palace calls; adaptiveRequested=true; expected true; adaptivePayloadMatchesOutput=true; taskFidelity=false; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; fixture tree matches 78ddc8cb526ac7135821798df2b57b283d15c079

## Route And Memory Signals

- Route-only Recall@K / Precision@K: 100.0% / 50.0% (K=4)
- Full Palace Recall@K / Precision@K: 100.0% / 50.0% (K=4)
- Adaptive Palace Recall@K / Precision@K: 100.0% / 50.0% (K=4)
- Control pitfall violation / wrong-memory adoption: n/a / n/a
- Route-only pitfall violation / wrong-memory adoption: n/a / n/a
- Full Palace pitfall violation / wrong-memory adoption: n/a / n/a
- Adaptive Palace pitfall violation / wrong-memory adoption: n/a / n/a
- Adaptive selected mode: full-palace
- Adaptive self-reported payload: 1,763 bytes / ~441 tokens

## Caveats

- Distinct repository path strings are matched anywhere in the transcript. An inventory command can list every path without reading every file's contents.
- Command-named files and command-output characters are transcript-derived context proxies, not an operating-system file-access audit.
- Codex input tokens are cumulative across model turns. Cached and uncached input are shown separately and are not an API billing statement.
- Paired arms run sequentially, never concurrently. Repeat pairs with alternating order and report medians to reduce order and service-load effects.
- Palace index cache state for this trial: warm. This does not control provider-side model caching.
- A result is comparable only when both arms start from the recorded Git tree and pass their arm-validity checks.
- Correctness and scope determine the score. Speed and token metrics are reported, not rewarded.
