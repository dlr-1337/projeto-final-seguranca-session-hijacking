# Phase 5: Presentation Package - Research

**Researched:** 2026-06-09
**Domain:** Academic security presentation package for a local Session Hijacking lab
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Use a before/after narrative: concept, vulnerable local lab, copied `sid` replay, secure cookie/session fixes, mitigation verification, and conclusion.
- Fit the required timing: 7 minutes concept, 8 minutes attack, 8 minutes correction/verification, and 2 minutes conclusion.
- Create local repo-owned presentation artifacts, preferably under `docs/presentation/`, plus an exported PDF.
- Show vulnerable and corrected code side by side from `src/session/vulnerable-session.js` and `src/session/fixed-session.js`.
- Include proof from `tests/session-reuse-attack.test.js`, `tests/session-mitigation-verification.test.js`, `tests/session-fixed-cookie.test.js`, and `tests/session-logout.test.js`.
- Do not expose raw real cookie values in slides; redact cookie values and use only local/fake lab data.
- Split the presentation between two integrantes and include exact Windows-friendly commands.
- Frame the cookie as a bearer credential; do not overclaim that an active copied server-side session cookie becomes impossible to replay.
- Map the issue to OWASP Top 10 2025 A07 Authentication Failures, with a note for the 2021 A07 naming if useful.
- Explain the `Secure`/localhost nuance: `npm run dev:fixed` is HTTP-local inspection only; the secure path is validated by tests.

### the agent's Discretion
- Exact filenames, slide source format, visual layout, screenshot placeholder names, and PDF export mechanism.
- Exact slide bullet wording and speaker notes, as long as timing and required topics are preserved.

### Deferred Ideas (OUT OF SCOPE)
- Full self-signed HTTPS certificate setup.
- Docker packaging.
- Full automated cookie/session coverage beyond the focused proof tests.
- Extra XSS/CSRF comparison except as a brief out-of-scope note.
- Public deployment, real accounts, real data, external targets, network sniffing, and production hardening.
</user_constraints>

<architectural_responsibility_map>
## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|--------------|----------------|-----------|
| Editable slide source | Static/docs | Browser/print | The phase packages evidence and code into a static artifact, not app runtime behavior. |
| PDF export | Local tooling | Browser automation | HTML/print-to-PDF or equivalent local tooling can produce a shareable PDF without external accounts. |
| Speaker script | Docs | N/A | The roteiro is a documentation artifact with timing and presenter ownership. |
| Evidence checklist | Docs | App/tests | It references local dashboard/test evidence but does not change app behavior. |

</architectural_responsibility_map>

<research_summary>
## Summary

Phase 5 is primarily a documentation and presentation-production phase. The strongest implementation approach is to keep the slide source local and versioned, use the existing README/docs/tests as evidence sources, and export a PDF from a printable slide source. This avoids online design tools and keeps the project reproducible in the same local environment used for the demo.

The content should be organized around a before/after security story, not around file-by-file implementation detail. The deck must satisfy the academic checklist while staying honest: cookie flags and session lifecycle controls reduce exposure and block invalidated/expired/obsolete cookies, but an active session identifier remains sensitive.

**Primary recommendation:** Create `docs/presentation/` with a printable slide source, timed speaker script, evidence checklist, references, and exported PDF; verify required terms, timing, local-only boundaries, and PDF existence before marking the phase ready.
</research_summary>

<standard_stack>
## Standard Stack

### Core

| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| HTML/CSS print layout | Browser standard | Editable slide source and PDF export target | Native, local, no external account, easy to inspect. |
| Browser print/PDF automation | Local browser or Playwright | Export final PDF | Produces PDF from the same visual source used for slides. |
| Markdown | CommonMark/GitHub style | Speaker notes, references, checklist | Easy to review in Git and adjust during rehearsal. |

### Supporting

| Tool | Purpose | When to Use |
|------|---------|-------------|
| Existing `npm test` | Proof that the lab still works | Final verification before exporting/submitting. |
| `Select-String` | Fast content gate on Windows | Verify required topics and commands are present. |
| PDF file-size check | Cheap sanity check | Confirm export produced a non-empty artifact. |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Local HTML/PDF source | PowerPoint/Google Slides/Canva | Faster manual design, but less reproducible and may depend on external accounts. |
| Browser PDF export | Direct PDF library | Direct libraries are deterministic but make layout harder and less slide-like. |
| Markdown-only slides | HTML slide deck | Markdown is easy to edit but may not produce a polished PDF without more tooling. |

**Installation:** No new runtime dependency is required if the executor uses available local browser automation or browser print-to-PDF. Do not add hosted service dependencies.
</standard_stack>

<architecture_patterns>
## Architecture Patterns

### System Architecture Diagram

```text
Existing validated lab/docs/tests
  -> extract required story, code snippets, evidence, references
  -> editable slide source under docs/presentation/
  -> timed speaker script and evidence checklist
  -> local PDF export
  -> final verification against DOC-01 and DOC-02
```

### Recommended Project Structure

```text
docs/
  presentation/
    slides.html
    speaker-script.md
    evidence-checklist.md
    references.md
    session-hijacking-presentation.pdf
```

### Pattern 1: Static source of truth plus exported artifact
**What:** Keep an editable slide source and commit the generated PDF.
**When to use:** Academic submissions where both final PDF and reproducible source matter.

### Pattern 2: Timing-first speaker notes
**What:** Structure the roteiro by required time blocks and presenter ownership.
**When to use:** Short oral presentations with a strict maximum duration.

### Anti-Patterns to Avoid
- **Wall-of-text slides:** The docs are source material; slides should carry only the visible cue.
- **Unredacted cookie values:** Cookie screenshots must not expose real or reusable values.
- **Overclaiming security:** Do not say `HttpOnly` alone prevents replay.
- **External target drift:** Keep every demo and evidence item on `127.0.0.1`/localhost with fake users.
</architecture_patterns>

<dont_hand_roll>
## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| New presentation runtime | A custom JS slide app | Static printable HTML/CSS | The phase needs a PDF, not a new app surface. |
| Security taxonomy | Custom OWASP mapping | OWASP Top 10 and OWASP Cheat Sheet | Keeps terminology credible for the banca. |
| Demo proof | New manual-only proof | Existing docs and tests | Phases 2-4 already validated the evidence path. |
| Export workflow | Hosted-only design dependency | Local PDF export | Keeps the project reproducible and local. |

**Key insight:** The project already has the hard proof. Phase 5 should package it clearly, not invent more technology.
</dont_hand_roll>

<common_pitfalls>
## Common Pitfalls

### Pitfall 1: Timing drift
**What goes wrong:** The team spends too long explaining setup or code.
**Why it happens:** Slides follow implementation order instead of presentation time blocks.
**How to avoid:** Put timing and presenter owner directly in the speaker script.
**Warning signs:** More than 14 slides or long paragraphs on each slide.

### Pitfall 2: Missing required checklist item
**What goes wrong:** Slides look good but omit references, impact, corrected code, or integrantes.
**Why it happens:** The deck is built from memory instead of `DOC-01`.
**How to avoid:** Add a content verification command and evidence checklist.
**Warning signs:** No slide explicitly names OWASP/MDN/Express or no code comparison.

### Pitfall 3: Misstating the mitigation
**What goes wrong:** The presentation implies an active copied fixed cookie can never authenticate.
**Why it happens:** The team simplifies cookie flags too aggressively.
**How to avoid:** Use the bearer-token caveat from Phase 4 and explain invalidation/expiration precisely.
**Warning signs:** Phrases like "HttpOnly impede qualquer sequestro" or "Secure bloqueia replay manual".

### Pitfall 4: PDF export not checked
**What goes wrong:** The final PDF is missing, empty, or visually clipped.
**Why it happens:** Source files are written but export is not validated.
**How to avoid:** Verify PDF existence/size and inspect first-page/source layout when possible.
**Warning signs:** Only Markdown exists, or PDF file size is suspiciously small.
</common_pitfalls>

<code_examples>
## Code Examples

### Browser PDF Export Pattern

```javascript
// Source: local browser automation pattern.
// Render docs/presentation/slides.html and export to PDF with print backgrounds enabled.
const { chromium } = require("playwright");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
await page.goto("file:///absolute/path/to/docs/presentation/slides.html");
await page.pdf({
  path: "docs/presentation/session-hijacking-presentation.pdf",
  width: "13.333in",
  height: "7.5in",
  printBackground: true,
  preferCSSPageSize: true
});
await browser.close();
```
</code_examples>

<sota_updates>
## State of the Art (2025-2026)

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| OWASP Top 10 2021 A07 "Identification and Authentication Failures" | OWASP Top 10 2025 A07 "Authentication Failures" | Use the 2025 naming as current, mention 2021 naming if course materials use it. |
| Manual-only screenshots | Evidence plus automated tests | Tests make the mitigation reproducible if the live browser demo is slow. |
| Hosted slide tools by default | Local source plus PDF export | Better for controlled academic repos and no external account dependency. |

**New tools/patterns to consider:**
- Local browser automation can export a static HTML deck to PDF reliably.
- Keep PDF and editable source together so final review and future edits stay aligned.

**Deprecated/outdated:**
- Treating `HttpOnly` as a complete replay defense is inaccurate; it reduces client-side script exposure but does not invalidate a manually copied active session identifier.
</sota_updates>

<open_questions>
## Open Questions

1. **Exact names of the two integrantes**
   - What we know: the team has two integrantes and both must present.
   - What's unclear: their actual names are not in the repo.
   - Recommendation: use placeholders `Integrante 1` and `Integrante 2` unless names are discovered locally or provided before final export.

2. **Exact PDF export mechanism**
   - What we know: local browser automation is available in this environment, and browser print-to-PDF is a manual fallback.
   - What's unclear: which PDF route the executor will prefer at runtime.
   - Recommendation: use the simplest available local automation; verify the PDF file exists and is not empty.
</open_questions>

<sources>
## Sources

### Primary (HIGH confidence)
- `https://owasp.org/Top10/2025/A07_2025-Authentication_Failures/` - current OWASP Top 10 A07 mapping.
- `https://owasp.org/Top10/2021/A07_2021-Identification_and_Authentication_Failures/` - older OWASP naming likely seen in course material.
- `https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html` - session identifier and lifecycle guidance.
- `https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie` - cookie attributes and localhost/Secure behavior.
- `https://expressjs.com/en/resources/middleware/session/` - `express-session` cookie options.

### Secondary (MEDIUM confidence)
- Existing project docs and tests from Phases 1-4 - locally validated evidence and commands.

### Tertiary (LOW confidence - needs validation)
- None.
</sources>

<metadata>
## Metadata

**Research scope:**
- Core domain: security presentation packaging and PDF export.
- Ecosystem: static docs, HTML/CSS print layout, local PDF export, official security references.
- Patterns: timing-first roteiro, local source plus PDF, concise evidence packaging.
- Pitfalls: missing required sections, overclaiming mitigation, leaking cookie values, PDF export issues.

**Confidence breakdown:**
- Standard stack: HIGH - static docs/HTML/PDF fits the repo and deliverable.
- Architecture: HIGH - no app runtime change needed.
- Pitfalls: HIGH - directly derived from project constraints and prior phase decisions.
- Code examples: MEDIUM - export command must be adjusted to the executor's available local tooling.

**Research date:** 2026-06-09
**Valid until:** 2026-07-09
</metadata>

---

*Phase: 05-presentation-package*
*Research completed: 2026-06-09*
*Ready for planning: yes*
