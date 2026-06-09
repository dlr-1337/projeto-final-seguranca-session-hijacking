# Phase 5: Presentation Package - Context

**Gathered:** 2026-06-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 5 delivers the final presentation package for the local Session Hijacking lab: PDF slides plus a timed speaking/demo script for two integrantes. It packages the validated work from Phases 1-4 into a concise classroom story that shows the vulnerable cookie, the controlled replay attack, the corrected cookie/session lifecycle, and the observable mitigation proof.

This phase must satisfy `DOC-01` and `DOC-02`: slides cover tema/integrantes, vulnerability description, architecture, vulnerable code, impact, correction, corrected code, conclusion, and references; the script fits the required 25-minute timing: 7 minutes concept, 8 minutes attack, 8 minutes correction, and 2 minutes conclusion.

This phase does not add app behavior, broaden into XSS/CSRF/sniffing, build Docker packaging, create a full HTTPS certificate workflow, or use real data/targets. It should stay local, authorized, fake-data-only, and rehearsal-focused.

</domain>

<decisions>
## Implementation Decisions

### Narrativa e Tempo
- **D-01:** Use a required before/after storyline: concept of sessions and Session Hijacking, vulnerable local lab, copied `sid` replay, secure cookie/session fixes, mitigation verification, and conclusion.
- **D-02:** Preserve the assignment timing exactly in the roteiro: 7 minutes for concept, 8 minutes for attack, 8 minutes for correction/verification, and 2 minutes for conclusion.
- **D-03:** Keep the slide sequence aligned to the validated phase progression: Phase 1 lab foundation, Phase 2 replay attack, Phase 3 fixes, Phase 4 mitigation proof, Phase 5 final package.
- **D-04:** The roteiro should be rehearsal-oriented: include what to say, which local command/action to run, and the expected observation at each demo moment.

### Formato dos Artefatos
- **D-05:** Create repo-owned presentation artifacts, preferably under `docs/presentation/`, including slide source, speaker script, evidence checklist, references, and the exported PDF.
- **D-06:** Prefer a local, reproducible export path that does not depend on hosted design tools or external accounts. The planner may choose the exact source format.
- **D-07:** Keep the deck compact enough for a 25-minute oral presentation. A practical target is 10-14 slides with short bullets, visible code snippets, and evidence placeholders rather than long paragraphs.
- **D-08:** The final package should include both the polished PDF for submission and editable source files so the team can rehearse and adjust wording.

### Codigo e Evidencias
- **D-09:** Show vulnerable and corrected code side by side using `src/session/vulnerable-session.js` and `src/session/fixed-session.js`.
- **D-10:** The code comparison must call out cookie name, `httpOnly`, `secure`, `sameSite`, `maxAge`, `Path`, and the `__Host-session` rule/caveat.
- **D-11:** Include concise proof snippets from `tests/session-reuse-attack.test.js`, `tests/session-mitigation-verification.test.js`, `tests/session-fixed-cookie.test.js`, and `tests/session-logout.test.js`; do not paste full test files into slides.
- **D-12:** Use the validated demo evidence sequence: second client denied before cookie, replay succeeds with vulnerable `sid`, fixed mode rejects obsolete/invalid/logged-out cookies with `302 Location: /login`, and `npm test` passes.
- **D-13:** Do not expose raw real cookie values in the final slides. If cookie screenshots are used, redact values and keep only local/fake lab data visible.

### Divisao da Apresentacao
- **D-14:** Split the 25-minute presentation across both integrantes. Recommended split: Integrante 1 leads concept and vulnerable attack; Integrante 2 leads correction, mitigation verification, and conclusion.
- **D-15:** Both integrantes should participate in the practical demonstration, even if one is speaking while the other operates the browser/terminal.
- **D-16:** Include exact Windows-friendly commands in the roteiro: `npm run dev`, `npm run dev:fixed`, `npm test`, and `curl.exe -i http://127.0.0.1:3000/dashboard -H "Cookie: sid=<copied-sid-value>"`.
- **D-17:** Include reset instructions between before and after: stop with `Ctrl+C`, clear cookies/site data for `127.0.0.1` and `localhost`, use a fresh second client, and restart fixed mode.
- **D-18:** Include a fallback path for demo friction: if browser cookie editing is slow, use the cURL proof and automated test output.

### Referencias e Framing de Seguranca
- **D-19:** Frame the session cookie honestly as a bearer credential: while a server-side session remains active, a copied valid cookie is sensitive; mitigations reduce exposure, transport risk, and lifetime, and logout/expiration/server invalidation block reuse.
- **D-20:** Map the flaw primarily to OWASP Top 10 2025 A07 Authentication Failures. If professor materials use 2021 terminology, note the related OWASP Top 10 2021 A07 Identification and Authentication Failures name.
- **D-21:** Cite OWASP Session Management Cheat Sheet for protecting session identifiers and lifecycle controls, MDN Set-Cookie for cookie attributes, and Express `express-session` docs for the implementation options.
- **D-22:** Explain the localhost/Secure nuance directly: real `Secure` cookie protection requires HTTPS; `npm run dev:fixed` uses an HTTP-local fallback only for classroom inspection, while automated tests validate the secure path with proxy HTTPS headers.
- **D-23:** Keep XSS, CSRF, network sniffing, public deployment, real accounts, and external targets out of scope except as a brief boundary statement.

### the agent's Discretion
The planner may choose exact filenames, slide source format, visual layout, screenshot placeholder names, and how to export the PDF, as long as the final package remains local, editable, PDF-exported, and aligned with the timing and evidence decisions above.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Scope
- `.planning/PROJECT.md` - Project purpose, core value, active documentation requirements, constraints, and key decisions.
- `.planning/REQUIREMENTS.md` - Requirements `DOC-01` and `DOC-02`, plus v2 deferred items and out-of-scope boundaries.
- `.planning/ROADMAP.md` - Phase 5 goal, success criteria, and planned slices `05-01` and `05-02`.
- `.planning/STATE.md` - Current project position after Phase 4 and the known need for final slides, PDF export, and timed speaking notes.
- `.planning/phases/02-session-reuse-attack/02-CONTEXT.md` - Locked vulnerable replay path, evidence style, DevTools/cURL flow, and ethical boundaries.
- `.planning/phases/03-session-security-fixes/03-CONTEXT.md` - Locked fixed-mode cookie attributes, logout invalidation, and Secure localhost explanation.
- `.planning/phases/04-mitigation-verification/04-CONTEXT.md` - Locked before/after proof, observable denial signal, reset steps, and bearer-token caveat.

### Existing Documentation to Package
- `AGENTS.md` - Repository GSD rules, project statement, stack notes, source notes, and presentation constraints.
- `README.md` - Local commands, fake users, vulnerable/fixed mode summary, links to phase docs, and ethical warning.
- `docs/session-reuse-attack.md` - Manual attack walkthrough, cURL fallback, principle violated, evidence checklist, and reset steps.
- `docs/session-security-fixes.md` - Corrected cookie table, logout behavior, expiration policy, OWASP/Secure SDLC explanation, and localhost Secure caveat.
- `docs/mitigation-verification.md` - Before/after rehearsal, observable denial, test proof, evidence checklist, and short explanation for the banca.

### Code and Test Evidence
- `package.json` - Existing scripts for demo and proof: `npm run dev`, `npm run dev:fixed`, and `npm test`.
- `src/session/vulnerable-session.js` - Vulnerable `sid` cookie settings for the slide code comparison.
- `src/session/fixed-session.js` - Corrected `__Host-session`/local fallback settings and 5-minute max age for the slide code comparison.
- `src/session/session-mode.js` - Mode selection and HTTP-local fixed-mode fallback behavior.
- `src/server.js` - Login regeneration in fixed mode, protected `/dashboard`, and `POST /logout` invalidation flow.
- `src/views/dashboard.ejs` - Visible fake protected data, mode badge, and logout form for screenshots/demo.
- `tests/session-reuse-attack.test.js` - Automated vulnerable replay proof.
- `tests/session-mitigation-verification.test.js` - Automated before/after mitigation proof.
- `tests/session-fixed-cookie.test.js` - Secure fixed cookie attribute proof.
- `tests/session-logout.test.js` - Server-side logout invalidation proof.

### External References for Slides
- `https://owasp.org/Top10/2025/A07_2025-Authentication_Failures/` - Current OWASP Top 10 A07 mapping; includes authentication/session-management failures.
- `https://owasp.org/Top10/2021/A07_2021-Identification_and_Authentication_Failures/` - Older/common OWASP Top 10 naming that may appear in course materials.
- `https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html` - OWASP guidance for session identifiers, cookie attributes, expiration, and invalidation.
- `https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie` - MDN reference for `Set-Cookie`, `HttpOnly`, `Secure`, `SameSite`, `Path`, and localhost behavior.
- `https://expressjs.com/en/resources/middleware/session/` - Express `express-session` cookie option reference used by this lab.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `README.md`: already contains the high-level lab description, run commands, fake users, vulnerable/fixed cookie tables, and ethical warning.
- `docs/session-reuse-attack.md`: provides the attack slides and demo script backbone for the 8-minute attack section.
- `docs/session-security-fixes.md`: provides corrected-cookie and Secure SDLC content for the correction section.
- `docs/mitigation-verification.md`: provides the final before/after proof, reset flow, evidence checklist, and banca-ready explanation.
- `src/session/vulnerable-session.js` and `src/session/fixed-session.js`: provide compact, comparable code snippets for required vulnerable/corrected code slides.
- Existing Vitest/Supertest files: provide short automated proof snippets that can support the demo if browser steps are slow.

### Established Patterns
- Documentation is concise Portuguese/ASCII prose aimed at a Windows-friendly classroom rehearsal.
- The app is a small CommonJS Express/EJS lab with fake in-memory users and no database.
- The demo commands are local and simple; no external services, real data, public deployment, or online design tooling is required.
- Existing docs already avoid overstating the mitigation: a valid active session cookie remains a bearer token until expiration or invalidation.

### Integration Points
- Add final presentation assets under a focused docs location and link them from `README.md` if useful.
- Reuse the existing phase docs as source material; do not duplicate large sections verbatim when a concise slide bullet or speaker note is enough.
- Use local screenshots/evidence placeholders tied to the existing dashboard and tests.
- Preserve existing npm scripts and app code; Phase 5 should mostly create documentation/presentation artifacts.

</code_context>

<specifics>
## Specific Ideas

- Recommended slide outline:
  1. Titulo, tema Session Hijacking, integrantes.
  2. Objetivo e escopo etico/local.
  3. Arquitetura do laboratorio Express.
  4. Como sessoes e cookies funcionam.
  5. Codigo vulneravel do `sid`.
  6. Ataque com DevTools/cURL e evidencia do acesso sem senha.
  7. Impacto e principio violado.
  8. Codigo corrigido de cookie/sessao.
  9. Logout, expiracao e lifecycle da sessao.
  10. Verificacao antes/depois com `302 Location: /login`.
  11. OWASP Top 10, OWASP Session Management, MDN, Express, Secure SDLC.
  12. Conclusao e referencias.
- Recommended timing: slides 1-4 in 7 minutes, slides 5-7 in 8 minutes, slides 8-10 in 8 minutes, slides 11-12 in 2 minutes.
- Recommended speaker split: Integrante 1 handles slides 1-7; Integrante 2 handles slides 8-12. Both should appear in the live demo/runbook.
- Recommended final runbook: rehearse once with browser/DevTools, then rehearse again with cURL/test fallback so the team can recover quickly during the oral presentation.

</specifics>

<deferred>
## Deferred Ideas

- Full self-signed HTTPS certificate setup remains `ENH-03` / v2.
- Docker packaging remains `ENH-01` / v2.
- Full automated cookie/session coverage beyond the focused proof tests remains `ENH-02` / v2.
- Extra comparison with XSS or CSRF remains `ENH-04` / v2 and should not consume presentation time beyond a short out-of-scope note.
- Public deployment, real accounts, real data, external targets, network sniffing, and production hardening remain out of scope.

</deferred>

---

*Phase: 5-Presentation Package*
*Context gathered: 2026-06-09*
