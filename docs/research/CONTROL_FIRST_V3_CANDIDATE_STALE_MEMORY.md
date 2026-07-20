# Candidate Validation: Stale-Memory Block

Status: **stale-memory 4/4 trials complete; 16/16 arms valid and successful**.

This completed the non-formal candidate study at 16/16 trials and 64 attempted
arms. Across the whole study, 63 arms were valid and 58 were successful. The
only invalid arm remains the previously disclosed small-local network-startup
incident.

## Integrity and infrastructure

- All preregistered IDs, seeds, cache states, and Williams orders were used.
- The system-awake guard remained active for the block and exited cleanly.
- All 128 public evidence files pass checksum and privacy audit.
- Arms ran sequentially; no concurrent execution affected the comparison.

## Correctness and stale-memory behavior

Control, Route-only, Full, and Adaptive each passed the public tests and hidden
Oracle in all four trials. Every arm changed only the scheduler loader, with
changed-file precision and recall of `1.0 / 1.0`. No arm modified the preserved
v1 compatibility data.

Adaptive selected `guarded-memory-palace` four times and never adopted the
obsolete v1 instruction. Each payload contained two v1 memory items, two
guardrails, and no excluded memory. The context explicitly scoped the memories
to `scheduler-v1`, instructed the Agent to treat stale or legacy evidence as a
warning, and required current code and tests to resolve the conflict.

This is a behavioral safety success, but the mechanism is important: 0.3.0 did
not remove the stale memories. It carried them as guarded warnings. A future
revision can reduce risk and payload by excluding clear scope mismatches while
retaining a compact machine-readable conflict notice.

## Routing and payload

All 12 Palace arms had route Recall@K and Precision@K of `0.75`. They retrieved
the active runtime configuration, legacy configuration, scheduler loader, and
test, but omitted the migration document from the four-file ground truth. The
task still succeeded because current code and tests exposed the contract.

Adaptive emitted 4,427 bytes (about 1,107 estimated tokens) in every trial.
Legacy Full emitted 2,882 bytes and Route-only emitted 2,082 bytes. Guarded
memory and audit telemetry therefore increased Palace's own payload here.

## Paired results

| Comparison | Success | Reported-token paired median | Tool-call paired median | Wall-time paired median |
| --- | ---: | ---: | ---: | ---: |
| Adaptive - Control | 4/4 vs 4/4 | +26,937.5 (95% bootstrap CI +16,418 to +39,316) | +3 (CI 0 to +7) | +14.920 s (CI +9.838 to +20.449) |
| Adaptive - Full | 4/4 vs 4/4 | -13,455 (CI -32,287 to +2,111) | -1 (CI -2 to 0) | +0.051 s (CI -9.056 to +4.465) |

The block supports stale-memory resistance, not an efficiency advantage over
Control. Adaptive was consistently more expensive than Control and broadly
similar to Full within wide intervals.

## Block decision

The stale-memory safety gate passed: no Palace arm followed the obsolete v1
advice, and no wrong-memory adoption occurred. The efficiency and payload gates
did not pass. These results feed the completed candidate decision rather than
triggering npm publication by themselves.
