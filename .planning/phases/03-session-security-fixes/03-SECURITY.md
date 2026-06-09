---
phase: 03
slug: session-security-fixes
status: verified
threats_open: 0
asvs_level: 1
created: 2026-06-09
updated: 2026-06-09
---

# Phase 03 - Security

Per-phase security contract for the Session Security Fixes phase. This file verifies the plan-time threat model in:

- `.planning/phases/03-session-security-fixes/03-01-PLAN.md`
- `.planning/phases/03-session-security-fixes/03-02-PLAN.md`

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| Browser to Express app | User submits fake credentials and receives a session cookie. | Session identifier cookie and login form data for fictitious users. |
| Express app to server-side session store | `express-session` maps the cookie identifier to server-side session state. | `userId` and session metadata stored locally for the demo. |
| Demo operator to documentation | The team follows README and docs during classroom rehearsal and presentation. | Security claims about fixed cookies, logout, OWASP, Secure SDLC, and Phase 4 boundary. |

## Threat Register

| Threat ID | Category | Component | Disposition | Mitigation | Status |
|-----------|----------|-----------|-------------|------------|--------|
| T-03-01 | Tampering | Session mode selection | mitigate | Vulnerable mode remains the default and existing Phase 2 replay tests still pass; fixed mode is explicit via config/options. | closed |
| T-03-02 | Information Disclosure | Secure cookie explanation | accept + mitigate | Secure fixed path is tested with `secureCookie: true`; local HTTP fallback is documented as inspection-only, not the secure posture. | closed |
| T-03-03 | Spoofing | Cookie prefix rules | mitigate | `__Host-session` is used only when `secureCookie` is true; fixed helper rejects `__Host-` with insecure cookies. | closed |
| T-03-04 | Elevation of Privilege | Session lifetime | mitigate | Fixed mode sets a 5-minute `maxAge`; fixed cookie tests assert expiration metadata. | closed |
| T-03-05 | Elevation of Privilege | Logout lifecycle | mitigate | `POST /logout` calls `req.session.destroy`; tests prove the old cookie cannot access `/dashboard` after logout. | closed |
| T-03-06 | CSRF / Tampering | Logout route semantics | mitigate | Dashboard uses a form posting to `POST /logout`; no state-changing GET logout was added. | closed |
| T-03-07 | Repudiation | Documentation accuracy | mitigate | README and `docs/session-security-fixes.md` state Phase 3 implements fixes and Phase 4 proves replay failure. | closed |
| T-03-08 | Tampering | Vulnerable demo preservation | mitigate | Existing vulnerable cookie and replay tests remain passing after logout and fixed-mode changes. | closed |

## Evidence

| Evidence | Result |
|----------|--------|
| `npm test` | Passed: 5 test files, 9 tests. |
| `tests/session-fixed-cookie.test.js` | Verifies `__Host-session`, `HttpOnly`, `Secure`, `SameSite=Strict`, and expiration on the secure fixed path. |
| `tests/session-logout.test.js` | Verifies `POST /logout`, cookie clearing, and old-cookie denial after logout. |
| Delegated UAT live HTTP flow | Passed login, dashboard, fixed-mode label, logout, cookie clearing, and old-cookie denial checks. |
| Documentation scan | README and `docs/session-security-fixes.md` include `HttpOnly`, `Secure`, `SameSite`, `logout`, `OWASP`, `Secure SDLC`, and `Phase 4`. |

## Accepted Risks Log

| Risk ID | Threat Ref | Rationale | Accepted By | Date |
|---------|------------|-----------|-------------|------|
| AR-03-01 | T-03-02 | `SESSION_COOKIE_SECURE=false` is allowed only for local HTTP browser inspection because a normal browser will not persist a Secure cookie over plain HTTP. The secure code path remains implemented and test-backed with `secureCookie: true`. | Project scope for local academic demo | 2026-06-09 |

## Security Audit Trail

| Audit Date | Threats Total | Closed | Open | Run By |
|------------|---------------|--------|------|--------|
| 2026-06-09 | 8 | 8 | 0 | codex-inline |

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log
- [x] `threats_open: 0` confirmed
- [x] `status: verified` set in frontmatter

**Approval:** verified 2026-06-09
