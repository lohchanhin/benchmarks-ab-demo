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

- Vertex Palace source commit:
  [`75be54a3e4570fb50f1a9f0304d017cb56e9a36b`](https://github.com/lohchanhin/vertex-palace/commit/75be54a3e4570fb50f1a9f0304d017cb56e9a36b)
- CI run:
  [29695231122](https://github.com/lohchanhin/vertex-palace/actions/runs/29695231122)
- Core: 64/64 tests
- CLI: 2/2 tests
- MCP: 2/2 tests
- TypeScript, build, clean tarball install, package CLI, and MCP smoke: pass

## Benchmark Evidence

- v3 plan: `frozen:false`
- v3 public manifest: 0/16 trials
- v3 fixture baseline: public pass / hidden-oracle fail
- v3 strict-scope regression: a correct result with 50% changed-file precision
  is not protocol success
- old v2.2 analysis: exactly reproducible after ignoring only `generatedAt`

## Remaining Freeze Gates

1. Finish the broader real-repository validation stage.
2. Publish immutable `vertex-palace@0.3.0` using interactive browser/device
   verification.
3. Update this repository and lockfile from 0.2.1 to the published 0.3.0.
4. Repeat the clean install, memory smoke, complete benchmark checks, and zero-
   outcome audit from a clean clone.
5. Change `frozen` to `true`, commit the reviewed plan, and create
   `protocol-v3.0.0` before any formal Agent run.

## 简体中文摘要

新的 fixture 第一次 smoke 找到 2 条 Aurora 记忆，却全部误判成
`scope_mismatch`，shared 还被放在 Primary。第一次修复后记忆变成 2/2，但
Support bucket 里的 shared step 仍显示 `tier: primary`。最终修复让 Aurora 成为
唯一 Primary、shared 成为 Support；两个 client 证据平手时仍全部拒绝。

这些都是冻结前工程验证，不是比赛结果。v3 计划仍为 `frozen:false`，manifest
仍是 0/16；在 npm 0.3.0 发布、真实仓库验证与协议 tag 完成前不会启动正式 Arm。
