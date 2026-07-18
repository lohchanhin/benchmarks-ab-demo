# Vertex Palace Exploratory Pilot Analysis

Planned pilot trials: 20
Attempted trials: 12
Loaded reports: 12

Interim only: 12/20 planned trials are represented. Do not interpret these intervals or p-values as final evidence.

| Scenario | Valid pairs | Control success | Full Palace success | Paired difference (95% bootstrap CI) | Exact p | Holm p |
| --- | ---: | ---: | ---: | --- | ---: | ---: |
| small-local-bug | 5 | 100.0% | 100.0% | 0.0% [0.0%, 0.0%] | 1.0000 | 1.0000 |
| cross-stack-regression | 5 | 100.0% | 100.0% | 0.0% [0.0%, 0.0%] | 1.0000 | 1.0000 |
| tenant-memory-pitfall | 2 | 100.0% | 100.0% | 0.0% [0.0%, 0.0%] | 1.0000 | 1.0000 |

## Mutually Successful Pair Efficiency

Paired differences are Full Palace minus Control. Negative values mean Full Palace used less of the measured resource; wall time remains secondary.

| Scenario | Metric | Pairs | Control median | Full median | Paired median difference (95% bootstrap CI) |
| --- | --- | ---: | ---: | ---: | --- |
| small-local-bug | Reported tokens | 5 | 312,034 | 339,111 | 29,423 [-2,445, 113,838] |
| small-local-bug | Uncached input tokens | 5 | 31,934 | 33,287 | -130 [-24,212, 11,814] |
| small-local-bug | Tool calls | 5 | 14 | 20 | 6 [3, 7] |
| small-local-bug | Wall time | 5 | 147.7s | 169.7s | -16.8s [-25.5s, 62.0s] |
| cross-stack-regression | Reported tokens | 5 | 245,300 | 240,938 | 23,648 [-43,041, 85,854] |
| cross-stack-regression | Uncached input tokens | 5 | 23,420 | 28,543 | 10,250 [-5,575, 21,513] |
| cross-stack-regression | Tool calls | 5 | 11 | 24 | 11 [7, 17] |
| cross-stack-regression | Wall time | 5 | 97.3s | 113.0s | 20.5s [-7.5s, 37.5s] |
| tenant-memory-pitfall | Reported tokens | 2 | 396,906.5 | 440,483 | 43,576.5 [-64,710, 151,863] |
| tenant-memory-pitfall | Uncached input tokens | 2 | 27,893.5 | 34,420 | 6,526.5 [3,470, 9,583] |
| tenant-memory-pitfall | Tool calls | 2 | 16 | 25.5 | 9.5 [-1, 20] |
| tenant-memory-pitfall | Wall time | 2 | 161.8s | 178.7s | 16.9s [-34.7s, 68.5s] |

Efficiency metrics are calculated only for mutually successful pairs. Raw values and bootstrap intervals are available in the JSON report.

This exploratory pilot does not guarantee that Vertex Palace is faster on every task.
