# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.0 - MVP

**Shipped:** 2026-06-09  
**Phases:** 5 | **Plans:** 10 | **Tasks:** 31

### What Was Built

- Local Express/`express-session` lab with fake login, protected dashboard, and fictitious data.
- Vulnerable `sid` cookie mode and reproducible local session reuse attack path.
- Fixed session mode with safer cookie attributes, short expiration, regeneration, and logout invalidation.
- Before/after verification docs and tests proving the mitigation story.
- Final presentation package with PDF slides, editable source, timed roteiro, evidence checklist, references, UAT, and security verification.

### What Worked

- Vertical phases kept the project demonstrable at every step.
- Browser DevTools as the primary demo path plus `curl.exe` as fallback made the attack easy to present and reproduce.
- Keeping the security claim honest around bearer cookies avoided overpromising what cookie flags can do.
- Static HTML slides gave an editable source and a reliable local PDF export path.

### What Was Inefficient

- Some GSD helper state fields did not fully match the local free-form STATE/ROADMAP format, so a few final narrative fields needed manual cleanup.
- The bundled Playwright package was incomplete for PDF export, so the deck export fell back to headless Microsoft Edge.
- The branch name stayed from Phase 4 until ship time, requiring a Phase 5 branch before PR creation.

### Patterns Established

- Presentation artifacts live under `docs/presentation/`.
- Security demos should pair every manual step with a command/test fallback.
- Final verification should include tests, artifact checks, UAT, and security threat closure before ship.

### Key Lessons

1. A local-only vulnerable app can still be ethically and convincingly demonstrated when fake data, redaction, and scope boundaries are explicit.
2. Session Hijacking mitigation should be framed as reducing exposure and invalidating stale sessions, not as making an active copied bearer cookie impossible to replay.
3. Keep editable presentation source next to the PDF so last-minute academic changes do not require external tooling.

### Cost Observations

- Model mix: not tracked.
- Sessions: one milestone execution thread with multiple GSD workflow turns.
- Notable: Most rework was documentation/state hygiene, not app implementation.

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Sessions | Phases | Key Change |
|-----------|----------|--------|------------|
| v1.0 | 1 | 5 | Established a full GSD loop from project setup through PR ship and milestone archive. |

### Cumulative Quality

| Milestone | Tests | Coverage | Security Gate |
|-----------|-------|----------|---------------|
| v1.0 | 12 passing Vitest/Supertest tests | Attack, fix, logout, cookie attributes, and mitigation verification | 9/9 Phase 5 threats closed; no open audit items |

### Top Lessons

1. Pairing manual classroom steps with automated tests makes the demo safer to rehearse.
2. Documentation must state the localhost/`Secure` nuance clearly to avoid confusing the audience.
