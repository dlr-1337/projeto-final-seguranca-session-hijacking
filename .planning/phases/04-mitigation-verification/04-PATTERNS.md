# Phase 4: Mitigation Verification - Patterns

## Purpose

Map Phase 4's planned docs and tests to existing codebase patterns so execution stays small and consistent.

## Closest Analogs

| New or Modified File | Closest Existing Analog | Pattern to Reuse |
|----------------------|-------------------------|------------------|
| `tests/session-mitigation-verification.test.js` | `tests/session-reuse-attack.test.js` | Extract a session cookie from `Set-Cookie`, send only the name-value pair in a separate Supertest request, assert dashboard content or redirect. |
| `tests/session-mitigation-verification.test.js` | `tests/session-logout.test.js` | Use `createApp({ sessionMode: "fixed", secureCookie: true, trustProxy: true })` and `X-Forwarded-Proto: https` for secure fixed-mode requests. |
| `docs/mitigation-verification.md` | `docs/session-reuse-attack.md` | Portuguese/ASCII classroom walkthrough with objective, prerequisites, numbered steps, evidence checklist, reset, and ethical warning. |
| `docs/mitigation-verification.md` | `docs/session-security-fixes.md` | Plain explanation of corrected cookie attributes, logout invalidation, Secure/HTTPS limitation, OWASP, and Secure SDLC. |
| `README.md` | Existing Phase 2 and Phase 3 sections | Short phase link and run commands, without duplicating the full walkthrough. |

## Test Helpers

Reuse these helper shapes:

- `findSessionCookie(response)` from `tests/session-reuse-attack.test.js` for vulnerable `sid`.
- `findFixedSessionCookie(response)` from `tests/session-fixed-cookie.test.js` and `tests/session-logout.test.js` for `__Host-session`.
- `toCookieHeader(setCookieValue)` from replay/logout tests to send only the cookie name-value pair.

## Behavioral Assertions

- Vulnerable before proof: `GET /dashboard` with copied `sid` returns `200` and includes `Painel protegido`, `Alice Demo`, `LAB-ALICE-001`, and `Relatorio interno ficticio`.
- Fixed denial proof: invalid, obsolete, logged-out, or missing session returns `302` and `Location: /login`.
- Secure fixed path: tests that need `Secure` should set `X-Forwarded-Proto: https` and use `trustProxy: true`.

## Documentation Assertions

- Phase 4 docs should contain `FIX-03`, `npm run dev`, `npm run dev:fixed`, `127.0.0.1`, `/dashboard`, `/login`, `Secure`, and `HTTPS`.
- Docs must say the HTTP fixed script is a local inspection fallback, not complete secure transport.
- Docs must keep all examples local and fake-data-only.
