---
phase: 01-vulnerable-lab-foundation
plan: "01-01"
subsystem: app-shell
tags: [express, ejs, vitest, supertest, local-demo]
requires: []
provides:
  - Local Express app shell
  - Fake user fixture data
  - Login and dashboard pages
  - Vitest/Supertest test harness
affects: [session-hijacking-lab, phase-2-attack-demo]
tech-stack:
  added: [express, ejs, vitest, supertest]
  patterns: [createApp export for tests, server-rendered EJS pages, fake in-memory users]
key-files:
  created:
    - package.json
    - package-lock.json
    - vitest.config.js
    - tests/app-shell.test.js
    - src/server.js
    - src/data/users.js
    - src/views/login.ejs
    - src/views/dashboard.ejs
    - src/views/layout.ejs
    - src/public/styles.css
    - README.md
    - .gitignore
  modified:
    - .planning/phases/01-vulnerable-lab-foundation/01-01-PLAN.md
key-decisions:
  - "Use CommonJS for the initial Express app and tests."
  - "Bind the local server to 127.0.0.1 by default."
  - "Use EJS pages with system CSS tokens from UI-SPEC."
patterns-established:
  - "Express app exports createApp() so Supertest can test routes without opening a port."
  - "Fake user data lives in src/data/users.js and is explicitly fictitious."
requirements-completed: [APP-01]
duration: 5 min
completed: 2026-06-09
---

# Phase 01 Plan 01-01: Express App Shell Summary

**Local Express app shell with fake login pages, fictitious dashboard data, and Vitest/Supertest route tests**

## Performance

- **Duration:** 5 min
- **Started:** 2026-06-09T08:47:00-03:00
- **Completed:** 2026-06-09T08:51:36-03:00
- **Tasks:** 3
- **Files modified:** 12

## Accomplishments

- Created the Node/Express project manifest, scripts, lockfile, and test harness.
- Added fake users and dashboard data with no real credentials or sensitive information.
- Built server-rendered login and dashboard pages styled to the UI-SPEC contract.
- Documented local run commands, fake credentials, tests, and ethical boundary.

## Task Commits

1. **Task 01-01-T1: Write failing app-shell tests and test harness** - `237c999` (test)
2. **Task 01-01-T2: Implement the thinnest runnable Express app shell** - `0a2d444` (feat)
3. **Task 01-01-T3: Document local operation and align UI with the contract** - `b5b7af1` (refactor)

**Plan metadata:** created in this SUMMARY commit.

## Files Created/Modified

- `package.json` - Node scripts, dependencies, and test command.
- `package-lock.json` - Locked npm dependency graph.
- `vitest.config.js` - Node Vitest config with globals.
- `tests/app-shell.test.js` - Route tests for login, dashboard shell, and fake credentials.
- `src/server.js` - Express app factory and local server entry point.
- `src/data/users.js` - Fictitious user and dashboard data.
- `src/views/login.ejs` - Login form page.
- `src/views/dashboard.ejs` - Dashboard page with fake private data.
- `src/views/layout.ejs` - Shared HTML layout reference.
- `src/public/styles.css` - UI-SPEC-aligned CSS.
- `README.md` - Local run instructions and fake credentials.
- `.gitignore` - Keeps `node_modules/` and local env files out of git.

## Decisions Made

- CommonJS keeps the initial app and test harness simple for Node execution.
- `createApp()` is exported so tests can run without binding a port.
- Server defaults to `127.0.0.1:3000` to reinforce local-only execution.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Adjusted Vitest harness for CommonJS**
- **Found during:** Task 01-01-T1
- **Issue:** `require("vitest")` fails in Vitest 3 CommonJS tests.
- **Fix:** Enabled Vitest globals in `vitest.config.js` and removed the direct `require("vitest")`.
- **Files modified:** `vitest.config.js`, `tests/app-shell.test.js`
- **Verification:** `npm test` then failed for missing `../src/server`, the intended RED failure.
- **Committed in:** `237c999`

**2. [Rule 2 - Missing Critical] Added `.gitignore` for installed dependencies**
- **Found during:** Task 01-01-T2
- **Issue:** `node_modules/` appeared as untracked after `npm install`.
- **Fix:** Added `.gitignore` with `node_modules/`, `.env`, and `.DS_Store`.
- **Files modified:** `.gitignore`
- **Verification:** `git status --short` no longer listed `node_modules/`.
- **Committed in:** `0a2d444`

---

**Total deviations:** 2 auto-fixed (1 blocking, 1 missing critical).
**Impact on plan:** Both fixes were required for correct TDD execution and safe git hygiene. No scope creep.

## Issues Encountered

- Vitest 3 CommonJS import behavior required using configured globals instead of importing `describe`, `it`, and `expect`.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Ready for Plan 01-02 to add `express-session`, protect `/dashboard`, and make the vulnerable `sid` cookie observable.

## Self-Check: PASSED

- `npm test` exits 0.
- README contains local commands and fake credentials.
- UI colors match `01-UI-SPEC.md`.
- No real data or external target is introduced.

---

*Phase: 01-vulnerable-lab-foundation*
*Completed: 2026-06-09*
