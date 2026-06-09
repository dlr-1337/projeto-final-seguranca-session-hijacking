# Phase 4: Mitigation Verification - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md - this log preserves the alternatives considered.

**Date:** 2026-06-09
**Phase:** 4-Mitigation Verification
**Areas discussed:** Proof path, Observable denial, HTTPS localhost framing, Reset and rehearsal artifacts

---

## Proof Path

| Option | Description | Selected |
|--------|-------------|----------|
| Before/after replay plus logout/expiration checks | Use Phase 2 vulnerable replay as the before baseline, then prove fixed-mode denial through obsolete-cookie, logout, or expiration scenarios. | yes |
| Only manual browser replay | Keep the proof entirely in the browser without focused regression coverage. | |
| Only automated tests | Skip the manual before/after rehearsal path and rely on test output only. | |

**User's choice:** Auto-selected recommended option because `--auto` was provided.
**Notes:** The selected path avoids overclaiming. A manually copied active session cookie can still authenticate until the server rejects it.

---

## Observable Denial

| Option | Description | Selected |
|--------|-------------|----------|
| Use existing 302 redirect to /login | Assert the current `requireAuth` behavior as the canonical denial for invalid or expired sessions. | yes |
| Change protected dashboard to return 401 | Alter the page behavior to match one possible requirement wording. | |
| Add a new API-only verification endpoint | Create a separate endpoint just for mitigation checks. | |

**User's choice:** Auto-selected recommended option because `--auto` was provided.
**Notes:** `302 Location: /login` is already visible in the app and existing tests.

---

## HTTPS Localhost Framing

| Option | Description | Selected |
|--------|-------------|----------|
| Use browser fallback plus secure-path automated proof | Browser rehearsal uses HTTP-local fixed fallback; tests prove the `secure: true` path with HTTPS proxy headers. | yes |
| Build a full self-signed HTTPS workflow now | Add local certificate generation and browser trust instructions. | |
| Ignore Secure locally and only show HttpOnly/SameSite | Avoid discussing the transport limitation in the demo. | |

**User's choice:** Auto-selected recommended option because `--auto` was provided.
**Notes:** The docs must clearly say `Secure` requires HTTPS for real protection.

---

## Reset and Rehearsal Artifacts

| Option | Description | Selected |
|--------|-------------|----------|
| Checklist doc, README link, focused test, reset commands | Produce a concise verification doc, link it from README, add a narrow regression test, and document Windows-friendly reset. | yes |
| Only update docs | Avoid adding regression coverage. | |
| Expand into full automated security suite | Pull the deferred v2 test suite into Phase 4. | |

**User's choice:** Auto-selected recommended option because `--auto` was provided.
**Notes:** Keep the output rehearsable inside the 25-minute presentation boundary.

## the agent's Discretion

- Exact helper names and screenshot checklist wording.
- Whether to create `docs/mitigation-verification.md` or tightly extend existing docs, though a new focused doc is preferred.
- Exact expired-session test mechanics, as long as the scope stays narrow.

## Deferred Ideas

- Full self-signed HTTPS certificate workflow.
- Docker packaging.
- Full automated cookie/session test suite.
- Final slides, PDF export, references formatting, and timed oral script.
