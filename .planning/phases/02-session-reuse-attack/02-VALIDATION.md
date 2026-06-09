---
phase: 02
slug: session-reuse-attack
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-06-09
---

# Phase 02 - Validation Strategy

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
- **Before `$gsd-verify-work`:** Full suite must be green and docs must contain the Phase 2 walkthrough link.
- **Max feedback latency:** 10 seconds.

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | ATK-01 | T-02-01 | Local-only attack instructions | docs | `Select-String -Path docs/session-reuse-attack.md -Pattern "127.0.0.1"` | yes after task | pending |
| 02-01-02 | 01 | 1 | ATK-01 | T-02-01 | README links to controlled walkthrough | docs | `Select-String -Path README.md -Pattern "session-reuse-attack"` | yes after task | pending |
| 02-02-01 | 02 | 2 | VULN-02, ATK-02 | T-02-03 | Separate client can replay `sid` in vulnerable mode | integration | `npm test` | yes after task | pending |
| 02-02-02 | 02 | 2 | ATK-01, ATK-02 | T-02-01 | Evidence checklist avoids real targets | docs | `Select-String -Path docs/session-reuse-attack.md -Pattern "sem senha"` | yes after task | pending |

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements:

- `package.json` already defines `npm test`.
- `vitest.config.js` already exists.
- `tests/session-cookie.test.js` already proves the vulnerable cookie baseline.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Browser DevTools cookie copy and replay in a second local client | ATK-01, ATK-02 | Browser profile setup and DevTools cookie editing are presentation behaviors | Follow `docs/session-reuse-attack.md` on `127.0.0.1`; verify second client redirects to `/login` before replay and reaches `/dashboard` after replay. |

---

## Validation Sign-Off

- [x] All tasks have automated or manual verification.
- [x] Sampling continuity: no 3 consecutive tasks without verification.
- [x] Wave 0 covers existing test infrastructure.
- [x] No watch-mode flags in validation commands.
- [x] Feedback latency < 10s.
- [x] `nyquist_compliant: true` set in frontmatter.

**Approval:** pending execution
