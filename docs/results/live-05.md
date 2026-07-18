# Verified Paired Run: live-05

Date: 2026-07-18

This is a real paired execution produced by the benchmark harness. Raw Codex
transcripts remain private because they contain local filesystem paths. The
comparison below is generated from the sanitized evidence layer.

## Environment

- Scenario: `tenant-theme-regression`
- Shared Git tree: `89dfede1a2381fb4aee25ba929b774b1ee9675bb`
- Generated fixture files: 240
- Model: `gpt-5.6-sol`
- Codex CLI: `0.145.0-alpha.18`
- Vertex Palace: `0.1.4`
- Node.js: `24.13.1`
- Host: Windows

## Task

Fix the Aurora article hero contrast regression while preserving the appearance
of every other tenant. The renderer must honor an explicit tenant text-color
override, the Aurora hero must meet WCAG AA contrast, and the complete test
suite must pass. Tests may not be weakened or rewritten.

## Results

| Metric | Control | Vertex Palace | Control minus Palace |
| --- | ---: | ---: | ---: |
| Tests passed | yes | yes | - |
| Correctness/scope score | 100/100 | 100/100 | - |
| Arm valid | yes | yes | - |
| Elapsed time | 61.2s | 166.6s | -105.3s |
| Recorded command/tool calls | 5 | 18 | -13 |
| Failed recorded calls | 1 | 5 | -4 |
| Codex router errors in stderr | 3 | 7 | -4 |
| Inspection commands | 3 | 3 | 0 |
| Files named in commands | 9 | 9 | 0 |
| Distinct repository path strings observed | 240 | 13 | +227 |
| Command output characters | 27,180 | 29,276 | -2,096 |
| Cumulative input tokens | 154,623 | 440,133 | -285,510 |
| Cached input tokens | 126,976 | 377,088 | -250,112 |
| Uncached input tokens | 27,647 | 63,045 | -35,398 |
| Output tokens | 1,667 | 4,041 | -2,374 |
| Cumulative reported tokens | 156,290 | 444,174 | -287,884 |
| Successful Palace calls | 0 | 7 | - |

Both arms changed exactly:

- `clients/aurora/theme.mjs`
- `src/rendering/article-page.mjs`

Neither arm changed shared theme defaults or tests.

## Interpretation

For this run, Vertex Palace did not improve measured efficiency. It added 105.3
seconds, 13 recorded calls, four failed calls, 2,096 command-output characters,
35,398 uncached input tokens, and 287,884 cumulative reported tokens. Both arms
still reached the same correct, narrowly scoped implementation.

The `240` and `13` values are distinct path strings observed in transcript
events. They are not files read. Control used an inventory command that printed
the generated repository paths, which made this number large without proving
that Codex loaded all 240 file contents.

## Postmortem and corrective action

The Palace arm ran second; both arms were sequential, not concurrent. Its
transcript shows the old multi-step startup flow plus retries: 18 recorded
calls with five failed calls, versus 5 and one for Control. Repeated lifecycle
output was then carried through later model turns, explaining why a narrow
route could coexist with higher cumulative input usage and longer elapsed time.

Vertex Palace 0.1.6 replaces routine `status -> index -> route -> pack` startup
with one `palace context` call. The benchmark now records execution order,
failed calls, stderr router errors, command-output characters, and cached versus
uncached input tokens. Follow-up pairs must use fresh workspaces, alternate arm
order, and publish medians before making a performance claim.

This result supports a narrow claim about one paired run on one generated
scenario. It does not establish universal savings. Follow-up experiments
should repeat the pair at least three times, alternate arm order, and report
the median as described in [METHODOLOGY.md](../../METHODOLOGY.md).

## Evidence rules

- Control transcript: zero Palace commands.
- Palace transcript: seven successfully completed Palace commands.
- Both workspaces started from the same recorded Git tree.
- The harness verifier, outside the agent sandbox, ran the same complete test
  command against both final worktrees.
- Token values came from Codex JSONL usage events and are cumulative usage, not
  billing totals.
- Named files and observed path strings are transcript-derived proxies, not an
  operating-system file-access audit.
