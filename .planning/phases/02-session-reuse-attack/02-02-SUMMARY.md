---
phase: 02-session-reuse-attack
plan: 02-02
subsystem: testing
tags: [session-hijacking, express-session, cookies, supertest, vitest]

requires:
  - phase: 02-session-reuse-attack
    provides: "Manual attack walkthrough from 02-01"
provides:
  - "Automated proof that a copied sid cookie can be replayed by a separate local client"
  - "Evidence checklist for rehearsal and later slides"
affects: [phase-03-session-security-fixes, phase-04-mitigation-verification, presentation-package]

tech-stack:
  added: []
  patterns: ["Supertest replay proof using copied Cookie header", "Evidence checklist paired with automated test command"]

key-files:
  created:
    - tests/session-reuse-attack.test.js
  modified:
    - docs/session-reuse-attack.md

key-decisions:
  - "Use a separate Supertest request for replay instead of request.agent."
  - "Assert denial before replay and dashboard access after replay."
  - "Keep evidence local-only and fake-data-only."

patterns-established:
  - "Replay tests extract sid from login Set-Cookie and send only the cookie name-value pair."
  - "Evidence sections pair manual observations with npm test output."

requirements-completed:
  - VULN-02
  - ATK-01
  - ATK-02

duration: 6 min
completed: 2026-06-09
---

# Phase 02 Plan 02: Replay Evidence Summary

**Automated sid replay proof with second-client denial/acceptance checks and evidence checklist**

## Performance

- **Duration:** 6 min
- **Started:** 2026-06-09T10:06:10-03:00
- **Completed:** 2026-06-09T10:11:15-03:00
- **Tasks:** 3 completed
- **Files modified:** 2

## Accomplishments

- Added `tests/session-reuse-attack.test.js` proving copied `sid` reuse from a separate request.
- Confirmed `/dashboard` redirects to `/login` before replay.
- Confirmed replaying the copied cookie returns `200` and Alice's fake private dashboard data.
- Updated the walkthrough evidence checklist with `npm test` and fake-data-only guidance.

## Task Commits

Each file-changing task was committed atomically:

1. **Task 02-02-01: Add a focused session replay proof test** - `3b65df8` (test)
2. **Task 02-02-02: Strengthen the evidence checklist in the walkthrough** - `a7d95f1` (docs)
3. **Task 02-02-03: Run final Phase 2 verification** - no commit; verification-only task with no file changes

## Files Created/Modified

- `tests/session-reuse-attack.test.js` - Supertest proof that replaying a copied `sid` cookie in a separate request reaches the dashboard.
- `docs/session-reuse-attack.md` - Adds automated evidence and fake-data-only screenshot/note guidance.

## Decisions Made

- Used a new focused test file to keep the replay proof easy to inspect.
- Replayed only the `sid=...` name-value pair from `Set-Cookie`.
- Left fixed-mode behavior untouched for Phase 3 and Phase 4.

## Deviations from Plan

None - plan executed exactly as written.

**Total deviations:** 0 auto-fixed.
**Impact on plan:** No scope changes.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Verification

- `npm test` passed: 3 test files, 6 tests.
- `Select-String -Path docs/session-reuse-attack.md -Pattern "Checklist","sid","sem senha","npm test","fake"` passed.
- `Select-String -Path docs/session-reuse-attack.md,README.md -Pattern "127.0.0.1","sid","sem senha","docs/session-reuse-attack.md"` passed.
- `git diff -- src/session/vulnerable-session.js` showed no changes.

## Next Phase Readiness

Phase 3 can now implement secure cookie flags, expiration, and logout invalidation against a documented and tested vulnerable replay baseline.

---

*Phase: 02-session-reuse-attack*
*Completed: 2026-06-09*
