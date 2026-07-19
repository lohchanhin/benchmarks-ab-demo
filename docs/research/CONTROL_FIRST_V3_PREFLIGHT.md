# Control-First v3 Preflight Record

Date: 2026-07-20 (UTC+08:00)

Status: engineering evidence only; **not a formal Agent trial**.

This record preserves the product and harness work performed before the v3
plan can be frozen. No Control, Route-only, Full, or Adaptive Codex arm was
started, and the public v3 result manifest remains empty.

## Fixture Gate

The new `decision-memory-dependent` fixture has 142 deterministic files. Its
baseline and canonical repair satisfy the intended information boundary:

| State | Public tests | Hidden oracle |
| --- | --- | --- |
| Unmodified baseline | pass | fail |
| Canonical one-file Aurora repair | pass | pass |

Public tests verify only the generic resolver contract. They do not identify
the launch tenant or enforce its contrast. The hidden oracle verifies Aurora
WCAG AA contrast and unchanged shared, Borealis, and Cedar behavior.

## Smoke 1: Failure Found

The local Palace 0.3.0 candidate initialized and seeded both Full and Adaptive
workspaces successfully. Adaptive then produced:

- mode: `guarded-memory-palace`;
- memory candidates: 2;
- memory included: 0;
- exclusions: 2 x `scope_mismatch`;
- static Primary: `src/themes/shared-article-tokens.mjs`;
- Aurora token: Deferred.

The task used the historical business alias "independently governed launch
tenant" while the record had `client=aurora`. Literal-only scope matching
discarded both relevant records.

## Smoke 2: Retrieval Fixed, Boundary Conflict Found

The first product correction conservatively inferred Aurora from four unique
alias tokens: `contrast`, `governed`, `independently`, and `launch`. Retrieval
became 2/2 with zero exclusions. The route bucket moved shared context to
Support, but the nested step still rendered `tier: primary`. This second defect
was retained and fixed rather than ignored.

## Smoke 3: Product Contract Passed

The final source and clean-tarball smoke report:

| Signal | Result |
| --- | --- |
| Selected mode | `guarded-memory-palace` |
| Memory | 2 candidates, 2 included, 0 excluded |
| Scope inference | `aurora` / `unique_historical_alias_match` |
| Primary | `clients/aurora/article-tokens.mjs` only |
| Shared token | Support |
| Ambiguous two-client tie | both excluded as `scope_mismatch` |
| Installed MCP | 10 tools, smoke passed |

The clean installed package also preserved four 3-field bypass trials and the
existing relevant-memory Full Palace contract.

## Product Evidence

- Vertex Palace candidate source commit:
  [`cb93369c642135d3d924166bff62b0eaf0cacde1`](https://github.com/lohchanhin/vertex-palace/commit/cb93369c642135d3d924166bff62b0eaf0cacde1)
- Machine-evidence commit:
  [`bcc43801af5acb25b53c5dad909aa200c95c4d91`](https://github.com/lohchanhin/vertex-palace/commit/bcc43801af5acb25b53c5dad909aa200c95c4d91)
- Candidate and evidence CI runs:
  [29697901796](https://github.com/lohchanhin/vertex-palace/actions/runs/29697901796),
  [29697990804](https://github.com/lohchanhin/vertex-palace/actions/runs/29697990804)
- [Machine-readable real-repository evidence](https://github.com/lohchanhin/vertex-palace/blob/bcc43801af5acb25b53c5dad909aa200c95c4d91/docs/research/evidence/real-repository-validation-0.3.0.json)
- [Machine-readable clean-install evidence](https://github.com/lohchanhin/vertex-palace/blob/bcc43801af5acb25b53c5dad909aa200c95c4d91/docs/research/evidence/release-candidate-0.3.0.json)
- [Bilingual context-ceiling incident record](https://github.com/lohchanhin/vertex-palace/blob/bcc43801af5acb25b53c5dad909aa200c95c4d91/docs/research/ADAPTIVE_CONTEXT_CEILING_0_3_0.md)
- Core: 72/72 tests
- CLI: 2/2 tests
- MCP: 2/2 tests
- TypeScript, build, clean tarball install, package CLI, and MCP smoke: pass

Pinned Zod and Requests validation retrieved both known targets in both
repetitions, with deterministic boundaries and clean tracked worktrees. Each
repository had target recall 1.000 and strict target precision 1.000, with no
extra boundary files. The clean installed package also kept 50 memory
candidates auditable while delivering JSON at 4,038 / 5,000 estimated tokens
and Markdown at 4,473 / 5,000. Product self-evaluation still exposes a broader
limitation: the earlier 25-file task matched only 5 files and was overconfident
by 0.51; the latest six-file revision matched 4/6 at confidence 0.35 but missed
the regression test and generated MCP bundle. These are routing and packaging
findings, not evidence of lower Agent tokens or wall time.

## Benchmark Evidence

- v3 plan: `frozen:false`
- v3 public manifest: 0/16 trials
- v3 fixture baseline: public pass / hidden-oracle fail
- v3 strict-scope regression: a correct result with 50% changed-file precision
  is not protocol success
- old v2.2 analysis: exactly reproducible after ignoring only `generatedAt`
- Palace evaluation of this final evidence-pin update matched 3/8 changed
  files: 38% coverage, 30% route focus, confidence 0.78, and overconfidence
  error 0.40. It found the plan, generator, and preflight record, but missed the
  matching study test, both protocol documents, and both README surfaces.
  Exact-reference inspection was still required.

## Remaining Freeze Gates

1. Publish immutable `vertex-palace@0.3.0` using interactive browser/device
   verification.
2. Update this repository and lockfile from 0.2.1 to the published 0.3.0.
3. Repeat the clean install, memory smoke, complete benchmark checks, and zero-
   outcome audit from a clean clone.
4. Change `frozen` to `true`, commit the reviewed plan, and create
   `protocol-v3.0.0` before any formal Agent run.

## 简体中文摘要

新的 fixture 第一次 smoke 找到 2 条 Aurora 记忆，却全部误判成
`scope_mismatch`，shared 还被放在 Primary。第一次修复后记忆变成 2/2，但
Support bucket 里的 shared step 仍显示 `tier: primary`。最终修复让 Aurora 成为
唯一 Primary、shared 成为 Support；两个 client 证据平手时仍全部拒绝。

真实 Zod 与 Requests 仓库各重复两次，都只返回已知实现和测试，目标召回率与严格
精度均为 1.000，没有额外边界文件。干净安装包在 50 条记忆候选下，JSON 为
4,038 / 5,000 estimated tokens，Markdown 为 4,473 / 5,000，并保留所有候选的
纳入或排除原因。产品对宽任务的自评仍不完整：旧任务只覆盖 5/25；最新六文件修正
覆盖 4/6，仍漏掉回归测试与生成后的 MCP bundle。这些都是冻结前工程验证，不是
比赛结果，也不能证明节省 Agent Token 或时间。

本 benchmark 最终更新证据 pin 时也出现同类问题：Palace 只覆盖 3/8 个实际改动文件，
覆盖率 38%、路线聚焦度 30%，却给出 0.78 置信度，过度自信误差 0.40。它命中计划、
生成器与 preflight，但漏掉对应测试、两份协议和两份 README，仍需精确引用补齐。

v3 计划仍为 `frozen:false`，manifest 仍是 0/16；真实仓库门槛已经完成，但在 npm
0.3.0 发布与协议 tag 完成前不会启动正式 Arm。
