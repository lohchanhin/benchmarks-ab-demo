# Vertex Palace Exploratory Pilot Analysis

Planned pilot trials: 16
Attempted trials: 1
Loaded reports: 1

Interim only: 1/16 planned trials are represented. Do not interpret these intervals or p-values as final evidence.

| Scenario | Primary comparison | Valid pairs | Baseline success | Treatment success | Treatment minus baseline (95% bootstrap CI) | Exact p | Holm p |
| --- | --- | ---: | ---: | ---: | --- | ---: | ---: |
| small-local-bug | Adaptive Palace - Full Palace | 1 | 100.0% | 100.0% | 0.0% [0.0%, 0.0%] | 1.0000 | 1.0000 |

## Mutually Successful Pair Efficiency

Paired differences are primary treatment minus primary baseline. Negative values mean the treatment used less of the measured resource; wall time remains secondary.

| Scenario | Metric | Pairs | Baseline median | Treatment median | Paired median difference (95% bootstrap CI) |
| --- | --- | ---: | ---: | ---: | --- |
| small-local-bug | Reported tokens | 1 | 121,260 | 104,205 | -17,055 [-17,055, -17,055] |
| small-local-bug | Uncached input tokens | 1 | 23,425 | 10,280 | -13,145 [-13,145, -13,145] |
| small-local-bug | Palace context output bytes | 1 | 2,086 | 1,218 | -868 [-868, -868] |
| small-local-bug | Palace context estimated tokens | 1 | 522 | 305 | -217 [-217, -217] |
| small-local-bug | Tool calls | 1 | 6 | 8 | 2 [2, 2] |
| small-local-bug | Wall time | 1 | 52.2s | 52.5s | 0.3s [0.3s, 0.3s] |

## Four-Arm Adaptive Contrasts

Each contrast is treatment minus baseline. Negative efficiency values favor the treatment. These secondary mechanism contrasts are exploratory and are not multiplicity-adjusted.

| Scenario | Contrast | Metric | Pairs | Baseline median | Treatment median | Paired median difference (95% bootstrap CI) |
| --- | --- | --- | ---: | ---: | ---: | --- |
| small-local-bug | Route-only - Control | Reported tokens | 1 | 87,561 | 120,719 | 33,158 [33,158, 33,158] |
| small-local-bug | Route-only - Control | Uncached input tokens | 1 | 33,317 | 25,945 | -7,372 [-7,372, -7,372] |
| small-local-bug | Route-only - Control | Tool calls | 1 | 4 | 11 | 7 [7, 7] |
| small-local-bug | Route-only - Control | Wall time | 1 | 43.4s | 52.1s | 8.7s [8.7s, 8.7s] |
| small-local-bug | Full Palace - Route-only | Reported tokens | 1 | 120,719 | 121,260 | 541 [541, 541] |
| small-local-bug | Full Palace - Route-only | Uncached input tokens | 1 | 25,945 | 23,425 | -2,520 [-2,520, -2,520] |
| small-local-bug | Full Palace - Route-only | Palace context output bytes | 1 | 2,086 | 2,086 | 0 [0, 0] |
| small-local-bug | Full Palace - Route-only | Palace context estimated tokens | 1 | 522 | 522 | 0 [0, 0] |
| small-local-bug | Full Palace - Route-only | Tool calls | 1 | 11 | 6 | -5 [-5, -5] |
| small-local-bug | Full Palace - Route-only | Wall time | 1 | 52.1s | 52.2s | 0.1s [0.1s, 0.1s] |
| small-local-bug | Adaptive Palace - Control | Reported tokens | 1 | 87,561 | 104,205 | 16,644 [16,644, 16,644] |
| small-local-bug | Adaptive Palace - Control | Uncached input tokens | 1 | 33,317 | 10,280 | -23,037 [-23,037, -23,037] |
| small-local-bug | Adaptive Palace - Control | Tool calls | 1 | 4 | 8 | 4 [4, 4] |
| small-local-bug | Adaptive Palace - Control | Wall time | 1 | 43.4s | 52.5s | 9.1s [9.1s, 9.1s] |
| small-local-bug | Adaptive Palace - Full Palace | Reported tokens | 1 | 121,260 | 104,205 | -17,055 [-17,055, -17,055] |
| small-local-bug | Adaptive Palace - Full Palace | Uncached input tokens | 1 | 23,425 | 10,280 | -13,145 [-13,145, -13,145] |
| small-local-bug | Adaptive Palace - Full Palace | Palace context output bytes | 1 | 2,086 | 1,218 | -868 [-868, -868] |
| small-local-bug | Adaptive Palace - Full Palace | Palace context estimated tokens | 1 | 522 | 305 | -217 [-217, -217] |
| small-local-bug | Adaptive Palace - Full Palace | Tool calls | 1 | 6 | 8 | 2 [2, 2] |
| small-local-bug | Adaptive Palace - Full Palace | Wall time | 1 | 52.2s | 52.5s | 0.3s [0.3s, 0.3s] |

Efficiency metrics are calculated only for mutually successful pairs. Raw values and bootstrap intervals are available in the JSON report.

This exploratory pilot does not guarantee that Vertex Palace is faster on every task.
