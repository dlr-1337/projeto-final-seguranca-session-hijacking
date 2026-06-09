---
phase: "02"
slug: session-reuse-attack
status: verified
threats_open: 0
asvs_level: 1
created: 2026-06-09
updated: 2026-06-09
---

# Phase 02 - Security

Per-phase security contract: verify the threats declared in the Phase 2 plans and confirm every mitigation has evidence in the delivered docs/tests.

## Security Scope Note

Phase 2 intentionally demonstrates vulnerable session replay in a local classroom lab. The vulnerable cookie behavior itself is not accepted as production-safe; it is the planned teaching baseline for Phase 3 fixes and Phase 4 mitigation verification. This security audit verifies the Phase 2 safety controls: local-only scope, fake data, no external targets, and no accidental proof using the original authenticated client.

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| Local browser/client to Express lab | User or test client sends credentials/cookies to the local app. | Fake credentials, `sid` cookie, fake dashboard data. |
| Documentation to presenter | Walkthrough explains an attack technique for a controlled academic demo. | Local-only instructions, ethical warnings, evidence checklist. |
| Automated test to Express app | Vitest/Supertest simulates login and cookie replay. | Fake `alice` session cookie and fake dashboard HTML. |

## Threat Register

| Threat ID | Category | Component | Disposition | Mitigation | Status |
|-----------|----------|-----------|-------------|------------|--------|
| 02-01/T-02-01 | Misuse | Attack walkthrough | mitigate | Keep every walkthrough path local-only with fake users and explicit ethical warning. | closed |
| 02-01/T-02-02 | Misuse | cURL backup command | mitigate | Use `<copied-sid-value>` placeholder, localhost URL, and lab-cookie-only wording. | closed |
| 02-01/T-02-03 | Scope drift | Walkthrough scope | mitigate | Explicitly forbid external targets, sniffing, XSS/CSRF, and leave mitigations for later phases. | closed |
| 02-02/T-02-01 | Misuse | Replay proof and docs | mitigate | Frame replay as local vulnerable-lab evidence with fake users and ethical warning. | closed |
| 02-02/T-02-02 | Test validity | Replay proof | mitigate | Use a separate request for replay, assert denial before replay, and avoid `request.agent`. | closed |
| 02-02/T-02-03 | Data exposure | Evidence checklist | mitigate | Capture only fake localhost dashboard evidence and prohibit real data/cookies. | closed |

## Verification Evidence

| Threat ID | Evidence |
|-----------|----------|
| 02-01/T-02-01 | `docs/session-reuse-attack.md:5` limits use to the authorized local lab, forbids real accounts/data and external targets, and names `127.0.0.1`/localhost only. |
| 02-01/T-02-02 | `docs/session-reuse-attack.md:97` uses `http://127.0.0.1:3000/dashboard` and `Cookie: sid=<copied-sid-value>`; line 100 says to substitute only the lab `sid`. |
| 02-01/T-02-03 | `docs/session-reuse-attack.md:5` forbids sniffing, XSS, CSRF, and external targets; line 115 defers real mitigations to later phases. |
| 02-02/T-02-01 | `README.md:68-70` links the local walkthrough and describes DevTools/cURL replay in another local client; `docs/session-reuse-attack.md:5` keeps ethical framing. |
| 02-02/T-02-02 | `tests/session-reuse-attack.test.js:18-21` asserts denial before replay; lines 34-36 replay only the copied cookie via a separate `request(app)` call; grep found no `request.agent`. |
| 02-02/T-02-03 | `docs/session-reuse-attack.md:121-134` lists local/fake evidence points and says screenshots/notes must contain only fake dashboard data such as `Alice Demo`, `LAB-ALICE-001`, and `Relatorio interno ficticio`. |

## Accepted Risks Log

No accepted risks.

## Security Audit Trail

| Audit Date | Threats Total | Closed | Open | Run By |
|------------|---------------|--------|------|--------|
| 2026-06-09 | 6 | 6 | 0 | Codex inline audit |

## Sign-Off

- [x] All threats have a disposition.
- [x] Accepted risks documented in Accepted Risks Log.
- [x] `threats_open: 0` confirmed.
- [x] `status: verified` set in frontmatter.

**Approval:** verified 2026-06-09
