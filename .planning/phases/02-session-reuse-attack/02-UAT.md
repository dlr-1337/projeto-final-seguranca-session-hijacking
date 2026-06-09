---
status: complete
phase: 02-session-reuse-attack
source:
  - 02-01-SUMMARY.md
  - 02-02-SUMMARY.md
started: 2026-06-09T10:26:14.4488301-03:00
updated: 2026-06-09T10:26:14.4488301-03:00
delegated_by_user: true
tester: Codex local verification
---

## Current Test

[testing complete]

## Tests

### 1. Attack walkthrough is discoverable and local-only
expected: README links to the Phase 2 walkthrough, and the walkthrough keeps the attack path scoped to localhost, DevTools, the `sid` cookie, fake users, and fake dashboard data.
result: pass
evidence: `Select-String -Path docs/session-reuse-attack.md,README.md -Pattern "127.0.0.1","DevTools","Cookie: sid=<copied-sid-value>","/dashboard","sem senha","docs/session-reuse-attack.md","fake"` passed.

### 2. Second client is denied before session replay
expected: A fresh local client opening `/dashboard` before receiving a copied cookie is redirected to `/login`.
result: pass
evidence: `npm test` passed; independent HTTP verification returned `deniedStatus: 302` and `deniedLocation: "/login"`.

### 3. Copied `sid` grants dashboard access in a separate client
expected: After logging in as fake user `alice`, copying only the `sid` cookie and sending it from a separate local request reaches `/dashboard` without sending a password.
result: pass
evidence: Independent HTTP verification logged in with `alice`, replayed only `sid`, returned `replayStatus: 200`, and found `Alice Demo`, `LAB-ALICE-001`, and `Relatorio interno ficticio`.

### 4. Evidence checklist is ready for rehearsal and slides
expected: The walkthrough tells the team which four local/fake observations to capture and includes `npm test` as automated evidence.
result: pass
evidence: `docs/session-reuse-attack.md` contains the four evidence points, `npm test`, fake-data-only guidance, and reset/cleanup instructions.

### 5. Automated replay test suite passes
expected: The automated tests pass, including the focused replay proof that does not reuse the original authenticated agent.
result: pass
evidence: `npm test` passed with 3 test files and 6 tests; `tests/session-reuse-attack.test.js` contains no `request.agent`.

## Summary

total: 5
passed: 5
issues: 0
pending: 0
skipped: 0
blocked: 0

## Gaps

[none]
