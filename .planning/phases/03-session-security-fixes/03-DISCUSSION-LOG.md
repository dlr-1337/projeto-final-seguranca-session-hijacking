# Phase 3: Session Security Fixes - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md - this log preserves the alternatives considered.

**Date:** 2026-06-09T12:45:28.2923794-03:00
**Phase:** 3-Session Security Fixes
**Areas discussed:** Fixed mode selection, Secure cookie policy, Session lifecycle on login and logout, Didactic before/after evidence

---

## Fixed Mode Selection

| Option | Description | Selected |
|--------|-------------|----------|
| Explicit fixed mode via `SESSION_MODE` | Keep vulnerable mode available and add an explicit corrected mode through config/script. | yes |
| Replace vulnerable mode entirely | Convert the app to fixed-only behavior. | no |
| Create a separate app | Duplicate the app into vulnerable and fixed copies. | no |

**User's choice:** `[auto]` selected explicit fixed mode as the recommended default.
**Notes:** This preserves the existing Phase 2 walkthrough while letting Phase 3 add corrected behavior without source edits between demo steps.

---

## Secure Cookie Policy

| Option | Description | Selected |
|--------|-------------|----------|
| Strict secure cookie policy | Use HttpOnly, Secure, SameSite Strict, short maxAge, Path=/, no Domain, and `__Host-session` when HTTPS supports it. | yes |
| Lax policy for easier HTTP demo | Use weaker settings so plain HTTP browser testing is simpler. | no |
| Only document the policy | Explain secure cookies without adding the corrected code path. | no |

**User's choice:** `[auto]` selected strict secure cookie policy as the recommended default.
**Notes:** Any plain-HTTP fallback must be labeled as a local inspection/testing fallback, not as the corrected secure posture.

---

## Session Lifecycle On Login And Logout

| Option | Description | Selected |
|--------|-------------|----------|
| Correct login and logout lifecycle | Regenerate on fixed-mode login if practical, destroy server session on logout, clear the client cookie, and redirect safely. | yes |
| Only clear the cookie | Remove the browser cookie but leave server-side session state alive. | no |
| Defer logout | Leave logout behavior for a later phase. | no |

**User's choice:** `[auto]` selected corrected lifecycle as the recommended default.
**Notes:** A real logout is required by FIX-02. `POST /logout` is preferred over state-changing GET.

---

## Didactic Before/After Evidence

| Option | Description | Selected |
|--------|-------------|----------|
| Focused Phase 3 evidence | Add docs and focused tests for fixed cookie attributes, expiration, mode switching, and logout invalidation. | yes |
| Full mitigation proof now | Move the replay-fails demonstration from Phase 4 into Phase 3. | no |
| Docs only | Document the corrections without automated checks. | no |

**User's choice:** `[auto]` selected focused Phase 3 evidence as the recommended default.
**Notes:** Phase 4 remains responsible for proving that the copied cookie replay fails after mitigations.

---

## the agent's Discretion

- Exact helper/module names for fixed session configuration.
- Exact npm script names and Windows-friendly command wording.
- Exact approach for local HTTP fallback in tests, as long as the corrected path remains visibly secure.

## Deferred Ideas

- Full replay-fails proof after mitigation - Phase 4.
- Final slides and timed presentation script - Phase 5.
- Detailed self-signed certificate installation workflow - v2 unless a minimal local HTTPS helper is needed.
