# Phase 01 - Pattern Map

**Generated:** 2026-06-09
**Status:** No existing application code to map

## Summary

The repository does not yet contain application source files. Phase 1 creates the first code patterns for the project: Express server setup, server-rendered pages, fake user fixtures, vulnerable session configuration, route tests, and README evidence.

## Planned File Roles

| File | Role | Existing Analog |
|------|------|-----------------|
| `package.json` | Node project manifest and scripts | None |
| `src/server.js` | Express app factory and local server entry point | None |
| `src/data/users.js` | Fictitious user fixtures and dashboard data | None |
| `src/session/vulnerable-session.js` | Intentionally insecure session middleware configuration | None |
| `src/middleware/require-auth.js` | Dashboard route guard based on server-side session state | None |
| `src/views/*.ejs` | Login and dashboard templates | None |
| `src/public/styles.css` | Small local stylesheet following UI-SPEC tokens | None |
| `tests/*.test.js` | Vitest + Supertest behavior tests | None |
| `README.md` | Local run commands, fake credentials, and demo inspection notes | None |

## Guidance For Executors

- Establish simple CommonJS modules unless a later plan explicitly changes the module system.
- Export `createApp()` from `src/server.js` so Supertest can exercise routes without binding a port.
- Keep session configuration isolated enough that Phase 3 can add a fixed-mode comparison without rewriting the entire app.
- Do not infer production patterns from this lab. The vulnerable settings are intentional and local-only.

