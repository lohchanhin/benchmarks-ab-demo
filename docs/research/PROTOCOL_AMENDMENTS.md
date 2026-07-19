# Protocol Amendments

The protocol was frozen as version 1.0.0 at tag `protocol-v1.0.0` before new
four-scenario pilot data were collected.

## A-001: Post-Pilot Three-Arm And Power Reporting

- Date: 2026-07-19
- Author: project maintainer with Codex
- Timing disclosure: all 20 pilot outcomes had already been inspected.
- Reason: the frozen protocol specified Route-only as a secondary mechanism
  analysis but the original renderer summarized only Full Palace versus
  Control. It also requested an observed-discordance power estimate; all
  primary pairs were concordant successes, making that estimate undefined.
- Old analysis output: Full Palace versus Control scenario summaries and a
  null observed-effect sample-size field.
- New analysis output: the unchanged primary comparison plus exploratory
  Route-only-minus-Control and Full-Palace-minus-Route-only paired summaries;
  power planning uses an explicitly assumed discordance sensitivity grid and
  labels it as post-outcome planning rather than observed evidence.
- Affected data: all four scenarios and all 20 pilot trials are reanalyzed.
  No arm outcome, exclusion, fixture, metric definition, or raw evidence was
  changed or removed.
- Applicability: reporting and planning only; no new hypothesis test is used
  to upgrade an H1-H5 conclusion.
- Commit and tag: the completion commit tagged `pilot-v1-complete`.

## A-002: Post-Outcome Task-Transport Fidelity Check

- Date: 2026-07-19
- Author: project maintainer with Codex
- Timing disclosure: the command output and all four outcomes from
  `small-local-bug-adaptive-pilot-01` had already been inspected when this
  defect was discovered.
- Reason: the benchmark embedded the task in a PowerShell double-quoted
  command. PowerShell expanded `$0` in the required `$0.00` output, so the
  three Palace arms received `.00` while Control received the frozen task.
- Old task transport: `palace context "<task>"`, with no exact comparison
  between the frozen task and the task rendered by Palace.
- New task transport: `palace context '<task>'`, with embedded single quotes
  escaped as `''`. Verification extracts the `## Task` value from captured
  Palace output and requires exact equality with the frozen manifest task.
- Affected run: `small-local-bug-adaptive-pilot-01`. Its raw transcripts and
  generated evidence are retained. Control remains individually valid;
  Route-only, Full Palace, and Adaptive Palace are reclassified invalid for
  treatment fidelity, and the run is not eligible for any cross-arm
  efficiency comparison.
- Outcome handling: no duration, token, tool-call, correctness, or scope value
  was edited or removed. The regenerated report sets `comparable` to `false`
  and all comparative deltas to `null`.
- Applicability: the correction applies only to a fresh successor protocol
  with new trial ids and seeds. The frozen `protocol-v2.0.0` tag and its plan
  are not rewritten, and the invalid run will not be silently rerun.
- Commit and tag: task-fidelity correction frozen at `protocol-v2.1.0`
  before any successor agent execution.

## Successor Protocol Disclosure

Protocol v2.0.0 is a new preregistered treatment study, not an amendment that
changes v1 outcomes. It adds Adaptive Palace, a fourth arm, payload metrics,
Williams order balance, and warm/cold local-index strata. The v1 protocol,
plans, evidence, and published analyses remain unchanged. See
[`PROTOCOL_V2.md`](./PROTOCOL_V2.md).

Protocol v2.1.0 supersedes v2.0.0 for future execution because A-002 changes
task transport and validity checks after one v2.0.0 outcome was seen. It must
use fresh trial ids and seeds and be frozen under a new tag before execution.

## Amendment Template

Each future entry must contain:

- amendment id and date;
- author;
- reason discovered without consulting affected outcome data, or an explicit
  statement that outcome data had already been inspected;
- exact old and new text;
- affected scenarios and first applicable trial id;
- whether prior runs are retained, reanalyzed, or marked incompatible;
- commit and tag containing the amendment.
