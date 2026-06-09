---
phase: 01-vulnerable-lab-foundation
plan: "01-02"
subsystem: auth-session
tags: [express-session, cookies, session-hijacking, vitest, supertest]
requires:
  - phase: 01-01
    provides: Local Express app shell and fake users
provides:
  - Vulnerable `sid` session cookie configuration
  - Protected dashboard route
  - Session-backed fake login flow
  - Cookie attribute tests and README evidence
affects: [phase-2-session-reuse-attack, phase-3-session-security-fixes]
tech-stack:
  added: [express-session]
  patterns: [isolated session configuration helper, requireAuth middleware, Supertest agent session tests]
key-files:
  created:
    - src/session/vulnerable-session.js
    - src/middleware/require-auth.js
    - tests/session-cookie.test.js
  modified:
    - package.json
    - package-lock.json
    - src/server.js
    - src/views/dashboard.ejs
    - tests/app-shell.test.js
    - README.md
    - .planning/phases/01-vulnerable-lab-foundation/01-02-PLAN.md
key-decisions:
  - "Use express-session with cookie name sid and intentionally insecure cookie flags."
  - "Use req.session.userId as the server-side session link to fake user data."
  - "Document only cookie inspection in Phase 1; cookie reuse remains Phase 2."
patterns-established:
  - "Session configuration is isolated in src/session/vulnerable-session.js for Phase 3 comparison."
  - "Dashboard access goes through src/middleware/require-auth.js."
requirements-completed: [APP-01, APP-02, VULN-01]
duration: 4 min
completed: 2026-06-09
---

# Phase 01 Plan 01-02: Vulnerable Session Summary

**Session-backed fake login with intentionally insecure `sid` cookie and protected dashboard tests**

## Performance

- **Duration:** 4 min
- **Started:** 2026-06-09T08:53:30-03:00
- **Completed:** 2026-06-09T08:57:49-03:00
- **Tasks:** 3
- **Files modified:** 9

## Accomplishments

- Added `express-session` and an isolated vulnerable session helper.
- Changed login to set `req.session.userId` and redirect to protected `/dashboard`.
- Added `requireAuth` middleware so unauthenticated dashboard access redirects to `/login`.
- Added Supertest agent coverage for the vulnerable cookie and authenticated dashboard access.
- Documented the vulnerable cookie attributes and browser inspection step in README without including the Phase 2 reuse attack.

## Task Commits

1. **Task 01-02-T1: Write failing vulnerable-session tests** - `437281f` (test)
2. **Task 01-02-T2: Implement vulnerable session middleware and dashboard guard** - `e11e9f4` (feat)
3. **Task 01-02-T3: Add vulnerable-code evidence and classroom notes** - `38720b2` (refactor)

**Plan metadata:** created in this SUMMARY commit.

## Files Created/Modified

- `src/session/vulnerable-session.js` - `express-session` middleware with `sid`, `httpOnly: false`, `secure: false`, `sameSite: false`, and 24-hour `maxAge`.
- `src/middleware/require-auth.js` - Session guard for protected dashboard access.
- `src/server.js` - Session middleware, login session write, and protected dashboard route.
- `src/views/dashboard.ejs` - Vulnerable-mode indicator.
- `tests/session-cookie.test.js` - Cookie attribute and authenticated dashboard tests.
- `tests/app-shell.test.js` - Updated unauthenticated dashboard expectation.
- `README.md` - Vulnerable-mode evidence and DevTools inspection instructions.
- `package.json` / `package-lock.json` - Added `express-session`.
- `.planning/phases/01-vulnerable-lab-foundation/01-02-PLAN.md` - Corrected cookie header expectation from `Max-Age` to `Expires` for express-session behavior.

## Decisions Made

- `sameSite: false` is explicit in code so the resulting header omits `SameSite`.
- README stops at cookie inspection; reuse instructions are intentionally deferred to Phase 2.
- Tests verify the vulnerable behavior through HTTP responses instead of inspecting private implementation details only.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Corrected cookie expiration assertion**
- **Found during:** Task 01-02-T2
- **Issue:** The test expected `Max-Age=86400`, but `express-session` emits an `Expires` attribute derived from `cookie.maxAge`.
- **Fix:** Updated the test and plan to assert `Expires=` in the `Set-Cookie` header while keeping source assertions for the 24-hour `maxAge` setting.
- **Files modified:** `tests/session-cookie.test.js`, `.planning/phases/01-vulnerable-lab-foundation/01-02-PLAN.md`
- **Verification:** `npm test` exits 0 and source checks confirm `maxAge: ONE_DAY_MS`.
- **Committed in:** `e11e9f4`

---

**Total deviations:** 1 auto-fixed (1 blocking).
**Impact on plan:** The correction matches actual `express-session` behavior and preserves the demo goal.

## Issues Encountered

- None beyond the auto-fixed expiration header mismatch above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Phase 2 can now demonstrate Session Hijacking by reusing the vulnerable local `sid` cookie in another local client.

## Self-Check: PASSED

- `npm test` exits 0.
- `src/session/vulnerable-session.js` contains `name: "sid"`, `httpOnly: false`, `secure: false`, `sameSite: false`, and 24-hour `maxAge`.
- Unauthenticated `GET /dashboard` redirects to `/login`.
- Authenticated fake users can access dashboard data.
- README documents vulnerable cookie inspection without attack reuse steps.

---

*Phase: 01-vulnerable-lab-foundation*
*Completed: 2026-06-09*
