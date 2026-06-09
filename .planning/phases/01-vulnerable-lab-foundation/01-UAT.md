---
status: complete
phase: 01-vulnerable-lab-foundation
source:
  - 01-01-SUMMARY.md
  - 01-02-SUMMARY.md
started: 2026-06-09T12:29:33Z
updated: 2026-06-09T12:29:59Z
---

## Current Test

[testing complete]

## Tests

### 1. Cold Start Smoke Test
expected: Server starts from scratch on `127.0.0.1:3000`, `/login` returns a live HTML page, and the test suite passes.
result: pass
evidence:
  - Fresh server listened on `127.0.0.1:3000`.
  - `GET /login` returned `200 OK`.
  - `npm test` passed 2 test files and 5 tests.

### 2. Login Page
expected: The login page shows the local Session Hijacking lab form with fictitious user fields.
result: pass
evidence:
  - `GET /login` returned the page title `Login - Laboratorio de Session Hijacking`.
  - The response included `Entrar no laboratorio`.

### 3. Protected Dashboard Without Session
expected: Visiting `/dashboard` without a session redirects to `/login`.
result: pass
evidence:
  - `GET /dashboard` returned `302 Found`.
  - Response header included `Location: /login`.

### 4. Invalid Credentials
expected: Submitting invalid fake credentials returns an error message without authenticating the user.
result: pass
evidence:
  - `POST /login` with `alice` / `wrong` returned `401 Unauthorized`.
  - Response included `Credenciais invalidas`.

### 5. Valid Fake Login
expected: Submitting a documented fake user redirects to the protected dashboard.
result: pass
evidence:
  - `POST /login` with `alice` / `alice123` returned `302 Found`.
  - Response header included `Location: /dashboard`.

### 6. Vulnerable Session Cookie Evidence
expected: Valid login sets a `sid` cookie with an expiration and without `HttpOnly`, `Secure`, or `SameSite`.
result: pass
evidence:
  - `Set-Cookie` included `sid=`.
  - `Set-Cookie` included `Expires=`.
  - `Set-Cookie` did not include `HttpOnly`.
  - `Set-Cookie` did not include `Secure`.
  - `Set-Cookie` did not include `SameSite`.

### 7. Authenticated Dashboard Data
expected: Reusing the session cookie from valid login shows the protected dashboard with fictitious private data.
result: pass
evidence:
  - `GET /dashboard` with the cookie jar returned `200 OK`.
  - Response included `Alice Demo`.
  - Response included `Relatorio interno ficticio`.

## Summary

total: 7
passed: 7
issues: 0
pending: 0
skipped: 0
blocked: 0

## Gaps

[none]
