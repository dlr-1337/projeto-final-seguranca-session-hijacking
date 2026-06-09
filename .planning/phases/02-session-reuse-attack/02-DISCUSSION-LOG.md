# Phase 2: Session Reuse Attack - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md - this log preserves the alternatives considered.

**Date:** 2026-06-09
**Phase:** 2-Session Reuse Attack
**Areas discussed:** Attack path and clients, Cookie transfer mechanics, Proof and evidence, Safety and repeatability, Phase 2 artifacts
**Mode:** `--all --auto`; all gray areas selected, recommended defaults auto-chosen.

---

## Attack path and clients

| Option | Description | Selected |
|--------|-------------|----------|
| Browser plus DevTools primary | Most visual classroom demo; shows the cookie being copied and reused between local clients. | Yes |
| cURL or Postman primary | More compact, but less visual for an oral demonstration. | No |
| Browser only | Simple, but lacks a reproducible terminal backup. | No |

**User's choice:** Auto-selected recommended default: Browser plus DevTools primary, with cURL as backup.
**Notes:** The roadmap already calls for browser/DevTools and an alternative via Postman or cURL. cURL is favored because it is easy to reproduce in the repo notes.

---

## Cookie transfer mechanics

| Option | Description | Selected |
|--------|-------------|----------|
| Copy sid value and Cookie header explicitly | Keeps the attack focused on the vulnerable session cookie and works for browser and cURL paths. | Yes |
| Export full browser storage | Broader than needed and harder to explain safely. | No |
| Add helper endpoint to reveal the session | Would make the app less realistic and change the demonstration surface. | No |

**User's choice:** Auto-selected recommended default: copy only the `sid` cookie value or `Cookie: sid=<value>`.
**Notes:** Preserve exact cookie value/encoding. Do not add an endpoint that leaks session IDs.

---

## Proof and evidence

| Option | Description | Selected |
|--------|-------------|----------|
| Dashboard access without password plus fake private data | Proves the second client obtained authenticated access using only the reused cookie. | Yes |
| Status code and cookie inspection only | Too abstract for a classroom demo. | No |
| Add new dramatic private data | Not needed; existing fake dashboard data already proves access. | No |

**User's choice:** Auto-selected recommended default: second client reaches `/dashboard` and sees fake private data.
**Notes:** Add one focused Supertest proof test, but do not expand into the deferred full cookie/session test suite.

---

## Safety and repeatability

| Option | Description | Selected |
|--------|-------------|----------|
| Local-only guardrails and reset steps | Keeps the demo ethical, authorized, and repeatable. | Yes |
| External network/tunnel demo | Out of scope and unnecessary for the academic requirement. | No |
| Broader attack techniques | Would distract from Session Hijacking and exceed the phase boundary. | No |

**User's choice:** Auto-selected recommended default: local-only guardrails and reset steps.
**Notes:** Use fake users only. Avoid real targets, network sniffing, XSS, CSRF, malware-like tooling, and public deployment.

---

## Phase 2 artifacts

| Option | Description | Selected |
|--------|-------------|----------|
| Dedicated walkthrough plus README link and focused test | Gives downstream planning a clear doc/test target while staying inside Phase 2. | Yes |
| README only | Simpler, but likely too cramped for a step-by-step attack flow. | No |
| Slides now | Final slides belong to Phase 5. | No |

**User's choice:** Auto-selected recommended default: create a focused attack walkthrough, link it from README, and add a focused proof test.
**Notes:** Preferred document path is `docs/session-reuse-attack.md`.

## the agent's Discretion

- Exact screenshot filenames and evidence checklist wording.
- Whether the replay test extends `tests/session-cookie.test.js` or lives in a new focused test file.
- Whether Postman appears as a short equivalent note after the cURL path.

## Deferred Ideas

- Fixed cookie attributes, expiration changes, session regeneration, and logout invalidation remain Phase 3.
- Demonstrating failed replay after mitigation remains Phase 4.
- Final slides, PDF export, and timed oral script remain Phase 5.
- Docker, full automated cookie/session tests, detailed HTTPS certificate setup, XSS, CSRF, network sniffing, public deployment, and real targets stay out of v1 Phase 2 scope.
