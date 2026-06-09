# Phase 1: Vulnerable Lab Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md - this log preserves the alternatives considered.

**Date:** 2026-06-09
**Phase:** 1-Vulnerable Lab Foundation
**Areas discussed:** App shell and routing, Fake identity and protected data, Vulnerable session configuration, Local run and evidence, Phase boundary

---

## App Shell and Routing

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal Express server-rendered app | Fast to build and explain; keeps the demo focused on sessions. | selected |
| Full SPA/frontend framework | More UI flexibility, but unnecessary for the security demonstration. | |
| API-only service | Useful for curl-only demos, but weaker for browser cookie inspection. | |

**User's choice:** Auto-selected recommended default because `--auto` was provided.
**Notes:** Phase 1 should establish a compact local app with login and dashboard routes.

---

## Fake Identity and Protected Data

| Option | Description | Selected |
|--------|-------------|----------|
| In-memory fake users with private-looking dashboard data | No database; enough to prove authenticated access with fictitious data. | selected |
| Database-backed accounts | More realistic, but out of scope for the MVP demo. | |
| Single generic demo user | Simpler, but less convincing when proving user-specific access. | |

**User's choice:** Auto-selected recommended default because `--auto` was provided.
**Notes:** Data must remain fictitious and safe for classroom presentation.

---

## Vulnerable Session Configuration

| Option | Description | Selected |
|--------|-------------|----------|
| Explicit insecure `sid` cookie with readable flags and long expiration | Makes the vulnerability visible in code and browser DevTools. | selected |
| Rely on framework defaults | Less didactic and harder to compare with the fixed mode later. | |
| Mix vulnerable and fixed settings now | Blurs the before/after story and belongs to later phases. | |

**User's choice:** Auto-selected recommended default because `--auto` was provided.
**Notes:** Use `httpOnly: false`, `secure: false`, `sameSite: false` or omitted, and long `maxAge` such as 24 hours.

---

## Local Run and Evidence

| Option | Description | Selected |
|--------|-------------|----------|
| Simple npm scripts plus README instructions and clearly visible vulnerable code | Reproducible on Windows without extra infrastructure. | selected |
| Docker packaging | Useful enhancement, but deferred to v2. | |
| HTTPS certificate setup now | Important for fixed-mode explanation, but not required for Phase 1. | |

**User's choice:** Auto-selected recommended default because `--auto` was provided.
**Notes:** Document `npm install`, `npm run dev`, `npm start`, demo credentials, and where to inspect the vulnerable cookie settings.

---

## Phase Boundary

| Option | Description | Selected |
|--------|-------------|----------|
| Do not implement the attack walkthrough or fixed mode yet | Preserves the roadmap sequence and keeps Phase 1 small. | selected |
| Include the attack walkthrough now | Belongs to Phase 2. | |
| Start the fixed mode now | Belongs to Phase 3 and Phase 4. | |

**User's choice:** Auto-selected recommended default because `--auto` was provided.
**Notes:** Phase 1 builds the vulnerable foundation only.

---

## the agent's Discretion

- Exact fake usernames and dashboard text.
- EJS versus plain server-rendered HTML.
- Simple file layout details, provided the vulnerable session settings remain easy to inspect.

## Deferred Ideas

- Docker packaging remains v2.
- Detailed self-signed HTTPS setup remains v2 or later documentation.
- Full automated cookie/session tests remain v2.
