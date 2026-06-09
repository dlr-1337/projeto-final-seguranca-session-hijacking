# Phase 3: Session Security Fixes - Context

**Gathered:** 2026-06-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 3 delivers the corrected session behavior for the local Session Hijacking lab: an explicit fixed mode with secure cookie attributes, a short session lifetime, and real server-side session invalidation on logout. The phase must keep the vulnerable mode available for the classroom before/after comparison, while making the corrected code easy to point at during the oral explanation.

This phase does not prove the full replay attack failure end to end, build final slides, export the presentation PDF, add Docker packaging, add a broad cookie/session test suite, or build a detailed self-signed certificate installation workflow. Those remain Phase 4, Phase 5, or v2 work.

</domain>

<decisions>
## Implementation Decisions

### Fixed Mode Selection
- **D-01:** Preserve the existing vulnerable mode for the before/after demo and add an explicit corrected mode selected by configuration, such as `SESSION_MODE=fixed`, plus a simple script or documented PowerShell command for Windows users.
- **D-02:** Extend the app in a small, testable way, preferably by allowing `createApp()` to accept an optional mode/config object while the server entry point reads environment variables. This keeps Supertest coverage clean and avoids duplicating the Express app.
- **D-03:** Keep the default behavior compatible with the current vulnerable walkthrough unless the planner finds a clearer script-based split. The team must be able to run vulnerable and fixed modes deliberately, without editing source code between demo steps.
- **D-04:** Put the corrected session settings in a clearly named helper, for example `src/session/fixed-session.js` or a small session factory, so the presentation can show vulnerable and fixed code side by side.

### Secure Cookie Policy
- **D-05:** The fixed session cookie must set `httpOnly: true`, `secure: true` for the secure fixed path, `sameSite: "strict"`, and a short demo-friendly `maxAge`, with 5 minutes as the preferred default unless implementation testing shows a slightly longer value is needed for a reliable classroom rehearsal.
- **D-06:** Use the `__Host-session` cookie name in the secure fixed configuration when the local HTTPS path supports it. The implementation must avoid a misleading `__Host-` prefix in any plain-HTTP fallback because that prefix only makes sense with Secure, Path=/, and no Domain.
- **D-07:** Keep `Path=/` and do not set a Domain attribute for the fixed cookie. This supports the `__Host-` rule and keeps the local demo scoped to the lab origin.
- **D-08:** If plain `http://127.0.0.1:3000` is used during implementation or tests, any temporary `secure: false` override must be clearly named as a local inspection fallback, not the corrected security posture. The corrected code path and docs must still show Secure as required.

### Session Lifecycle
- **D-09:** In fixed mode, regenerate the session after successful login before storing `userId` if it can be done without making the app hard to explain. This is a useful lifecycle hardening step, but the core required mitigations remain cookie flags, expiration, and logout invalidation.
- **D-10:** Add a real logout flow that destroys the server-side session with `req.session.destroy`, clears the correct cookie on the client with the same cookie name/path used by the active mode, and redirects to `/login` or another simple safe page.
- **D-11:** Prefer `POST /logout` from a small dashboard form over a state-changing `GET /logout`. Do not add a full CSRF system in this phase; SameSite plus the local-only scope is enough for the teaching goal.
- **D-12:** Do not deliberately add a broken logout just to create another vulnerability. The vulnerable before-state is already represented by the current Phase 1/2 app and the vulnerable cookie mode.

### Didactic Before/After Evidence
- **D-13:** Update README documentation with a concise Phase 3 section showing how to start vulnerable mode and fixed mode, where the vulnerable and fixed cookie settings live, and which attributes should appear in DevTools.
- **D-14:** Add or update a focused document, preferably `docs/session-security-fixes.md`, with the corrected cookie table, logout behavior, expiration policy, and a short OWASP/Secure SDLC explanation. Keep the final slide wording for Phase 5.
- **D-15:** Add focused automated tests for fixed cookie attributes and logout invalidation. Keep the existing vulnerable cookie and session reuse tests intact so the project still proves the original weakness.
- **D-16:** Do not move the full "same stolen cookie now fails" demonstration into Phase 3. Phase 4 owns that end-to-end mitigation verification, including any reset checklist and final rehearsal steps.

### the agent's Discretion
The planner may choose the exact helper names, exact npm script names, and whether to use a small session factory or separate `vulnerable-session.js` / `fixed-session.js` modules. The planner may also choose the exact fixed-mode HTTP fallback mechanics for tests, as long as the corrected path remains visibly secure and the documentation does not call an HTTP fallback fully secure.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Scope
- `.planning/PROJECT.md` - Project purpose, core value, constraints, active mitigation requirements, and key decisions from Phases 1 and 2.
- `.planning/REQUIREMENTS.md` - Requirements FIX-01 and FIX-02 mapped to Phase 3, plus FIX-03 boundary for Phase 4.
- `.planning/ROADMAP.md` - Phase 3 goal, success criteria, and planned slices `03-01` and `03-02`.
- `.planning/STATE.md` - Current project position after Phase 2 and known concern about Secure cookies needing HTTPS or a clear localhost explanation.
- `.planning/phases/01-vulnerable-lab-foundation/01-CONTEXT.md` - Locked decisions for the vulnerable Express lab, fake users, and insecure `sid` cookie.
- `.planning/phases/02-session-reuse-attack/02-CONTEXT.md` - Locked decisions for the replay attack, DevTools/cURL path, evidence style, and Phase 3 boundaries.

### Project Instructions and Existing App
- `AGENTS.md` - Repository-level GSD rules, recommended Express stack, vulnerable/fixed cookie guidance, source notes, and classroom constraints.
- `README.md` - Current local run commands, fake users, vulnerable cookie table, and Phase 2 link.
- `docs/session-reuse-attack.md` - Existing attack walkthrough that Phase 3 must not break for vulnerable mode.
- `package.json` - Available scripts and dependencies: Express, EJS, `express-session`, Vitest, and Supertest.
- `src/server.js` - Current Express app, `createApp()`, login route, dashboard route, and session middleware wiring.
- `src/session/vulnerable-session.js` - Current intentionally insecure cookie helper to compare against fixed mode.
- `src/middleware/require-auth.js` - Auth gate that redirects unauthenticated dashboard requests to `/login`.
- `tests/session-cookie.test.js` - Existing vulnerable cookie assertions and Supertest patterns.
- `tests/session-reuse-attack.test.js` - Existing proof that replaying `sid` succeeds in vulnerable mode and must remain meaningful.

### External Specs
- No separate external spec files exist. External references to Express `express-session`, MDN `Set-Cookie`, and OWASP Session Management are listed in `AGENTS.md` source notes.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/server.js`: exports `createApp()`, making it suitable for an optional config parameter and focused Supertest coverage.
- `src/session/vulnerable-session.js`: isolates the current vulnerable settings and should remain as the side-by-side contrast for Phase 3.
- `src/middleware/require-auth.js`: already gives an observable unauthenticated denial path by redirecting to `/login`.
- `tests/session-cookie.test.js`: provides the current cookie assertion style for checking Set-Cookie attributes.
- `tests/session-reuse-attack.test.js`: proves the vulnerable behavior and should stay tied to vulnerable mode.
- `README.md` and `docs/session-reuse-attack.md`: already use concise, classroom-oriented documentation that Phase 3 can extend.

### Established Patterns
- The app uses CommonJS modules, Express routes, EJS views, in-memory fake users, and no database.
- Tests use Vitest plus Supertest and call `createApp()` directly instead of starting a real network listener.
- Existing docs are in Portuguese without accent-heavy prose and favor simple local commands for Windows-friendly classroom use.
- The project intentionally separates phase boundaries: Phase 3 fixes session behavior, Phase 4 proves the attack fails, and Phase 5 packages slides/script.

### Integration Points
- Session setup currently happens once in `src/server.js` through `createVulnerableSession()`; Phase 3 should replace this with mode-aware session setup.
- Login currently assigns `req.session.userId` directly; fixed mode may need a small callback/promise wrapper for `req.session.regenerate`.
- There is no logout route yet; adding `POST /logout` requires a small dashboard form or button in `src/views/dashboard.ejs`.
- Cookie clear behavior must know the active cookie name and path, so the session helper or mode config should expose those values.

</code_context>

<specifics>
## Specific Ideas

- Preferred fixed cookie defaults: `httpOnly: true`, `secure: true`, `sameSite: "strict"`, `maxAge: 5 * 60 * 1000`, Path `/`, and no Domain.
- Preferred secure cookie name: `__Host-session` for the secure fixed path. Use a clearly labeled alternative only for local HTTP fallback/testing if needed.
- Preferred demo commands: keep `npm run dev` simple for the current vulnerable path and add a fixed-mode path such as `npm run dev:fixed` or a documented PowerShell environment variable command.
- The corrected docs should explicitly say that Secure cookies require HTTPS for real protection; any localhost/HTTP exception or fallback is only for teaching/inspection.
- The Phase 3 explanation should tie mitigations to OWASP and Secure SDLC in plain terms: reduce client-side cookie exposure, restrict cross-site sending, limit session lifetime, and invalidate server-side state on logout.

</specifics>

<deferred>
## Deferred Ideas

- Full proof that the same copied cookie replay fails after mitigation belongs to Phase 4.
- Reset checklist, final before/after rehearsal sequence, and observable denial wording belong to Phase 4.
- Final slides, PDF export, references formatting, and the 25-minute oral script belong to Phase 5.
- Docker packaging, full automated cookie/session coverage, detailed self-signed certificate installation steps, XSS, CSRF, network sniffing, public deployment, and real targets remain out of v1 Phase 3 scope.

</deferred>

---

*Phase: 3-Session Security Fixes*
*Context gathered: 2026-06-09*
