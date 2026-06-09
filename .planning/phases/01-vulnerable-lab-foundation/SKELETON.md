# Walking Skeleton - Projeto Final: Session Hijacking

**Phase:** 1
**Generated:** 2026-06-09

## Capability Proven End-to-End

A team member can start a local Express app, log in with fictitious credentials, and view fake private dashboard data served by the same local process.

## Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Node.js + Express | Small enough for a 25-minute academic demo and easy to inspect in code. |
| UI | Server-rendered HTML with EJS or plain templates | Keeps browser cookie behavior visible without SPA complexity. |
| Data layer | In-memory fake users plus server-side session store | No real data or database is needed to prove session hijacking locally. |
| Auth | `express-session` session ID cookie | Matches the teaching goal: the browser holds only a session identifier. |
| Deployment target | Localhost documented run command | The vulnerable lab must remain local and authorized. |
| Directory layout | `src/` for app code, `tests/` for route/session tests, README for demo instructions | Simple structure that later phases can compare and explain. |

## Stack Touched in Phase 1

- [ ] Project scaffold (Node package, scripts, test runner)
- [ ] Routing - login and dashboard routes
- [ ] Data layer - fake user read plus session write/read; no database by project decision
- [ ] UI - login form and protected dashboard page
- [ ] Deployment - documented local full-stack run command

## Out of Scope (Deferred to Later Slices)

- Cookie reuse attack walkthrough and evidence capture.
- Fixed session mode and secure cookie flags.
- Real logout invalidation.
- Public deployment.
- Docker packaging.
- Real database or real user data.
- Slides and final presentation script.

## Subsequent Slice Plan

- Phase 2: Reuse the vulnerable `sid` cookie in another local client to prove Session Hijacking.
- Phase 3: Add fixed session configuration, secure cookie attributes, expiration, and logout invalidation.
- Phase 4: Prove the same reuse attempt fails after mitigation.
- Phase 5: Package slides, references, and the final 25-minute script.

