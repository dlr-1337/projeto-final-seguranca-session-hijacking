# Phase 4: Mitigation Verification - Research

**Date:** 2026-06-09
**Phase:** 4 - Mitigation Verification
**Goal:** Plan the proof that the vulnerable session replay works before mitigation and fails in the fixed-mode scenarios that Phase 3 actually mitigates.

## RESEARCH COMPLETE

## Planning Summary

Phase 4 should connect the Phase 2 attack walkthrough to the Phase 3 fixes with one concise verification path:

1. Preserve the vulnerable replay proof as the before baseline.
2. Add a fixed-mode mitigation verification proof that rejects obsolete, logged-out, or expired session cookies.
3. Create a short rehearsal checklist with reset commands, expected observations, and a clear explanation of the local HTTPS limitation.

The core planning risk is overclaiming. Session cookies remain bearer tokens while active. The phase should prove that the app rejects cookies after the mitigation changes make them invalid or no longer accepted, and should explain that `HttpOnly`, `Secure`, `SameSite`, short lifetime, regeneration, and logout reduce exposure and duration rather than magically invalidating a manually copied active cookie.

## Source Findings

### Existing vulnerable proof

`tests/session-reuse-attack.test.js` already proves the Phase 2 baseline:

- `GET /dashboard` without a session redirects to `/login`.
- Login as `alice` creates a vulnerable `sid` cookie.
- A separate request that sends `Cookie: sid=<value>` reaches `/dashboard` and sees Alice's fake private data.

Planning impact:

- Keep this test intact as the "before" proof.
- Do not rewrite the vulnerable mode to make the Phase 4 proof pass.
- Use the same fake user and dashboard strings in the before/after checklist.

### Fixed-mode behavior available from Phase 3

Phase 3 added:

- `createApp(options)` with `sessionMode`, `secureCookie`, and `trustProxy` options.
- `src/session/session-mode.js` with vulnerable/fixed mode selection.
- `src/session/fixed-session.js` with `__Host-session`, `HttpOnly`, `Secure`, `SameSite=Strict`, `maxAge`, and `Path=/`.
- `POST /logout` with `req.session.destroy()` and `res.clearCookie(...)`.
- `tests/session-fixed-cookie.test.js` and `tests/session-logout.test.js`.

Planning impact:

- A mitigation verification test can instantiate vulnerable and fixed apps separately.
- An old vulnerable `sid` cookie should not authenticate against a newly created fixed app. In the secure fixed path, the cookie name differs (`__Host-session`). In the HTTP-local fallback, the name may be `sid`, but the new fixed app has a separate session store, so the old session ID is not valid.
- A copied fixed cookie should fail after `POST /logout`; this is already covered, but Phase 4 can reference or consolidate the proof in a before/after verification test.

### Observable denial

`src/middleware/require-auth.js` returns `res.redirect("/login")` for unauthenticated dashboard access. Existing tests already assert `302` and `Location: /login`.

Planning impact:

- Treat `302 Location: /login` as the canonical local denial.
- Do not add an API endpoint solely to return `401`.
- If wording needs to be more didactic, update docs or a tiny login-page note without changing the core redirect contract.

### HTTPS and local fallback

The README and Phase 3 docs state that `npm run dev:fixed` uses `SESSION_COOKIE_SECURE=false` so the classroom app can be inspected over `http://127.0.0.1:3000`. The secure posture is still represented in code/tests with `secureCookie: true`, `trustProxy: true`, and `X-Forwarded-Proto: https`.

Planning impact:

- The checklist must separate browser rehearsal from secure-cookie proof.
- The automated test should exercise the secure fixed path where possible.
- The docs must say the HTTP fallback is not the full secure posture.

## Implementation Guidance

### Test strategy

Add a focused mitigation verification test file, likely `tests/session-mitigation-verification.test.js`.

Recommended cases:

- Before baseline can import or mirror the existing vulnerable replay pattern, proving `sid` replay returns `200` and dashboard content.
- Fixed obsolete-cookie case: log in to a vulnerable app, extract `sid`, create a fixed app, send the old `sid` to `/dashboard`, and assert `302` plus `Location: /login`.
- Fixed post-logout case: log in to fixed mode with `secureCookie: true`, access `/dashboard` successfully, call `POST /logout`, then send the copied fixed cookie to `/dashboard` and assert `302` plus `Location: /login`.

Avoid brittle expiration timing unless the implementation is straightforward. It is enough for Phase 4 to verify the short `maxAge` setting through existing cookie tests and prove logout/obsolete-session denial behavior.

### Documentation strategy

Create `docs/mitigation-verification.md` with:

- Objective and ethical/local boundary.
- Before path: vulnerable replay succeeds.
- After path: old vulnerable cookie rejected in fixed mode.
- After path: fixed cookie rejected after logout.
- Reset commands for Windows-friendly rehearsal.
- HTTPS/localhost limitation explanation.
- Evidence checklist for later slides.

Update README with a short Phase 4 link and do not move final slide work into this phase.

## Validation Architecture

Automated checks:

- `npm test` remains the main test command.
- The new mitigation verification test must assert both success-before and denial-after behavior.
- Documentation checks should assert `docs/mitigation-verification.md` contains `FIX-03`, `/login`, `npm run dev`, `npm run dev:fixed`, `Secure`, and `127.0.0.1`.

Manual checks:

- Follow the Phase 4 checklist locally with browser DevTools and/or `curl.exe`.
- Confirm the visible denial is redirect to `/login`.
- Confirm the script explains why `Secure` needs HTTPS and why HTTP-local fixed mode is only a fallback.

## Risks and Controls

| Risk | Severity | Control |
|------|----------|---------|
| The demo claims active fixed cookies cannot be replayed if manually copied. | High | Context, docs, and tests must frame the proof around obsolete, logged-out, or expired cookies. |
| Fixed-mode HTTP fallback is mistaken for complete secure transport. | High | Checklist separates browser fallback from secure-path automated proof and repeats the HTTPS limitation. |
| Phase 4 breaks the vulnerable before demo. | High | Keep Phase 2 replay test passing and avoid changing vulnerable session behavior. |
| Scope expands into certificate setup, Docker, or broad security hardening. | Medium | Keep those items deferred to v2 or Phase 5 as presentation context only. |

## Plan Implications

- Plan 04-01 should create the mitigation verification checklist and focused regression proof for `FIX-03`.
- Plan 04-02 should rehearse the whole before/after path, link docs from README, and tighten any didactic wording without adding new auth features.
- Both plans must preserve the honest bearer-cookie limitation and the local-only ethical boundary.

## Sources

- `.planning/phases/02-session-reuse-attack/02-CONTEXT.md`
- `.planning/phases/03-session-security-fixes/03-CONTEXT.md`
- `docs/session-reuse-attack.md`
- `docs/session-security-fixes.md`
- `src/server.js`
- `src/session/session-mode.js`
- `src/session/fixed-session.js`
- `tests/session-reuse-attack.test.js`
- `tests/session-fixed-cookie.test.js`
- `tests/session-logout.test.js`
