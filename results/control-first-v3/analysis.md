# Vertex Palace Control-First Exploratory Analysis

Planned pilot trials: 16
Attempted trials: 1
Loaded reports: 1

Interim only: 1/16 planned trials are represented. Do not interpret these intervals or p-values as final evidence.

Primary comparison: Adaptive Palace versus Control
Primary efficiency metric: cumulative reported tokens

| Scenario | Primary comparison | Valid pairs | Baseline success | Treatment success | Treatment minus baseline (95% bootstrap CI) | Exact p | Holm p |
| --- | --- | ---: | ---: | ---: | --- | ---: | ---: |
| small-local-bug | Adaptive Palace - Control | 1 | 100.0% | 100.0% | 0.0% [0.0%, 0.0%] | 1.0000 | 1.0000 |

## Mutually Successful Pair Efficiency

Paired differences are primary treatment minus primary baseline. Negative values mean the treatment used less of the measured resource; wall time remains secondary.

| Scenario | Metric | Pairs | Baseline median | Treatment median | Paired median difference (95% bootstrap CI) |
| --- | --- | ---: | ---: | ---: | --- |
| small-local-bug | Reported tokens | 1 | 87,353 | 86,547 | -806 [-806, -806] |
| small-local-bug | Uncached input tokens | 1 | 8,781 | 12,151 | 3,370 [3,370, 3,370] |
| small-local-bug | Tool calls | 1 | 4 | 6 | 2 [2, 2] |
| small-local-bug | Wall time | 1 | 51.9s | 47.1s | -4.8s [-4.8s, -4.8s] |

## Four-Arm Control-First Contrasts

Each contrast is treatment minus baseline. Negative efficiency values favor the treatment. These secondary mechanism contrasts are exploratory and are not multiplicity-adjusted.

| Scenario | Contrast | Metric | Pairs | Baseline median | Treatment median | Paired median difference (95% bootstrap CI) |
| --- | --- | --- | ---: | ---: | ---: | --- |
| small-local-bug | Adaptive Palace - Control | Reported tokens | 1 | 87,353 | 86,547 | -806 [-806, -806] |
| small-local-bug | Adaptive Palace - Control | Uncached input tokens | 1 | 8,781 | 12,151 | 3,370 [3,370, 3,370] |
| small-local-bug | Adaptive Palace - Control | Tool calls | 1 | 4 | 6 | 2 [2, 2] |
| small-local-bug | Adaptive Palace - Control | Wall time | 1 | 51.9s | 47.1s | -4.8s [-4.8s, -4.8s] |
| small-local-bug | Adaptive Palace - Full Palace | Reported tokens | 1 | 123,115 | 86,547 | -36,568 [-36,568, -36,568] |
| small-local-bug | Adaptive Palace - Full Palace | Uncached input tokens | 1 | 26,765 | 12,151 | -14,614 [-14,614, -14,614] |
| small-local-bug | Adaptive Palace - Full Palace | Palace context output bytes | 1 | 1,870 | 259 | -1,611 [-1,611, -1,611] |
| small-local-bug | Adaptive Palace - Full Palace | Palace context estimated tokens | 1 | 468 | 65 | -403 [-403, -403] |
| small-local-bug | Adaptive Palace - Full Palace | Tool calls | 1 | 8 | 6 | -2 [-2, -2] |
| small-local-bug | Adaptive Palace - Full Palace | Wall time | 1 | 61.4s | 47.1s | -14.3s [-14.3s, -14.3s] |
| small-local-bug | Route-only - Control | Reported tokens | 1 | 87,353 | 104,654 | 17,301 [17,301, 17,301] |
| small-local-bug | Route-only - Control | Uncached input tokens | 1 | 8,781 | 10,027 | 1,246 [1,246, 1,246] |
| small-local-bug | Route-only - Control | Tool calls | 1 | 4 | 5 | 1 [1, 1] |
| small-local-bug | Route-only - Control | Wall time | 1 | 51.9s | 50.0s | -1.9s [-1.9s, -1.9s] |
| small-local-bug | Full Palace - Route-only | Reported tokens | 1 | 104,654 | 123,115 | 18,461 [18,461, 18,461] |
| small-local-bug | Full Palace - Route-only | Uncached input tokens | 1 | 10,027 | 26,765 | 16,738 [16,738, 16,738] |
| small-local-bug | Full Palace - Route-only | Palace context output bytes | 1 | 1,870 | 1,870 | 0 [0, 0] |
| small-local-bug | Full Palace - Route-only | Palace context estimated tokens | 1 | 468 | 468 | 0 [0, 0] |
| small-local-bug | Full Palace - Route-only | Tool calls | 1 | 5 | 8 | 3 [3, 3] |
| small-local-bug | Full Palace - Route-only | Wall time | 1 | 50.0s | 61.4s | 11.5s [11.5s, 11.5s] |

## Scope Outcomes Across Valid Primary Pairs

Scope is summarized for every valid Adaptive-Control pair, including runs that did not achieve protocol success.

| Scenario | Arm | Median changed-file precision | Median changed-file recall | Forbidden violations | Discordant success trial IDs |
| --- | --- | ---: | ---: | ---: | --- |
| small-local-bug | Control | 100.0% | 100.0% | 0 | none |
| small-local-bug | Adaptive Palace | 100.0% | 100.0% | 0 | none |

Efficiency metrics are calculated only for mutually successful pairs. Raw values and bootstrap intervals are available in the JSON report.

This exploratory pilot does not guarantee that Vertex Palace is faster on every task.
