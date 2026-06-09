# Phase 2: Session Reuse Attack - Research

**Date:** 2026-06-09
**Phase:** 2 - Session Reuse Attack
**Goal:** Plan a reproducible local demonstration that reuses the vulnerable `sid` session cookie from Phase 1 in a second local client.

## RESEARCH COMPLETE

## Planning Summary

Phase 2 should treat the vulnerable behavior as an existing capability to demonstrate, not a new exploit feature to build. The app already uses `express-session`, stores session data server-side, and sends a browser cookie named `sid`. A second local client that presents the copied `sid` value should bind to the same server-side session and reach `/dashboard`.

Recommended planning split:

1. Create the manual browser/DevTools walkthrough and README link.
2. Add a focused automated replay proof plus evidence checklist for slide preparation.

## Source Findings

### express-session

Official Express middleware docs state that session data is not saved in the cookie itself; only the session ID is stored in the cookie, with session data stored server-side. This is the key concept for explaining why replaying `sid` lets another client attach to the existing server-side session.

Relevant docs:
- https://expressjs.com/en/resources/middleware/session/

Planning impact:
- The walkthrough should explicitly say that `sid` is the bearer of the session identity.
- A Supertest proof can log in once, copy the `Set-Cookie` value, and send it on a separate request to `/dashboard`.

### Set-Cookie attributes

MDN documents `Secure`, `HttpOnly`, SameSite behavior, and cookie prefixes. For Phase 2, the important point is not to implement fixed attributes yet, but to explain that the current vulnerable cookie lacks the protections that later phases will add.

Relevant docs:
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie

Planning impact:
- The attack document should mention that fixed attributes are deferred to Phase 3.
- The `cURL` backup command should preserve the exact cookie value from DevTools or `Set-Cookie`.

### OWASP Session Management

OWASP recommends protecting session identifiers with secure cookie attributes and server-side lifecycle controls. It specifically explains why `HttpOnly` matters for preventing script access to session IDs.

Relevant docs:
- https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html

Planning impact:
- The Phase 2 explanation should map the vulnerable outcome to weak session identifier handling and bearer-style session reuse.
- Do not expand into XSS, CSRF, or network sniffing; those are context, not this phase's practical attack.

## Codebase Findings

### Existing implementation

- `src/server.js` exports `createApp()`, wires `createVulnerableSession()`, handles `POST /login`, and protects `GET /dashboard` with `requireAuth`.
- `src/session/vulnerable-session.js` configures `express-session` with `name: "sid"`, `httpOnly: false`, `secure: false`, `sameSite: false`, and a one-day `maxAge`.
- `src/middleware/require-auth.js` redirects unauthenticated dashboard requests to `/login`.
- `src/views/dashboard.ejs` renders fake private data that can prove access in the second client.
- `tests/session-cookie.test.js` already demonstrates how to log in with Supertest and locate the `sid` cookie.

### Existing constraints

- Keep the lab local on `127.0.0.1`/localhost.
- Use only fake users from `README.md`.
- Do not add secure mode behavior in Phase 2.
- Do not add helper endpoints that leak session IDs.

## Implementation Guidance

### Manual walkthrough

The walkthrough should be concrete enough to rehearse:

1. Start the app with `npm run dev`.
2. Open `http://127.0.0.1:3000/login`.
3. Log in as `alice` / `alice123`.
4. Open DevTools and copy the `sid` cookie value.
5. In a second local client, verify `/dashboard` redirects to `/login` before replay.
6. Reuse the copied `sid` value in the second client.
7. Reload/request `/dashboard` and show fake private data without entering credentials.

### cURL backup

The cURL backup should be tested on Windows PowerShell. Prefer a pattern like:

```powershell
curl.exe -i http://127.0.0.1:3000/dashboard -H "Cookie: sid=<copied-sid-value>"
```

The implementation should verify the final command after the test/doc changes are made, because shell quoting and cookie URL-encoding are easy places to make a demo brittle.

### Automated proof

Add one focused test that uses a separate request/client for the replay. The test should not reuse `request.agent(app)` for the attacker path, because the point is to prove a copied cookie works outside the original authenticated agent.

Suggested observable assertions:

- login response returns a `sid` cookie;
- a request to `/dashboard` without a cookie returns `302` to `/login`;
- a separate request to `/dashboard` with `Cookie: <sid cookie>` returns `200`;
- the response contains `Painel protegido`, `Alice Demo`, and fake private report text.

## Validation Architecture

### Automated checks

- `npm test` must pass after the replay proof test is added.
- The replay proof test must exercise a second client/request rather than a persisted Supertest agent session.
- Documentation checks can use `Select-String` for key phrases:
  - `Cookie: sid=`
  - `127.0.0.1`
  - `DevTools`
  - `sem senha`
  - `Aviso etico` or equivalent local-only warning.

### Manual checks

- Execute the browser walkthrough locally once.
- Confirm the second client is denied before replay and accepted after replay.
- Confirm no real credentials, real domains, public tunnels, or third-party targets appear in the docs.

## Risks and Controls

| Risk | Severity | Control |
|------|----------|---------|
| Instructions could be copied to attack a real target | High | Keep docs explicitly local-only with fake users and `127.0.0.1`; include ethical warning. |
| Demo becomes brittle because cookie value is copied with wrong encoding | Medium | Test the exact cURL command and document preserving the exact `sid` value. |
| Test accidentally proves normal authenticated agent behavior instead of replay | Medium | Use a separate request/client for the replay path and include a denied-before-cookie assertion. |
| Phase drifts into mitigations | Medium | Keep secure flags, logout invalidation, and failure-after-fix verification deferred to Phase 3/4. |

## Plan Implications

- Plan 02-01 should create `docs/session-reuse-attack.md` and update `README.md`.
- Plan 02-02 should add the focused replay proof test and strengthen the evidence checklist in the walkthrough.
- Both plans must include local-only safety requirements.
- TDD mode is enabled globally, but these Phase 2 tasks are better treated as execute/docs/test tasks because the vulnerable behavior already exists; a strict RED gate could pass immediately and falsely look like a TDD violation.
