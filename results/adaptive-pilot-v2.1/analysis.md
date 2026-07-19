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
| small-local-bug | Reported tokens | 1 | 444,867 | 308,898 | -135,969 [-135,969, -135,969] |
| small-local-bug | Uncached input tokens | 1 | 41,257 | 43,649 | 2,392 [2,392, 2,392] |
| small-local-bug | Palace context output bytes | 1 | 2,086 | 1,218 | -868 [-868, -868] |
| small-local-bug | Palace context estimated tokens | 1 | 522 | 305 | -217 [-217, -217] |
| small-local-bug | Tool calls | 1 | 27 | 18 | -9 [-9, -9] |
| small-local-bug | Wall time | 1 | 219.6s | 223.7s | 4.1s [4.1s, 4.1s] |

## Four-Arm Adaptive Contrasts

Each contrast is treatment minus baseline. Negative efficiency values favor the treatment. These secondary mechanism contrasts are exploratory and are not multiplicity-adjusted.

| Scenario | Contrast | Metric | Pairs | Baseline median | Treatment median | Paired median difference (95% bootstrap CI) |
| --- | --- | --- | ---: | ---: | ---: | --- |
| small-local-bug | Route-only - Control | Reported tokens | 1 | 1,061,212 | 376,184 | -685,028 [-685,028, -685,028] |
| small-local-bug | Route-only - Control | Uncached input tokens | 1 | 61,212 | 43,016 | -18,196 [-18,196, -18,196] |
| small-local-bug | Route-only - Control | Tool calls | 1 | 38 | 18 | -20 [-20, -20] |
| small-local-bug | Route-only - Control | Wall time | 1 | 487.6s | 194.4s | -293.2s [-293.2s, -293.2s] |
| small-local-bug | Full Palace - Route-only | Reported tokens | 1 | 376,184 | 444,867 | 68,683 [68,683, 68,683] |
| small-local-bug | Full Palace - Route-only | Uncached input tokens | 1 | 43,016 | 41,257 | -1,759 [-1,759, -1,759] |
| small-local-bug | Full Palace - Route-only | Palace context output bytes | 1 | 2,086 | 2,086 | 0 [0, 0] |
| small-local-bug | Full Palace - Route-only | Palace context estimated tokens | 1 | 522 | 522 | 0 [0, 0] |
| small-local-bug | Full Palace - Route-only | Tool calls | 1 | 18 | 27 | 9 [9, 9] |
| small-local-bug | Full Palace - Route-only | Wall time | 1 | 194.4s | 219.6s | 25.1s [25.1s, 25.1s] |
| small-local-bug | Adaptive Palace - Control | Reported tokens | 1 | 1,061,212 | 308,898 | -752,314 [-752,314, -752,314] |
| small-local-bug | Adaptive Palace - Control | Uncached input tokens | 1 | 61,212 | 43,649 | -17,563 [-17,563, -17,563] |
| small-local-bug | Adaptive Palace - Control | Tool calls | 1 | 38 | 18 | -20 [-20, -20] |
| small-local-bug | Adaptive Palace - Control | Wall time | 1 | 487.6s | 223.7s | -264.0s [-264.0s, -264.0s] |
| small-local-bug | Adaptive Palace - Full Palace | Reported tokens | 1 | 444,867 | 308,898 | -135,969 [-135,969, -135,969] |
| small-local-bug | Adaptive Palace - Full Palace | Uncached input tokens | 1 | 41,257 | 43,649 | 2,392 [2,392, 2,392] |
| small-local-bug | Adaptive Palace - Full Palace | Palace context output bytes | 1 | 2,086 | 1,218 | -868 [-868, -868] |
| small-local-bug | Adaptive Palace - Full Palace | Palace context estimated tokens | 1 | 522 | 305 | -217 [-217, -217] |
| small-local-bug | Adaptive Palace - Full Palace | Tool calls | 1 | 27 | 18 | -9 [-9, -9] |
| small-local-bug | Adaptive Palace - Full Palace | Wall time | 1 | 219.6s | 223.7s | 4.1s [4.1s, 4.1s] |

Efficiency metrics are calculated only for mutually successful pairs. Raw values and bootstrap intervals are available in the JSON report.

This exploratory pilot does not guarantee that Vertex Palace is faster on every task.
