# Revised Bypass Engineering Confirmation

Status: **three exploratory trials complete; all 12 Agent arms valid and successful**.

[Simplified Chinese](../zh-CN/REVISED_BYPASS_CONFIRMATION.md) |
[Machine summary](../../results/revised-confirmation/exact-command-summary.json) |
[Evidence manifest](../../results/revised-confirmation/manifest.json)

## Why this confirmation exists

The completed 16-trial candidate study found that Adaptive Palace was correct
and tightly scoped, but still used more calls, time, and reported tokens than
Control. Transcript review identified two avoidable behaviors: reopening
`package.json` to discover the test command and splitting final Git checks into
separate calls.

These trials are post-candidate engineering evidence. They do not amend the
completed candidate study and do not add observations to formal v3.

## Intervention sequence

The first trial used bounded execution guidance but only named a "known or
conventional" test command. Adaptive still opened `package.json`. It was valid
and correct, but used one more call, 14,812 more reported tokens, and 14.964
more seconds than Control.

The next candidate resolved the repository's test command inside the single
Palace call and placed `run npm test` in the existing three-field bypass
response. Its packed artifact was bound to source commit
`4b0440cd32270c951b13e83e0d18fd5038e1108f` and SHA-1
`19c8f5452050959ae6a7beb18dc71199a2174a76`.

## Exact-command pairs

Both exact-command trials passed public tests, the hidden oracle, strict
changed-file scope, task fidelity, and runtime validity in every arm.

| Trial | Order prefix | Adaptive - Control time | Calls | Reported tokens | Inspection commands | Referenced paths |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| `exact-command-small-local-02` | Adaptive -> Control | -2.313 s | +1 | +26 | -1 | -2 |
| `exact-command-small-local-03` | Control -> Adaptive | +2.141 s | +2 | +13,315 | -1 | -4 |
| **Paired median** | balanced | **-0.086 s** | **+1.5** | **+6,670.5** | **-1** | **-3** |

Negative time means Adaptive was faster. Positive call or token values mean
Adaptive used more.

## What improved

- Adaptive selected `bypass` in both pairs and delivered 64 estimated tokens.
- Adaptive opened no package metadata in either pair.
- Adaptive referenced only `src/format-currency.mjs`; Control referenced three
  and five repository paths.
- Adaptive used one fewer inspection command in both pairs.
- The paired median wall-time difference was effectively zero.

## What remains unresolved

The Agent ignored the general instruction to batch final checks. It split
`git diff`, `git status`, and `git diff --check` into two commands in one trial
and three in the other. That preserved a +1 to +2 call overhead even after the
package reread disappeared. Reported-token savings were not demonstrated.

The next product experiment should emit one concrete final-check command,
rather than another prose reminder. No npm publication claim follows from two
pairs, and the exact-command candidate remains an engineering candidate.
