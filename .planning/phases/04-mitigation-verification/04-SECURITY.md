---
phase: 04
slug: mitigation-verification
status: verified
threats_open: 0
asvs_level: 1
created: 2026-06-09
updated: 2026-06-09
---

# Phase 04 - Security

Per-phase security contract for the Mitigation Verification phase. This file verifies the plan-time threat model in:

- `.planning/phases/04-mitigation-verification/04-01-PLAN.md`
- `.planning/phases/04-mitigation-verification/04-02-PLAN.md`

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| Demo operator to local lab | The team follows README/checklist commands to run vulnerable and fixed modes locally. | Fake credentials, copied local cookie values, and expected observations. |
| Browser or curl client to Express app | Local clients send session cookies to `/dashboard` before and after mitigation. | Session identifier cookies and fake login form data. |
| Documentation to presentation | Phase 4 wording becomes evidence for the classroom explanation. | Security claims about replay, invalidation, HTTPS localhost limits, and bearer-cookie behavior. |

## Threat Register

| Threat ID | Category | Component | Disposition | Mitigation | Status |
|-----------|----------|-----------|-------------|------------|--------|
| T-04-01 | Spoofing | Vulnerable replay baseline | mitigate | Tests and live UAT prove vulnerable `sid` replay reaches `/dashboard`, preserving the before-state evidence. | closed |
| T-04-02 | Spoofing | Fixed-mode obsolete cookie handling | mitigate | Tests and live UAT prove an obsolete vulnerable `sid` redirects to `/login` after switching to fixed mode. | closed |
| T-04-03 | Elevation of Privilege | Logout invalidation proof | mitigate | Tests and live UAT prove a copied fixed cookie stops working after `POST /logout` destroys the server session. | closed |
| T-04-04 | Information Disclosure | HTTPS localhost explanation | accept + mitigate | Docs state that `Secure` requires HTTPS and that `SESSION_COOKIE_SECURE=false` is only for local browser inspection. | closed |
| T-04-05 | Repudiation | Security claim accuracy | mitigate | Checklist explicitly says active session cookies remain bearer credentials until expiration or server-side invalidation. | closed |
| T-04-06 | Misuse | Ethical demo scope | mitigate | Docs keep the rehearsal limited to `127.0.0.1`/localhost, fake users, fake data, and authorized local execution. | closed |
| T-04-07 | Operational | Reset and rehearsal reliability | mitigate | Checklist includes Windows-friendly reset steps, cookie clearing, mode switching, and expected `302 Location: /login` evidence. | closed |

## Evidence

| Evidence | Result |
|----------|--------|
| `npm test` | Passed: 6 test files, 12 tests. |
| `tests/session-mitigation-verification.test.js` | Verifies vulnerable replay success, obsolete-cookie denial in fixed mode, and post-logout denial. |
| Delegated live UAT flow | Passed vulnerable replay, fixed obsolete-cookie denial, fixed post-logout denial, and local fixed cookie attribute checks. |
| Documentation scan | README, checklist, and verification report include `FIX-03`, `302 Location: /login`, `npm run dev:fixed`, `Secure`, `127.0.0.1`, and `cookie bearer`. |
| `audit-open --json` | Reported no open UAT gaps, verification gaps, todos, seeds, debug sessions, or context questions. |

## Accepted Risks Log

| Risk ID | Threat Ref | Rationale | Accepted By | Date |
|---------|------------|-----------|-------------|------|
| AR-04-01 | T-04-04 | `SESSION_COOKIE_SECURE=false` is retained only for manual HTTP-local inspection because a normal browser will not store a Secure cookie over plain HTTP. The secure code path remains tested with `secureCookie: true`, `trustProxy: true`, and `X-Forwarded-Proto: https`. | Project scope for local academic demo | 2026-06-09 |
| AR-04-02 | T-04-05 | Cookie flags reduce exposure and lifetime but do not make a still-active manually copied session cookie cryptographically unusable. The demo therefore proves invalid, obsolete, expired, or logged-out cookie denial instead of overclaiming active-cookie replay prevention. | Project scope for accurate teaching | 2026-06-09 |

## Security Audit Trail

| Audit Date | Threats Total | Closed | Open | Run By |
|------------|---------------|--------|------|--------|
| 2026-06-09 | 7 | 7 | 0 | codex-inline |

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log
- [x] `threats_open: 0` confirmed
- [x] `status: verified` set in frontmatter

**Approval:** verified 2026-06-09
