# Real-repository V4 execution freeze

Status: owner-reviewed and frozen. Execution gate: **10/10 passed**. Formal
Agent arms run at freeze time: **0/32**.

This amendment closes the gap between the frozen V4 research design and the
executable runner. It records the exact code, product artifact, Agent runtime,
dependency profile, verification baselines, and privacy boundary that must be
revalidated before every formal arm.

## Bound execution identity

- Runner source commit: `54a4ea0d819088e6f1bcc47cdcc6d2d8a8c9b214`.
- Runner source SHA-256: `3b9a8f8b01f08d1fc2f0d120f6f78ecaac638f5814f0140248532d4203fa90e1`.
- Vertex Palace source commit: `322b15ec6cbbbc9c86f0a03e54e7a13ebf050c5e`.
- Packed product SHA-256: `1b042d3816f66108825bfecd44e5f4ac05cea0dec777ea424c866b8196187b09`.
- Execution profile SHA-256: `98a5417aae286f7fdc04951783dfb6b4ed0b789b6bcc90be8a879715bed24af6`.
- Private evaluator source SHA-256: `667daedc0b47b94f121085d6ced431d03aeee6b07c5af6297eb4b3b155532788`.
- Codex CLI `0.145.0-alpha.28`, model `gpt-5.6-sol`, and `xhigh` reasoning.
- Fresh detached workspaces, ignored user rules/config, and Agent network access
  disabled.

The exact Node, npm, pnpm, Python, uv, upstream dependency, baseline, and
platform-adaptation facts are embedded in
`protocol/v4/execution.binding.frozen.json`.

## Freeze gate

All ten checks passed: binding structure, frozen-study identity, private-oracle
commitment, blinded-key commitment, runner identity, product artifact, Codex
runtime, execution profile, owner review, and an empty formal result state.
The public repository contains commitments and hashes, not the oracle, arm
mapping, private reference resolutions, raw transcripts, or local paths.

The receipt is an owner authorization after a Codex technical audit. It is
explicitly **not** represented as independent third-party review.

## Reproduce the public audit

```powershell
npm ci
node --test test/v4-execution-artifacts.test.mjs
npm run check
```

Formal execution uses result-only descendant commits under
`results/real-repository-v4/`. It starts with an empty blinded ledger, then a
no-Agent dependency dry run, and only then the 16 paired trials. Runtime checks
recompute the frozen binding and fail closed if runner code, hashes, private
commitments, environment facts, or unrelated repository files change.

Passing this freeze is not evidence that Vertex Palace improves correctness,
scope, time, or Token use. Those claims remain unanswered until formal results
are complete, unblinded, and analyzed under the frozen statistics plan.
