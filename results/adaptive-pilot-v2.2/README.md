# Adaptive Pilot v2.2

Status: in progress, 1 of 16 planned trials published. No agent outcome
existed at protocol freeze.

Protocol v2.2 repeats the four-arm Adaptive study with fresh trial ids and
seeds after correcting a Windows benchmark-harness confound. The frozen plan
records the platform, elevated workspace sandbox, and workspace-local
last-message transport required by every arm.

The earlier v2.1 trial remains public and unchanged, but its efficiency values
are infrastructure-noisy because every arm encountered native `apply_patch`
sandbox failures before using fallbacks. See the
[amendment log](../../docs/research/PROTOCOL_AMENDMENTS.md) and
[harness diagnostics](../../docs/research/HARNESS_DIAGNOSTICS.md).

No v2.2 agent may run before the commit containing this empty manifest is
available at tag `protocol-v2.2.0`.

## Interim Result

The first frozen trial, `small-local-bug-adaptive-v2-2-pilot-01`, ran all four
arms sequentially in the preregistered order. Every arm was valid, changed
only `src/format-currency.mjs`, and passed public tests plus the hidden oracle
with a 100/100 scope score. All arms recorded zero native patch-verification
and sandbox-preparation errors.

Adaptive selected `route-lite`. Relative to Full Palace it used 868 fewer
Palace output bytes, 217 fewer estimated Palace tokens, 17,055 fewer cumulative
reported tokens, and 13,145 fewer uncached input tokens. It also made two more
tool calls and took 0.336 seconds longer.

These are one-pair descriptive values, not a population estimate or a general
efficiency claim. See the [trial report](small-local-bug-adaptive-v2-2-pilot-01/comparison.md)
and [interim analysis](analysis.md).
