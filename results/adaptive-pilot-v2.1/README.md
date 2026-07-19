# Adaptive Pilot v2.1 Interim Result

Status: 1 of 16 planned trials executed; remaining v2.1 execution retired
after a post-outcome infrastructure defect was identified.

The retained trial is
[`small-local-bug-adaptive-v2-1-pilot-01`](./small-local-bug-adaptive-v2-1-pilot-01/comparison.md).
All four arms received the exact frozen task, changed only
`src/format-currency.mjs`, passed public tests and the hidden oracle, and met
their treatment-validity rules. The pair is therefore valid under frozen
protocol v2.1, but it is only one exploratory observation.

## Adaptive Versus Full Palace

| Metric | Full Palace | Adaptive Palace | Adaptive difference |
| --- | ---: | ---: | ---: |
| Protocol success | yes | yes | equal |
| Selected mode | legacy full | `route-lite` | lighter mode |
| Palace payload bytes | 2,086 | 1,218 | -868 (-41.6%) |
| Palace estimated payload tokens | 522 | 305 | -217 (-41.6%) |
| Recorded calls | 27 | 18 | -9 (-33.3%) |
| Failed calls | 10 | 6 | -4 |
| Cumulative reported tokens | 444,867 | 308,898 | -135,969 (-30.6%) |
| Uncached input tokens | 41,257 | 43,649 | +2,392 (+5.8%) |
| Wall time | 219.6s | 223.7s | +4.1s (+1.9%) |

This single trial supports the engineering claim that v0.2.1 selected and
delivered a smaller context than always-on Full Palace. It does not establish
that Adaptive Palace is faster or uses less uncached input. It cannot support
a population-level Token claim.

## Post-Outcome Infrastructure Finding

Every arm initially encountered the same Windows Codex sandbox class of
failure: `--output-last-message` pointed outside the arm workspace, creating
split writable roots that prevented `apply_patch` from running. Agents then
used fallbacks. Recorded router errors were Control 22, Route-only 12,
Adaptive 8, and Full 12. The unequal recovery cost is part of this frozen run
and is not edited away, but it adds substantial noise to time and Token values.

The run remains public because the condition was fixed across arms and all
validity/correctness rules passed. The remaining v2.1 trials will not be run.
A successor protocol must move the temporary last-message output inside each
workspace, transfer it to artifacts after Codex exits, use fresh ids and seeds,
and freeze before new agent execution.

Raw transcripts remain local. The public directory contains all four sanitized
evidence files, comparison reports, run metadata, and SHA-256 coverage.
