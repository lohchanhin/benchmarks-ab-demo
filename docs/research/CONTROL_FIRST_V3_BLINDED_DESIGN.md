# Control-First v3 Blinded Fixture Design

Date: 2026-07-20 (UTC+08:00)

Status: implementation and targeted-test evidence only. The formal plan remains
`frozen:false`, its blinding-key commitment is intentionally empty, and no new
Agent arm was run.

[Simplified Chinese](../zh-CN/CONTROL_FIRST_V3_BLINDED_DESIGN.md) |
[Machine evidence](./evidence/control-first-v3-blinded-design-2026-07-20.json)

## Why The Fixture Changed

The first memory-dependent preflight always used Aurora. That run was useful
for finding harness defects, but repeated naming made Aurora a plausible guess
for Control. A public seed-only hash would not solve the problem: with three
candidates, anyone could enumerate every assignment.

Aurora, Borealis, and Cedar are fictional tenants, not models or difficulty
levels. In the revised fixture all three expose the same plausible baseline.
The public task names only an independently governed launch tenant.

## Blinded Assignment

Each public seed selects one of three anonymous strata. A private 32-byte key
creates a deterministic HMAC-ranked permutation from those strata to the three
tenant names. The four draft memory trials cover strata `1, 2, 0, 2`, so every
candidate is represented after any permutation while one candidate necessarily
repeats.

Before protocol freeze, the plan must publish the key's SHA-256 commitment.
Each prepared run stores its stratum, key commitment, and HMAC assignment
commitment, but never the owner or key. Memory-bearing arms receive the owner
through scoped project history; the hidden oracle receives the same resolved
owner. Control and Route-only do not.

The key is removed from Codex, Palace, public-test, and oracle subprocess
environments. After all formal outcomes are locked, publishing the key lets an
independent reviewer reconstruct every assignment and verify the commitments.
Fixed keys visible in unit tests and the fixture checker are non-secret test
vectors and are explicitly ineligible for formal execution.

## Prompt-Matched Execution Boundary

All four arms now receive the same instruction to avoid repository inventory
when direct evidence is sufficient and to stop when behavior is fixed, the
complete tests pass, the Git diff is task-only, and no relevant conflict
remains. Adaptive alone receives the treatment-specific instruction to obey a
`bypass` Primary candidate unless code, tests, or runtime evidence contradicts
it.

## Verification

Targeted tests pass 24/24. They cover all three owner assignments,
public-pass/oracle-fail baselines, one-file canonical repairs, wrong-key
rejection, prompt non-disclosure, all-strata plan coverage, and key scrubbing
from every Codex arm. The complete repository gate also passes 62/62 tests, all
five fixture contracts, every retained result checksum/privacy audit, and the
v2.2 analysis reproduction. The v3 public manifest remains 0/16. The draft
cannot be validated as frozen until a real key commitment replaces `null`.

## Claim Boundary And Next Gates

This correction improves experimental validity; it is not evidence that Vertex
Palace saves Token, time, or calls. The earlier descriptive preflight remains
unchanged: bypass was compact but slower than Control, while one guarded-memory
run was faster and smaller but did not produce Control-fail / Adaptive-pass.

Palace's closeout evaluation also remains negative for broad maintenance. The
default 10-file route matched 6/31 changed files (coverage 0.19, focus 0.60,
confidence 0.35, `needs-review`). Expanding to a 40-file limit matched 15/31
(coverage 0.48, focus 0.63) but still missed the scenario contract, both oracle
files, several runner boundaries, and all focused regression tests. The smaller
estimated context pack is not treated as end-to-end Agent savings.

Next: pass the complete repository checks, publish this stage, finish immutable
Palace 0.3.0 and real-repository gates, create and commit only the formal key
commitment, freeze and tag the still-empty plan, then run fresh sequential arms.
