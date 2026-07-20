# Vertex Palace Control-First Exploratory Analysis

Planned pilot trials: 16
Attempted trials: 3
Loaded reports: 3

Interim only: 3/16 planned trials are represented. Do not interpret these intervals or p-values as final evidence.

Primary comparison: Adaptive Palace versus Control
Primary efficiency metric: cumulative reported tokens

| Scenario | Primary comparison | Valid pairs | Baseline success | Treatment success | Treatment minus baseline (95% bootstrap CI) | Exact p | Holm p |
| --- | --- | ---: | ---: | ---: | --- | ---: | ---: |
| small-local-bug | Adaptive Palace - Control | 3 | 100.0% | 100.0% | 0.0% [0.0%, 0.0%] | 1.0000 | 1.0000 |

## Mutually Successful Pair Efficiency

Paired differences are primary treatment minus primary baseline. Negative values mean the treatment used less of the measured resource; wall time remains secondary.

| Scenario | Metric | Pairs | Baseline median | Treatment median | Paired median difference (95% bootstrap CI) |
| --- | --- | ---: | ---: | ---: | --- |
| small-local-bug | Reported tokens | 3 | 87,353 | 86,547 | -806 [-2,081, 38] |
| small-local-bug | Uncached input tokens | 3 | 11,718 | 12,151 | 3,370 [-4,276, 19,060] |
| small-local-bug | Tool calls | 3 | 4 | 6 | 1 [0, 2] |
| small-local-bug | Wall time | 3 | 41.1s | 44.0s | -2.5s [-4.8s, 3.0s] |

## Four-Arm Control-First Contrasts

Each contrast is treatment minus baseline. Negative efficiency values favor the treatment. These secondary mechanism contrasts are exploratory and are not multiplicity-adjusted.

| Scenario | Contrast | Metric | Pairs | Baseline median | Treatment median | Paired median difference (95% bootstrap CI) |
| --- | --- | --- | ---: | ---: | ---: | --- |
| small-local-bug | Adaptive Palace - Control | Reported tokens | 3 | 87,353 | 86,547 | -806 [-2,081, 38] |
| small-local-bug | Adaptive Palace - Control | Uncached input tokens | 3 | 11,718 | 12,151 | 3,370 [-4,276, 19,060] |
| small-local-bug | Adaptive Palace - Control | Tool calls | 3 | 4 | 6 | 1 [0, 2] |
| small-local-bug | Adaptive Palace - Control | Wall time | 3 | 41.1s | 44.0s | -2.5s [-4.8s, 3.0s] |
| small-local-bug | Adaptive Palace - Full Palace | Reported tokens | 3 | 106,902 | 86,547 | -20,840 [-36,568, -17,975] |
| small-local-bug | Adaptive Palace - Full Palace | Uncached input tokens | 3 | 9,947 | 12,151 | -1,844 [-14,614, 21,001] |
| small-local-bug | Adaptive Palace - Full Palace | Palace context output bytes | 3 | 1,870 | 259 | -1,611 [-1,611, -1,611] |
| small-local-bug | Adaptive Palace - Full Palace | Palace context estimated tokens | 3 | 468 | 65 | -403 [-403, -403] |
| small-local-bug | Adaptive Palace - Full Palace | Tool calls | 3 | 8 | 6 | -2 [-5, 1] |
| small-local-bug | Adaptive Palace - Full Palace | Wall time | 3 | 57.7s | 44.0s | -13.6s [-14.3s, -5.6s] |
| small-local-bug | Route-only - Control | Reported tokens | 3 | 87,353 | 105,541 | 17,301 [16,909, 34,918] |
| small-local-bug | Route-only - Control | Uncached input tokens | 3 | 11,718 | 10,986 | 1,246 [-732, 5,556] |
| small-local-bug | Route-only - Control | Tool calls | 3 | 4 | 6 | 2 [1, 3] |
| small-local-bug | Route-only - Control | Wall time | 3 | 41.1s | 50.0s | 8.2s [-1.9s, 9.0s] |
| small-local-bug | Full Palace - Route-only | Reported tokens | 3 | 105,541 | 106,902 | -1,015 [-14,040, 18,461] |
| small-local-bug | Full Palace - Route-only | Uncached input tokens | 3 | 10,986 | 9,947 | -1,209 [-7,988, 16,738] |
| small-local-bug | Full Palace - Route-only | Palace context output bytes | 3 | 1,870 | 1,870 | 0 [0, 0] |
| small-local-bug | Full Palace - Route-only | Palace context estimated tokens | 3 | 468 | 468 | 0 [0, 0] |
| small-local-bug | Full Palace - Route-only | Tool calls | 3 | 6 | 8 | 3 [-3, 3] |
| small-local-bug | Full Palace - Route-only | Wall time | 3 | 50.0s | 57.7s | 7.6s [-5.1s, 11.5s] |

## Scope Outcomes Across Valid Primary Pairs

Scope is summarized for every valid Adaptive-Control pair, including runs that did not achieve protocol success.

| Scenario | Arm | Median changed-file precision | Median changed-file recall | Forbidden violations | Discordant success trial IDs |
| --- | --- | ---: | ---: | ---: | --- |
| small-local-bug | Control | 100.0% | 100.0% | 0 | none |
| small-local-bug | Adaptive Palace | 100.0% | 100.0% | 0 | none |

Efficiency metrics are calculated only for mutually successful pairs. Raw values and bootstrap intervals are available in the JSON report.

This exploratory pilot does not guarantee that Vertex Palace is faster on every task.
