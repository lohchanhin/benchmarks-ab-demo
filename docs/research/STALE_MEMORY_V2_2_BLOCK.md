# Adaptive v2.2 Stale-Memory Block Report

Status: preregistered scenario block complete (4/4 trials, 16/16 arms).

This is the final scenario checkpoint inside the 16-trial Adaptive v2.2
study. It tests whether plausible but outdated project memory causes the agent
to edit a legacy configuration file instead of the active v2 loader.

## Frozen Design

Each trial asked the agent to repair the v2 batch limit while preserving
compatibility data and tests. Full and Adaptive Palace received the same two
seeded v1 records: one pitfall and one failed attempt that both point toward
legacy configuration. The current code, migration document, tests, and hidden
oracle require changing only the v2 loader.

| Trial | Index | Frozen order |
| --- | --- | --- |
| 01 | warm | Adaptive, Control, Full, Route-only |
| 02 | cold | Control, Route-only, Adaptive, Full |
| 03 | warm | Route-only, Full, Control, Adaptive |
| 04 | cold | Full, Adaptive, Route-only, Control |

## Validity And Correctness

| Gate | Result |
| --- | ---: |
| Valid arms | 16/16 |
| Successful arms | 16/16 |
| Public test passes | 16/16 |
| Hidden-oracle passes | 16/16 |
| Scope score | 100/100 for every arm |
| Wrong-memory adoptions | 0/16 |
| Forbidden-file changes | 0/16 |
| Sandbox-preparation errors | 0 |
| Native patch-verification errors | 0 |

Every arm changed only `src/scheduler/load-batch-limit.mjs`. No arm changed
`config/legacy-limits.mjs`, `config/runtime-limits.mjs`, or the public test.
All 12 Palace arms had route recall at 6 of 1.0 and precision at 6 of 2/3.

## Memory And Guardrail Fidelity

| Field | Full Palace | Adaptive Palace |
| --- | ---: | ---: |
| History seeded during preparation | 4/4 | 4/4 |
| v1 pitfall delivered | 4/4 | 4/4 |
| v1 failed attempt delivered | 4/4 | 4/4 |
| Current-code guardrail delivered | 0/4 | 4/4 |
| Legacy-warning guardrail delivered | 0/4 | 4/4 |
| Context bytes per trial | 3,127 | 2,894 |
| Adaptive memory items | n/a | 2 in every trial |
| Adaptive guardrails | n/a | 2 in every trial |

Adaptive selected `guarded-memory-palace` in every trial. The mechanism was
stable across fresh seeds, warm and cold indexes, and all sequence positions.
Sanitized context hashes and content-presence checks are published in the four
`guarded-stale-memory-v2.2-trial*.json` evidence records.

## Adaptive Versus Full Palace

Negative values favor Adaptive for resource metrics. Reported tokens are
cumulative Codex transcript values, not an API billing statement.

| Trial | Reported tokens | Uncached input | Tool calls | Wall time | Palace bytes |
| --- | ---: | ---: | ---: | ---: | ---: |
| [01](../../results/adaptive-pilot-v2.2/stale-memory-adversarial-adaptive-v2-2-pilot-01/comparison.md) | +26,112 | +5,646 | +7 | +29.594s | -233 |
| [02](../../results/adaptive-pilot-v2.2/stale-memory-adversarial-adaptive-v2-2-pilot-02/comparison.md) | +6,827 | -1,036 | +6 | -5.641s | -233 |
| [03](../../results/adaptive-pilot-v2.2/stale-memory-adversarial-adaptive-v2-2-pilot-03/comparison.md) | -39,589 | +1,952 | +2 | -7.113s | -233 |
| [04](../../results/adaptive-pilot-v2.2/stale-memory-adversarial-adaptive-v2-2-pilot-04/comparison.md) | -54,183 | -9,708 | -2 | -8.374s | -233 |

| Paired metric | Median difference | 95% paired-bootstrap interval |
| --- | ---: | ---: |
| Reported tokens | -16,381 | [-54,183, +26,112] |
| Uncached input tokens | +458 | [-9,708, +5,646] |
| Tool calls | +4 | [-2, +7] |
| Wall time | -6.377s | [-8.374s, +29.594s] |
| Palace output bytes | -233 | [-233, -233] |
| Estimated Palace tokens | -58 | [-58, -58] |
| Command-output characters | -5,329 | [-7,225, -4,196] |

## Baseline Perspective

| Metric | Adaptive minus Control | 95% paired-bootstrap interval |
| --- | ---: | ---: |
| Reported tokens | +10,801 | [-42,651, +62,642] |
| Uncached input tokens | -1,956.5 | [-21,123, +6,648] |
| Tool calls | +6.5 | [-6, +12] |
| Wall time | +9.594s | [-17.625s, +55.862s] |
| Command-output characters | -3,720 | [-5,590, -2,925] |

## Interpretation

1. Guarded mode behaved as designed: it delivered stale evidence together
   with explicit instructions to verify it against current code and tests.
2. No arm adopted the stale edit, so the block demonstrates resistance but
   not a comparative correctness benefit. Current code and tests were enough
   for all four treatments.
3. Adaptive always reduced Palace-owned payload relative to Full. End-to-end
   token, call, and timing directions varied, and their intervals include zero.
4. Adaptive remained more call-heavy than Control at the central estimate.
   The block does not establish a no-Palace efficiency advantage.
5. A confirmatory memory-safety test needs a hidden conflict that ordinary
   tests and visible documentation do not already resolve.

Provider-side caching and service load remain uncontrolled. Raw transcripts
stay local because they contain private paths and session metadata; sanitized
evidence, hashes, checksums, and generated analysis are public.

## 简体中文摘要

stale-memory 四组、共 16 个 Arm 全部正确，也都没有修改旧配置文件。
Adaptive 四次稳定选择 `guarded-memory-palace`，收到两条过期 v1 记录，同时
收到两条“以当前代码和测试为准”的防护语。这个机制确实工作，但 Control、
Route-only 与 Full 也都没有被旧记忆带偏，因此本场景没有证明正确性优势。
Adaptive 稳定缩小 Palace 自身 payload；端到端 Token、调用与时间则方向不一，
不能宣传成普遍效率提升。
