# Vertex Palace A/B Benchmark

[![CI](https://github.com/lohchanhin/benchmarks-ab-demo/actions/workflows/ci.yml/badge.svg)](https://github.com/lohchanhin/benchmarks-ab-demo/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A public, reproducible benchmark for comparing Codex repository work with and
without [Vertex Palace](https://github.com/lohchanhin/vertex-palace).

[Simplified Chinese](README.zh-CN.md) | [Methodology](METHODOLOGY.md) | [Demo guide](DEMO.md)

## Verified multi-run result

The complete three-pair GPT-5.6-sol result is available at
[docs/results/v0.1.6-three-pairs.md](docs/results/v0.1.6-three-pairs.md). All six
arms passed with a 100/100 scope score. Palace used lower cumulative reported
tokens in all three pairs and was faster in two, but its median uncached input
was higher. Every pair, execution order, and the conservative median paired
delta are reported.

The earlier [live-05 postmortem](docs/results/live-05.md) records a real losing
Palace run. Its repeated lifecycle commands directly motivated the one-call
workflow in Vertex Palace 0.1.6; it remains public rather than being hidden.

## Why this exists

Claims about context routing are easy to exaggerate. This repository creates
two disposable workspaces from the same Git tree, gives both Codex arms the
same engineering task, and records evidence from Codex JSONL, Git diff, and a
real test suite.

The Control arm uses normal repository exploration. The Palace arm starts with
one `palace context` call, which refreshes the index when needed, routes the
task, and returns a compact pack containing relevant pitfalls. Both arms must
solve the same task and pass the same tests.

## What is measured

- Test result and changed-file scope
- Elapsed Codex execution time
- Tool, failed-call, and inspection command counts
- Codex router errors captured from stderr
- Repository files explicitly named in Codex command invocations
- Distinct repository path strings observed anywhere in the transcript
- Command-output character counts as a context-volume proxy
- Cumulative input, cached input, uncached input, and output tokens reported by Codex
- Control-arm absence and Palace-arm presence of Palace calls
- Optional Vertex Palace route evaluation

Speed and token counts do not affect the correctness score. See
[METHODOLOGY.md](METHODOLOGY.md) for definitions and limitations.

## Included scenario

`tenant-theme-regression` generates a dependency-free, 240-file multi-tenant
JavaScript repository. The task has two independent root causes:

1. Aurora contains a low-contrast tenant color.
2. The renderer ignores an explicit tenant text-color override.

Changing the shared theme or weakening the tests is forbidden. The Palace arm
also receives a realistic prior failure: a shared-theme shortcut previously
changed unrelated tenants.

## Requirements

- Node.js 20 or newer
- Git
- An authenticated Codex CLI

Vertex Palace `0.1.6` is installed locally by `npm ci`; a global Palace install
is not required for the harness.

## Quick start

```sh
git clone https://github.com/lohchanhin/benchmarks-ab-demo.git
cd benchmarks-ab-demo
npm ci
npm run benchmark -- doctor
npm run benchmark -- prepare --run-id demo-01
npm run benchmark -- run --run-dir .benchmark-runs/demo-01 --arm both --order control-first --model gpt-5.6-sol
npm run benchmark -- report --run-dir .benchmark-runs/demo-01
```

Arms run sequentially, never concurrently. For evidence intended for public
claims, run at least three fresh pairs, alternate `--order control-first` and
`--order palace-first`, publish every pair, and compare medians.

On Windows, when the Store alias for `codex.exe` cannot be launched from a
child process, pass the real CLI path:

```powershell
npm run benchmark -- doctor --codex-bin "$env:CODEX_CLI_PATH"
npm run benchmark -- run --run-dir .benchmark-runs/demo-01 --arm both --codex-bin "$env:CODEX_CLI_PATH"
```

`doctor` reports the exact component that is missing before a paid model run
starts.

The Build Week model is presented as GPT-5.6. In the current Codex CLI for a
ChatGPT account, its accepted command-line identifier is `gpt-5.6-sol`; the
plain `gpt-5.6` identifier returns an unsupported-model error.

## Manual mode

`prepare` writes `INSTRUCTIONS.md` plus separate Control and Palace prompts.
You can open each generated workspace in a fresh Codex task, use the same model
and reasoning settings, and then run:

```sh
npm run benchmark -- verify --run-dir .benchmark-runs/demo-01 --arm both
npm run benchmark -- report --run-dir .benchmark-runs/demo-01
```

Manual runs can prove correctness and Git scope. Copy Codex `--json` output to
the run's `artifacts/*-transcript.jsonl` files when transcript-level efficiency
metrics are also required.

## Artifacts

```text
.benchmark-runs/demo-01/
  manifest.json
  INSTRUCTIONS.md
  prompts/
  arms/
    control/
    palace/
  artifacts/
    control-transcript.jsonl
    palace-transcript.jsonl
    control-evidence.json
    palace-evidence.json
  reports/
    comparison.md
    comparison.json
```

Runs are gitignored because transcripts may contain local paths and session
metadata. Publish only reviewed reports.

## Scoring

Each arm receives up to 100 correctness/scope points:

- 60: complete test suite passes
- 20: both expected root-cause files are changed
- 20: no forbidden or unrelated files are changed and `git diff --check` passes

The report does not manufacture a winner. An arm that violates its mode, fails
tests, or starts from a different tree is marked invalid or receives a lower
score.

## Development

```sh
npm test
npm run test:fixture
npm run check
```

The fixture check proves that the untouched baseline fails and the canonical
two-file repair passes. The project is licensed under the [MIT License](LICENSE).
