---
phase: 01
slug: vulnerable-lab-foundation
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-06-09
---

# Phase 01 - Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest + Supertest |
| **Config file** | `vitest.config.js` created in Plan 01-01 |
| **Quick run command** | `npm test` |
| **Full suite command** | `npm test` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm test` when dependencies and tests exist.
- **After every plan wave:** Run `npm test`.
- **Before `$gsd-verify-work`:** Full suite must be green.
- **Max feedback latency:** 30 seconds.

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01-01 | 1 | APP-01 | T-01-01 | Local app starts and login page responds | integration | `npm test` | W0 | pending |
| 01-01-02 | 01-01 | 1 | APP-02 | T-01-02 | Fake user can reach protected dashboard after login | integration | `npm test` | W0 | pending |
| 01-02-01 | 01-02 | 2 | VULN-01 | T-01-03 | Vulnerable cookie settings are explicitly observable | integration | `npm test` | W0 | pending |
| 01-02-02 | 01-02 | 2 | APP-02 | T-01-04 | Unauthenticated dashboard access is denied or redirected | integration | `npm test` | W0 | pending |

*Status: pending / green / red / flaky*

---

## Wave 0 Requirements

- [ ] `tests/auth.test.js` - route and session behavior tests for APP-01, APP-02, and VULN-01.
- [ ] `vitest.config.js` - Node test environment configuration.
- [ ] `package.json` - `test` script using `vitest --run`.
- [ ] `devDependencies` - `vitest` and `supertest`.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Browser DevTools cookie inspection | VULN-01 | The oral demo needs a visible browser artifact | Log in locally, open DevTools Application/Storage cookies, confirm cookie name `sid` and vulnerable attributes. |

---

## Validation Sign-Off

- [x] All tasks have automated verify or Wave 0 dependencies.
- [x] Sampling continuity: no 3 consecutive tasks without automated verify.
- [x] Wave 0 covers all MISSING references.
- [x] No watch-mode flags.
- [x] Feedback latency < 30s.
- [x] `nyquist_compliant: true` set in frontmatter.

**Approval:** approved 2026-06-09
