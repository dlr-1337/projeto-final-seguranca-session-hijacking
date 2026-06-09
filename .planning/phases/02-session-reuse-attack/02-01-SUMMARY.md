---
phase: 02-session-reuse-attack
plan: 02-01
subsystem: documentation
tags: [session-hijacking, express-session, cookies, devtools, curl]

requires:
  - phase: 01-vulnerable-lab-foundation
    provides: "Local Express app with vulnerable sid cookie and protected dashboard"
provides:
  - "Browser and DevTools session reuse walkthrough"
  - "cURL backup command pattern for replaying sid"
  - "README link to Phase 2 attack documentation"
affects: [phase-03-session-security-fixes, phase-04-mitigation-verification, presentation-package]

tech-stack:
  added: []
  patterns: ["Focused docs under docs/", "README links to phase-specific walkthroughs"]

key-files:
  created:
    - docs/session-reuse-attack.md
  modified:
    - README.md

key-decisions:
  - "Use browser DevTools as the primary classroom attack path."
  - "Use curl.exe as the reproducible terminal backup."
  - "Keep all attack instructions local-only and fake-data-only."

patterns-established:
  - "Phase walkthroughs live in docs/ and are linked from README."
  - "Security demo docs include denied-before and accepted-after observations."

requirements-completed:
  - VULN-02
  - ATK-01

duration: 8 min
completed: 2026-06-09
---

# Phase 02 Plan 01: Session Reuse Walkthrough Summary

**Local browser/DevTools session reuse walkthrough with cURL backup and README entry point**

## Performance

- **Duration:** 8 min
- **Started:** 2026-06-09T09:58:00-03:00
- **Completed:** 2026-06-09T10:06:05-03:00
- **Tasks:** 3 completed
- **Files modified:** 2

## Accomplishments

- Created `docs/session-reuse-attack.md` with a step-by-step local attack flow.
- Documented the second-client denial before replay and dashboard access after replay.
- Added a Windows-friendly `curl.exe` backup command pattern.
- Linked the Phase 2 walkthrough from `README.md` while preserving Phase 1 cookie details.

## Task Commits

Each file-changing task was committed atomically:

1. **Task 02-01-01: Create the attack walkthrough document** - `7c2cc9c` (docs)
2. **Task 02-01-02: Link the Phase 2 walkthrough from README** - `2a280ca` (docs)
3. **Task 02-01-03: Verify documentation scope and safety** - no commit; verification-only task with no file changes

## Files Created/Modified

- `docs/session-reuse-attack.md` - Browser/DevTools attack walkthrough, cURL backup, principle explanation, evidence checklist, cleanup, and ethical warning.
- `README.md` - Adds a Phase 2 section linking to the walkthrough.

## Decisions Made

- Kept the primary demo visual with browser DevTools because it is easier to present orally.
- Used `curl.exe` as the backup instead of Postman because it is quicker to reproduce from project docs.
- Kept mitigations out of this plan so Phase 3 and Phase 4 remain clean before/after stages.

## Deviations from Plan

None - plan executed exactly as written.

**Total deviations:** 0 auto-fixed.
**Impact on plan:** No scope changes.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Verification

- `Select-String -Path docs/session-reuse-attack.md -Pattern "127.0.0.1","DevTools","Cookie: sid=<copied-sid-value>","/dashboard","sem senha"` passed.
- `Select-String -Path README.md -Pattern "docs/session-reuse-attack.md","Phase 2"` passed.
- `npm test` passed: 2 test files, 5 tests.

## Next Phase Readiness

Plan 02-02 can now add the automated replay proof test and strengthen evidence notes using the walkthrough created here.

---

*Phase: 02-session-reuse-attack*
*Completed: 2026-06-09*
