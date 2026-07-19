# Control-First v3 Release Provenance Gate

Date: 2026-07-20

Machine evidence: [control-first-v3-release-provenance-2026-07-20.json](./evidence/control-first-v3-release-provenance-2026-07-20.json)

## Status

The formal v3 study remains intentionally unfrozen with 0/16 trials and 0/64
Agent arms attempted. This stage adds an executable package-provenance gate; it
does not add an Agent outcome or claim an efficiency improvement.

The reviewed Vertex Palace implementation is commit
`97d1736f971438f7f2913f0b731633b0bab8441d`. The release-candidate HEAD is
`8328ea29d55260e34e2e6170bd420e4c659af39e`; the only change between those
commits is the excluded machine-evidence JSON. Repeated `npm pack --dry-run`
produced the same seven-file `vertex-palace@0.3.0` tarball:

- SHA-1: `4f4f7843cbfebaec0a9f3aade31fac24d96d1133`
- integrity: `sha512-wfxQUxLKk1kQxQm8X1eGKbRaXX/yxIla8KO6PAxj83Fx+7ofwQSzla6tTVvLIlBOxchGy0OmopFdS684GDz9RA==`

Product lint, 89 product tests, build, MCP smoke, clean-package validation, and
pinned Zod and Requests validation passed before publication was attempted.

## Publication Attempt

`npm whoami` succeeded as `lohchanhin`. The subsequent public 0.3.0 publish
reached npm's official browser authorization step, but the authorization was
not completed before the CLI endpoint expired and returned `E404`. Registry
readback still returned 404 for `vertex-palace@0.3.0`; therefore no partial or
ambiguous 0.3.0 release exists. The benchmark dependency remains 0.2.1 until a
fresh interactive authorization succeeds and registry readback is verified.

## New Guardrail

The v3 plan schema is now 6. In addition to the package version and source
commit, it preregisters the release commit, tarball SHA-1, and npm integrity.
Before a formal Agent arm can start, the study runner checks:

1. `package.json` requests the exact preregistered version;
2. the root and package entries in `package-lock.json` request that version;
3. the lock entry resolves to the expected npm tarball;
4. the lock integrity equals the preregistered integrity; and
5. the installed package reports the exact version.

A unit test proves that the gate accepts the exact fixture and rejects a changed
integrity. The complete benchmark check passed with 63/63 tests, all five
fixture contracts, every retained evidence audit, the v2.2 analysis
reproduction, and the v3 public manifest still at 0/16.

## Route Self-Evaluation

Vertex Palace routed 5/7 changed files (coverage 0.71, focus 0.71, confidence
0.35). It missed `README.zh-CN.md` and the core `src/commands/study.mjs`, so the
assessment remains `needs-review`. The reported 99.6% repository-to-pack token
reduction measures selected context only and is not evidence of lower Agent
tokens or wall time.

## Next Gate

With the user present, repeat the official npm browser authorization, verify the
published shasum and integrity from the registry, install exact 0.3.0 into this
repository, run a clean `npm ci` and the complete check, and only then prepare
the private key commitment and protocol freeze commit. No formal arm may run
before that freeze commit is tagged.
