# Phase 1: Vulnerable Lab Foundation - Research

**Date:** 2026-06-09
**Status:** Complete

## Research Question

What does the planner need to know to create a small, reproducible, local Session Hijacking lab foundation with Express, fake login, a protected dashboard, and intentionally insecure session cookies?

## Phase Scope

Phase 1 should create the vulnerable foundation only:

- Local Express app that starts with documented commands.
- Fake login using only fictitious credentials and data.
- Protected dashboard that proves authenticated access.
- Vulnerable session cookie settings visible in code.

The actual cookie reuse attack belongs to Phase 2. Secure cookie flags, short expiration, real logout invalidation, and mitigation proof belong to Phases 3 and 4.

## Technical Findings

### Express and Sessions

- `express-session` stores only the session ID in the browser cookie; session data stays server-side. That matches the teaching goal because the copied cookie acts as the session handle.
- The default cookie name is `connect.sid`, so Phase 1 should override it to `sid` to make the artifact easy to identify in DevTools and demo tooling.
- The default cookie settings include `httpOnly: true`, `secure: false`, and no `maxAge`. Phase 1 must explicitly set insecure values so the vulnerability is visible, not accidental.
- `MemoryStore` is acceptable for this local classroom lab because the app runs as one short-lived process. It should be described as development-only and not production-safe.

### Vulnerable Cookie Contract

Use a clearly named vulnerable session configuration block:

- `name: "sid"`
- `cookie.httpOnly: false`
- `cookie.secure: false`
- `cookie.sameSite: false` or omitted
- `cookie.maxAge: 24 * 60 * 60 * 1000`

This creates a cookie that is readable from browser-side JavaScript, is sent over HTTP, lacks SameSite protection, and remains valid long enough for a classroom reuse demo.

### App Shape

- Use server-rendered HTML with Express and EJS or plain templates.
- Keep the route set small: `/`, `/login`, `/dashboard`.
- Use `express.urlencoded()` for login form submission.
- Keep fake users in a small in-memory module or constant.
- Dashboard data should be user-specific but fictional.

### Planning Implications

- Plan 01-01 should create the project skeleton, dependencies, scripts, pages, fake users, and basic tests.
- Plan 01-02 should add `express-session`, vulnerable cookie settings, route protection, dashboard session behavior, README evidence, and tests that assert the vulnerable cookie attributes.
- Do not add HTTPS, Docker, a real database, registration, password reset, or fixed-mode behavior in this phase.

## Validation Architecture

Phase 1 can be validated with lightweight Node tests:

- Use Vitest plus Supertest for HTTP route behavior.
- Verify `GET /login` returns a login page.
- Verify `POST /login` with valid fake credentials sets a `sid` cookie.
- Verify the `Set-Cookie` header for vulnerable mode does not include `HttpOnly`, does not include `Secure`, and does not include `SameSite`.
- Verify authenticated requests with the session cookie can access `/dashboard`.
- Verify unauthenticated requests to `/dashboard` redirect to `/login` or return an unauthorized response, whichever the app chooses consistently.
- Add one manual verification in the README: inspect the `sid` cookie in browser DevTools after login.

## Risks and Landmines

- Do not accidentally leave `httpOnly` at the secure default; the vulnerable mode must set `httpOnly: false`.
- Do not use real data or real user names.
- Do not overbuild UI or add a frontend framework; it would distract from the session behavior.
- Do not implement the fixed mode early. The before/after contrast is the core story and should stay split across phases.
- If a logout route is included early, it must not be presented as the final secure logout. Real server-side invalidation belongs to Phase 3.

## Sources

- Express `express-session` documentation: https://expressjs.com/en/resources/middleware/session/
- MDN Set-Cookie reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie
- OWASP Session Management Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html

## RESEARCH COMPLETE
