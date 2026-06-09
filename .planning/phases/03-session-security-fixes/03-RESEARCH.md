# Phase 3: Session Security Fixes - Research

**Date:** 2026-06-09
**Phase:** 3 - Session Security Fixes
**Goal:** Plan the corrected session mode with secure cookies, appropriate expiration, and real logout invalidation while preserving the vulnerable mode for the before/after demo.

## RESEARCH COMPLETE

## Planning Summary

Phase 3 should add a mode-aware session configuration instead of replacing the vulnerable lab outright. The app already has a compact Express/EJS structure, a single `createApp()` export, a vulnerable session helper, and Supertest coverage. The smallest reliable plan is:

1. Add fixed-mode session configuration, mode selection, cookie policy, expiration, and focused cookie tests.
2. Add real logout invalidation, dashboard logout UI, docs for the corrected code, and logout tests.

Phase 4 remains responsible for proving that the original copied-cookie replay attack fails after mitigation.

## Source Findings

### express-session

`express-session` stores the session ID in the cookie and the session data server-side. This project already uses that model, so Phase 3 should continue with `express-session` rather than introducing JWTs or a database.

Planning impact:

- Keep `MemoryStore` acceptable for the local classroom lab, with documentation that it is not production storage.
- Add a fixed session helper or session factory instead of scattering cookie settings through `src/server.js`.
- Use `req.session.regenerate()` in the fixed login path if the implementation remains simple enough for the demo.
- Use `req.session.destroy()` for logout so server-side state is invalidated, not merely hidden from the browser.

### Set-Cookie attributes

The corrected cookie contract should be explicit:

- `HttpOnly` prevents browser JavaScript from reading the session cookie.
- `Secure` means the cookie is sent only over HTTPS-capable transport.
- `SameSite=Strict` is suitable for this local app because it has no external identity provider or cross-site POST flow.
- A short `maxAge` limits how long a copied cookie remains useful.
- The `__Host-` prefix is appropriate only when the cookie is Secure, Path=/, and has no Domain attribute.

Planning impact:

- Tests should verify the secure fixed `Set-Cookie` header contains `HttpOnly`, `Secure`, `SameSite=Strict`, and an expiration attribute.
- If a plain-HTTP local fallback exists, docs must label it as an inspection/testing fallback, not as the fully secure mode.
- Do not use a `__Host-` cookie name when the implementation intentionally disables Secure for plain HTTP fallback.

### Secure cookies and local HTTP

Secure cookies are awkward in a simple `http://127.0.0.1:3000` classroom app. With `express-session`, `cookie.secure: true` can prevent the cookie from being set on non-secure requests unless the app is behind trusted HTTPS/proxy configuration.

Planning impact:

- Keep the corrected target configuration secure in code and tests.
- Use `createApp()` options or environment variables so tests can simulate the secure request path without requiring a real certificate.
- Document the limitation plainly for the presentation. Detailed self-signed certificate setup is deferred unless execution needs a minimal helper.

### OWASP and Secure SDLC framing

OWASP session guidance maps cleanly to the Phase 3 story: protect session identifiers, limit session lifetime, and invalidate sessions server-side. For Secure SDLC, Phase 3 is the mitigation step after Phase 2 proved the weakness.

Planning impact:

- The docs should explain the fix in plain terms: reduce exposure, restrict transport, reduce cross-site sending, expire sooner, and destroy server-side state.
- Keep the explanation focused on Session Hijacking. Do not expand into XSS, CSRF token design, public deployment, Docker, or production hardening.

## Codebase Findings

- `src/server.js` currently wires `createVulnerableSession()` directly and sets `req.session.userId` on login.
- `src/session/vulnerable-session.js` is isolated and should remain the visible vulnerable comparison.
- `src/middleware/require-auth.js` redirects unauthenticated users to `/login`.
- `src/views/dashboard.ejs` already shows a mode badge and can host a small logout form.
- `tests/session-cookie.test.js` has reusable Set-Cookie extraction logic.
- `tests/session-reuse-attack.test.js` must keep proving the vulnerable replay path.
- There is no logout route yet.

## Implementation Guidance

### Fixed mode

Prefer a mode-aware structure:

- `createApp(options = {})` accepts an explicit session mode and test-only secure/proxy options.
- The server entry point resolves `SESSION_MODE` and cookie-related environment variables.
- A session helper exposes the active cookie name and clear-cookie options so logout can clear the right cookie.

### Cookie policy

Preferred secure path:

- cookie name: `__Host-session`
- `httpOnly: true`
- `secure: true`
- `sameSite: "strict"`
- `maxAge: 5 * 60 * 1000`
- `path: "/"`
- no Domain attribute

If a local HTTP fallback is added, make its name and docs unambiguous, such as `SESSION_COOKIE_SECURE=false` only for local inspection. Do not let the fallback replace the secure fixed path.

### Logout

Use a `POST /logout` route. On logout:

1. Capture the active cookie name/options before destroying the session.
2. Call `req.session.destroy`.
3. Clear the client cookie with the active cookie name and `path: "/"`.
4. Redirect to `/login`.

The test should prove that the old cookie cannot access `/dashboard` after logout.

## Validation Architecture

Automated checks:

- Keep `npm test` as the main verification command.
- Add fixed cookie tests using Supertest. If Secure requires request simulation, configure `createApp()` for test mode and send `X-Forwarded-Proto: https` only when needed.
- Add logout tests that log in, capture the session cookie, call `POST /logout`, assert a clearing `Set-Cookie`, and assert the old cookie no longer reaches `/dashboard`.
- Keep existing vulnerable tests passing.

Documentation checks:

- `README.md` should mention vulnerable and fixed run paths.
- `docs/session-security-fixes.md` should include the fixed cookie table, logout behavior, expiration policy, and OWASP/Secure SDLC mapping.
- Docs should not claim Phase 4 replay-failure proof is complete.

## Risks and Controls

| Risk | Severity | Control |
|------|----------|---------|
| Secure cookie mode does not persist over plain HTTP and looks broken during rehearsal. | High | Document the HTTPS/local limitation; use test options or a clearly labeled fallback without misrepresenting it as fully secure. |
| Fixed-mode changes break the vulnerable Phase 2 attack demo. | High | Preserve vulnerable mode and existing tests; add explicit mode selection. |
| Logout only clears the browser cookie and leaves server-side state alive. | High | Test `req.session.destroy` behavior by attempting `/dashboard` with the old cookie after logout. |
| Scope drifts into full production auth hardening. | Medium | Keep database, CSRF system, Docker, public deployment, and detailed certificate workflow out of Phase 3. |

## Plan Implications

- Plan 03-01 should add mode-aware session setup, fixed cookie config, scripts/docs for mode selection, and fixed cookie tests.
- Plan 03-02 should add real logout invalidation, dashboard logout UI, docs for corrected behavior, and logout tests.
- Both plans must preserve local-only fake data and keep the vulnerable replay proof meaningful.

## Sources

- Express `express-session` documentation: https://expressjs.com/en/resources/middleware/session/
- MDN Set-Cookie reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie
- OWASP Session Management Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
