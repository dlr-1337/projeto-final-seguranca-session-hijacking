# Phase 02: Session Reuse Attack - Pattern Map

## PATTERN MAPPING COMPLETE

## Files This Phase Is Expected To Touch

| Target | Role | Closest Existing Analog | Pattern To Reuse |
|--------|------|-------------------------|------------------|
| `docs/session-reuse-attack.md` | New focused walkthrough | `README.md` | Concise Portuguese classroom instructions, fake-user-only warning, command blocks. |
| `README.md` | Link/update existing project docs | `README.md` | Keep phase sections short and point detailed steps to the focused doc. |
| `tests/session-reuse-attack.test.js` or `tests/session-cookie.test.js` | Focused replay proof | `tests/session-cookie.test.js` | Use `createApp()`, Supertest form login, extract `sid` from `set-cookie`, assert dashboard content. |

## Relevant Existing Patterns

### Supertest app setup

Source: `tests/session-cookie.test.js`

- Import `createApp` from `../src/server`.
- Create a fresh app inside each test.
- Use `.post("/login").type("form").send({ username, password })` for login.
- Read `response.headers["set-cookie"]` and locate the cookie starting with `sid=`.

### Auth denial path

Source: `src/middleware/require-auth.js`

- Unauthenticated dashboard access redirects to `/login`.
- Replay proof should assert this denial before adding the copied cookie.

### Vulnerable cookie source of truth

Source: `src/session/vulnerable-session.js`

- Cookie name is `sid`.
- Vulnerable attributes are intentionally explicit: `httpOnly: false`, `secure: false`, `sameSite: false`, `maxAge: ONE_DAY_MS`.

### Documentation voice

Source: `README.md`

- Use simple local commands.
- Keep users fictitious: `alice` / `alice123`, `bruno` / `bruno123`.
- Include an ethical warning and avoid external targets.

## Executor Notes

- Prefer a new test file if it makes the replay proof easier to read; extend the existing test file if the executor wants to keep all session-cookie tests together.
- Documentation should use Windows-friendly examples where possible, especially `curl.exe`.
- Do not modify secure/fixed session behavior in this phase.
