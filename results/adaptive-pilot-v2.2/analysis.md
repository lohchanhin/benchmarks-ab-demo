# Vertex Palace Exploratory Pilot Analysis

Planned pilot trials: 16
Attempted trials: 3
Loaded reports: 3

Interim only: 3/16 planned trials are represented. Do not interpret these intervals or p-values as final evidence.

| Scenario | Primary comparison | Valid pairs | Baseline success | Treatment success | Treatment minus baseline (95% bootstrap CI) | Exact p | Holm p |
| --- | --- | ---: | ---: | ---: | --- | ---: | ---: |
| small-local-bug | Adaptive Palace - Full Palace | 3 | 100.0% | 100.0% | 0.0% [0.0%, 0.0%] | 1.0000 | 1.0000 |

## Mutually Successful Pair Efficiency

Paired differences are primary treatment minus primary baseline. Negative values mean the treatment used less of the measured resource; wall time remains secondary.

| Scenario | Metric | Pairs | Baseline median | Treatment median | Paired median difference (95% bootstrap CI) |
| --- | --- | ---: | ---: | ---: | --- |
| small-local-bug | Reported tokens | 3 | 122,924 | 104,205 | -17,055 [-38,931, 28,537] |
| small-local-bug | Uncached input tokens | 3 | 11,834 | 14,684 | 2,850 [-13,145, 6,233] |
| small-local-bug | Palace context output bytes | 3 | 2,086 | 1,218 | -868 [-868, -868] |
| small-local-bug | Palace context estimated tokens | 3 | 522 | 305 | -217 [-217, -217] |
| small-local-bug | Tool calls | 3 | 11 | 8 | -3 [-6, 2] |
| small-local-bug | Wall time | 3 | 60.2s | 52.5s | -1.4s [-14.6s, 0.3s] |

## Four-Arm Adaptive Contrasts

Each contrast is treatment minus baseline. Negative efficiency values favor the treatment. These secondary mechanism contrasts are exploratory and are not multiplicity-adjusted.

| Scenario | Contrast | Metric | Pairs | Baseline median | Treatment median | Paired median difference (95% bootstrap CI) |
| --- | --- | --- | ---: | ---: | ---: | --- |
| small-local-bug | Route-only - Control | Reported tokens | 3 | 87,561 | 120,719 | 33,158 [-34,303, 53,647] |
| small-local-bug | Route-only - Control | Uncached input tokens | 3 | 25,974 | 25,945 | -3,137 [-7,372, 1,897] |
| small-local-bug | Route-only - Control | Tool calls | 3 | 4 | 11 | 7 [-2, 10] |
| small-local-bug | Route-only - Control | Wall time | 3 | 43.4s | 52.1s | 8.7s [-31.6s, 42.5s] |
| small-local-bug | Full Palace - Route-only | Reported tokens | 3 | 120,719 | 122,924 | 1,628 [541, 32,443] |
| small-local-bug | Full Palace - Route-only | Uncached input tokens | 3 | 25,945 | 11,834 | -2,520 [-16,037, 1,039] |
| small-local-bug | Full Palace - Route-only | Palace context output bytes | 3 | 2,086 | 2,086 | 0 [0, 0] |
| small-local-bug | Full Palace - Route-only | Palace context estimated tokens | 3 | 522 | 522 | 0 [0, 0] |
| small-local-bug | Full Palace - Route-only | Tool calls | 3 | 11 | 11 | -1 [-5, 2] |
| small-local-bug | Full Palace - Route-only | Wall time | 3 | 52.1s | 60.2s | 0.1s [-15.4s, 17.0s] |
| small-local-bug | Adaptive Palace - Control | Reported tokens | 3 | 87,561 | 104,205 | 16,644 [16,344, 26,677] |
| small-local-bug | Adaptive Palace - Control | Uncached input tokens | 3 | 25,974 | 14,684 | -11,290 [-23,037, 4,135] |
| small-local-bug | Adaptive Palace - Control | Tool calls | 3 | 4 | 8 | 3 [-3, 4] |
| small-local-bug | Adaptive Palace - Control | Wall time | 3 | 43.4s | 52.5s | 9.1s [-16.0s, 12.4s] |
| small-local-bug | Adaptive Palace - Full Palace | Reported tokens | 3 | 122,924 | 104,205 | -17,055 [-38,931, 28,537] |
| small-local-bug | Adaptive Palace - Full Palace | Uncached input tokens | 3 | 11,834 | 14,684 | 2,850 [-13,145, 6,233] |
| small-local-bug | Adaptive Palace - Full Palace | Palace context output bytes | 3 | 2,086 | 1,218 | -868 [-868, -868] |
| small-local-bug | Adaptive Palace - Full Palace | Palace context estimated tokens | 3 | 522 | 305 | -217 [-217, -217] |
| small-local-bug | Adaptive Palace - Full Palace | Tool calls | 3 | 11 | 8 | -3 [-6, 2] |
| small-local-bug | Adaptive Palace - Full Palace | Wall time | 3 | 60.2s | 52.5s | -1.4s [-14.6s, 0.3s] |

Efficiency metrics are calculated only for mutually successful pairs. Raw values and bootstrap intervals are available in the JSON report.

This exploratory pilot does not guarantee that Vertex Palace is faster on every task.
