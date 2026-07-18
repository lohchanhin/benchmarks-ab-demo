# Vertex Palace Exploratory Pilot Analysis

Planned pilot trials: 20
Attempted trials: 5
Loaded reports: 5

Interim only: 5/20 planned trials are represented. Do not interpret these intervals or p-values as final evidence.

| Scenario | Valid pairs | Control success | Full Palace success | Paired difference (95% bootstrap CI) | Exact p | Holm p |
| --- | ---: | ---: | ---: | --- | ---: | ---: |
| small-local-bug | 5 | 100.0% | 100.0% | 0.0% [0.0%, 0.0%] | 1.0000 | 1.0000 |

## Mutually Successful Pair Efficiency

Paired differences are Full Palace minus Control. Negative values mean Full Palace used less of the measured resource; wall time remains secondary.

| Scenario | Metric | Pairs | Control median | Full median | Paired median difference (95% bootstrap CI) |
| --- | --- | ---: | ---: | ---: | --- |
| small-local-bug | Reported tokens | 5 | 312,034 | 339,111 | 29,423 [-2,445, 113,838] |
| small-local-bug | Uncached input tokens | 5 | 31,934 | 33,287 | -130 [-24,212, 11,814] |
| small-local-bug | Tool calls | 5 | 14 | 20 | 6 [3, 7] |
| small-local-bug | Wall time | 5 | 147.7s | 169.7s | -16.8s [-25.5s, 62.0s] |

Efficiency metrics are calculated only for mutually successful pairs. Raw values and bootstrap intervals are available in the JSON report.

This exploratory pilot does not guarantee that Vertex Palace is faster on every task.
