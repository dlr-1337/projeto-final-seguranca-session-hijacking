---
phase: 05-presentation-package
plan: 05-01
subsystem: docs
tags: [presentation, security, session-hijacking, pdf-source]
requires:
  - phase: 02-session-reuse-attack
    provides: vulnerable replay walkthrough and cURL fallback
  - phase: 03-session-security-fixes
    provides: fixed cookie/session lifecycle explanation
  - phase: 04-mitigation-verification
    provides: before/after mitigation proof and denial wording
provides:
  - Editable 12-slide HTML source for the Session Hijacking presentation
  - Timed 25-minute speaker script with two-presenter split
  - Evidence checklist with redaction rules
  - Official and local references for the deck
affects: [presentation-package, docs, demo-rehearsal]
tech-stack:
  added: []
  patterns: [static-html-slide-source, timed-speaker-script, evidence-redaction-checklist]
key-files:
  created:
    - docs/presentation/slides.html
    - docs/presentation/speaker-script.md
    - docs/presentation/evidence-checklist.md
    - docs/presentation/references.md
  modified: []
key-decisions:
  - "Use local static HTML as editable slide source."
  - "Use placeholders Integrante 1 and Integrante 2 because names are not in the repo."
  - "Keep cookie values redacted in all presentation evidence."
patterns-established:
  - "Presentation artifacts live under docs/presentation/."
  - "Slides carry short bullets; speaker-script carries timing and detailed demo actions."
requirements-completed:
  - DOC-01
  - DOC-02
duration: 10 min
completed: 2026-06-09
---

# Phase 05 Plan 01: Create Presentation Source and Script Draft Summary

**Editable slide source, timed two-presenter roteiro, evidence checklist, and official references for the final Session Hijacking presentation**

## Performance

- **Duration:** 10 min
- **Started:** 2026-06-09T14:34:00-03:00
- **Completed:** 2026-06-09T14:44:02-03:00
- **Tasks:** 3
- **Files modified:** 4

## Accomplishments

- Created a printable 12-slide HTML deck covering the required Session Hijacking narrative, vulnerable/fixed code snippets, OWASP framing, conclusion, and references.
- Created a 25-minute speaker script with the required 7/8/8/2 timing, two-presenter ownership, demo commands, reset steps, expected observations, and cURL/test fallback.
- Created a presentation evidence checklist with local-only boundaries and explicit cookie-value redaction rules.
- Created an official/local references file for OWASP, MDN, Express, code snippets, and tests.

## Task Commits

Each task was committed atomically:

1. **Task 1: Create editable slide source with required narrative** - `ea2eddc` (docs)
2. **Task 2: Create timed speaker-script draft** - `4fdc505` (docs)
3. **Task 3: Create references and evidence checklist** - `4c9ddbc` (docs)

## Files Created/Modified

- `docs/presentation/slides.html` - Printable/editable 12-slide source for the final PDF deck.
- `docs/presentation/speaker-script.md` - Timed 25-minute roteiro with both integrantes and exact demo commands.
- `docs/presentation/evidence-checklist.md` - Evidence capture checklist and redaction rules.
- `docs/presentation/references.md` - Official and local references for slide citations.

## Decisions Made

- Used `docs/presentation/slides.html` as the editable source because it can be exported locally to PDF without hosted slide tooling.
- Used `Integrante 1` and `Integrante 2` placeholders because exact names were not available in the repository.
- Kept evidence redaction as an explicit checklist item so final slides do not reveal raw session cookie values.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Normalized a corrupted non-ASCII slide title**
- **Found during:** Task 2 (Create timed speaker-script draft)
- **Issue:** Re-reading `slides.html` showed a corrupted accented word in the slide 6 title.
- **Fix:** Changed the slide title to ASCII text: `Demonstracao do ataque local`.
- **Files modified:** `docs/presentation/slides.html`
- **Verification:** `Select-String -Path docs/presentation/slides.html -Pattern "Demonstra"` found the corrected title.
- **Committed in:** `4fdc505`

---

**Total deviations:** 1 auto-fixed (1 missing critical)
**Impact on plan:** The fix preserves the planned slide content and improves PDF/readability. No scope expansion.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Plan 05-02 can now review the local slide source, export `docs/presentation/session-hijacking-presentation.pdf`, create the presentation package index, update README, and run final checks.

---
*Phase: 05-presentation-package*
*Completed: 2026-06-09*
