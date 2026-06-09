---
phase: 04
slug: mitigation-verification
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-06-09
---

# Phase 04 - Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest with Supertest |
| **Config file** | `vitest.config.js` |
| **Quick run command** | `npm test` |
| **Full suite command** | `npm test` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm test` when code or tests changed; run documentation checks when docs changed.
- **After every plan wave:** Run `npm test`.
- **Before `$gsd-verify-work`:** Full suite must be green and the Phase 4 checklist must document HTTPS/localhost limitations.
- **Max feedback latency:** 10 seconds.

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 04-01-T1 | 01 | 1 | FIX-03 | T-04-01 | Vulnerable replay baseline remains demonstrably successful | integration | `npm test` | yes after task | pending |
| 04-01-T2 | 01 | 1 | FIX-03 | T-04-02 | Fixed obsolete/logged-out cookies redirect to `/login` | integration | `npm test` | yes after task | pending |
| 04-01-T3 | 01 | 1 | FIX-03 | T-04-03 | Checklist explains reset and HTTPS limitations | docs | `Select-String -Path docs/mitigation-verification.md -Pattern "FIX-03","/login","Secure","127.0.0.1"` | yes after task | pending |
| 04-02-T1 | 02 | 2 | FIX-03 | T-04-03 | README links the Phase 4 rehearsal path | docs | `Select-String -Path README.md -Pattern "mitigation-verification"` | yes after task | pending |
| 04-02-T2 | 02 | 2 | FIX-03 | T-04-01 | Full before/after rehearsal remains local-only and fake-data-only | docs | `Select-String -Path docs/mitigation-verification.md -Pattern "npm run dev","npm run dev:fixed","alice"` | yes after task | pending |

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements:

- `package.json` already defines `npm test`.
- `vitest.config.js` already exists.
- `tests/session-reuse-attack.test.js` already proves the vulnerable baseline.
- `tests/session-logout.test.js` already proves post-logout fixed cookie rejection.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Browser before/after rehearsal with DevTools and two clients | FIX-03 | The presentation flow depends on browser profile state and visual observation | Follow `docs/mitigation-verification.md`; verify vulnerable replay succeeds, fixed obsolete/logged-out cookie redirects to `/login`, and reset steps are clear. |

---

## Validation Sign-Off

- [x] All tasks have automated or manual verification.
- [x] Sampling continuity: no 3 consecutive tasks without verification.
- [x] Wave 0 covers existing test infrastructure.
- [x] No watch-mode flags in validation commands.
- [x] Feedback latency < 10s.
- [x] `nyquist_compliant: true` set in frontmatter.

**Approval:** pending execution
