# Vertex Palace Control-First Four-Arm Benchmark

Run: `exact-command-small-local-03`
Scenario: Small single-file negative-zero formatting bug
Shared Git tree: `08c33c1414b7eb71efabc9d8602b3db8be8dc2dd`
Generated fixture files: 11
Palace index state: warm
Comparable result: yes
Execution: sequential (Control -> Adaptive Palace -> Route-only -> Full Palace)

## Task

Fix currency formatting so negative zero is rendered as $0.00 while genuinely negative cent values keep their minus sign. Keep the public API stable and make the complete test suite pass without changing tests.

## Results

| Metric | Control | Route-only | Full Palace | Adaptive Palace | Control minus Adaptive |
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
| Elapsed time | 43.0s | 46.4s | 57.2s | 45.2s | -2.1s |
| Recorded command/tool calls | 4 | 5 | 9 | 6 | -2 |
| Failed recorded calls | 0 | 0 | 0 | 0 | 0 |
| Codex router errors in stderr | 0 | 0 | 0 | 1 | -1 |
| Native patch verification errors | 0 | 0 | 0 | 1 | -1 |
| Sandbox preparation errors | 0 | 0 | 0 | 0 | 0 |
| Inspection commands | 2 | 1 | 3 | 1 | +1 |
| Files named in commands | 3 | 3 | 3 | 1 | +2 |
| Distinct repository path strings observed | 5 | 3 | 3 | 1 | +4 |
| Command output characters | 3,477 | 3,838 | 3,821 | 1,480 | +1,997 |
| Palace context output characters | n/a | 1,870 | 1,870 | 254 | n/a |
| Palace context output bytes | n/a | 1,870 | 1,870 | 254 | n/a |
| Palace context estimated tokens | n/a | 468 | 468 | 64 | n/a |
| Cumulative input tokens | 86,494 | 103,139 | 104,718 | 99,705 | -13,211 |
| Cached input tokens | 68,352 | 93,440 | 84,480 | 77,312 | -8,960 |
| Uncached input tokens | 18,142 | 9,699 | 20,238 | 22,393 | -4,251 |
| Output tokens | 1,066 | 1,253 | 1,668 | 1,170 | -104 |
| Cumulative reported tokens | 87,560 | 104,392 | 106,386 | 100,875 | -13,315 |
| Palace calls | 0 | 1 | 1 | 1 | - |

Positive values in the final column mean Adaptive Palace used less than Control for that measured resource.

## Changed Files

### Control

- `src/format-currency.mjs`

### Route-only

- `src/format-currency.mjs`

### Full Palace

- `src/format-currency.mjs`

### Adaptive Palace

- `src/format-currency.mjs`

## Instrumentation Excluded From Scope

Raw Git status is preserved in each arm evidence file. Only root `.palace` state is excluded from correctness and changed-file precision/recall.

- Control: None
- Route-only: None
- Full Palace: None
- Adaptive Palace: None

## Validity

- Control: 0 Palace calls detected; expected 0; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 08c33c1414b7eb71efabc9d8602b3db8be8dc2dd
- Route-only: 1/1 successful/total Palace calls; adaptiveRequested=false; expected false; adaptivePayloadMatchesOutput=null; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 08c33c1414b7eb71efabc9d8602b3db8be8dc2dd
- Full Palace: 1/1 successful/total Palace calls; adaptiveRequested=false; expected false; adaptivePayloadMatchesOutput=null; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 08c33c1414b7eb71efabc9d8602b3db8be8dc2dd
- Adaptive Palace: 1/1 successful/total Palace calls; adaptiveRequested=true; expected true; adaptivePayloadMatchesOutput=true; taskFidelity=true; Codex exit code 0; timedOut=false; fixed execution settings match the run plan; sandbox preparation errors=0; expected 0; fixture tree matches 08c33c1414b7eb71efabc9d8602b3db8be8dc2dd

## Route And Memory Signals

- Route-only Recall@K / Precision@K: 100.0% / 66.7% (K=3)
- Full Palace Recall@K / Precision@K: 100.0% / 66.7% (K=3)
- Adaptive Palace Recall@K / Precision@K: 100.0% / 66.7% (K=3)
- Control pitfall violation / wrong-memory adoption: n/a / n/a
- Route-only pitfall violation / wrong-memory adoption: n/a / n/a
- Full Palace pitfall violation / wrong-memory adoption: n/a / n/a
- Adaptive Palace pitfall violation / wrong-memory adoption: n/a / n/a
- Adaptive selected mode: bypass
- Adaptive self-reported payload: 254 bytes / ~64 tokens
- Adaptive self-reported memory: 0 included / 0 candidates / 0 excluded

## Caveats

- Distinct repository path strings are matched anywhere in the transcript. An inventory command can list every path without reading every file's contents.
- Command-named files and command-output characters are transcript-derived context proxies, not an operating-system file-access audit.
- Codex input tokens are cumulative across model turns. Cached and uncached input are shown separately and are not an API billing statement.
- Paired arms run sequentially, never concurrently. Repeat pairs with alternating order and report medians to reduce order and service-load effects.
- Palace index cache state for this trial: warm. This does not control provider-side model caching.
- Root .palace paths are recorded as benchmark instrumentation and excluded from changed-file scope; raw Git status remains in each arm evidence file.
- A result is comparable only when both arms start from the recorded Git tree and pass their arm-validity checks.
- Correctness and scope determine the score. Speed and token metrics are reported, not rewarded.
