# Phase 4: Mitigation Verification - Context

**Gathered:** 2026-06-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 4 delivers the mitigation proof for the local Session Hijacking lab. It must repeat the Phase 2 before/after story in a way the team can rehearse: first show that replaying the vulnerable `sid` cookie succeeds, then show that the implemented fixed-mode mitigations produce an observable denial when the reused cookie is no longer valid because the app has switched to fixed mode, the session was destroyed on logout, or the short fixed session expired.

This phase should produce a concise verification checklist, reset/rehearsal commands, and focused proof coverage for requirement `FIX-03`. It does not add new mitigation features beyond Phase 3, build a full HTTPS certificate workflow, add Docker packaging, create the final slide deck, or broaden into XSS, CSRF, network sniffing, device binding, or a full v2 cookie/session test suite.

Important security framing: a server-side web session cookie is still a bearer token while it is active. `HttpOnly`, `Secure`, `SameSite`, shorter `maxAge`, regeneration, and logout invalidation reduce exposure and lifetime, but a manually copied active fixed-mode cookie can still authenticate until the server rejects it. Phase 4 must be honest about that boundary and prove the concrete mitigations implemented here, not imply that `HttpOnly` alone makes replay impossible.

</domain>

<decisions>
## Implementation Decisions

### Proof Path
- **D-01:** Use the Phase 2 replay test and walkthrough as the "before" baseline: in vulnerable mode, a copied `sid` cookie from `alice` reaches `/dashboard` from a second local client without a password.
- **D-02:** For the "after" proof, verify denial in fixed-mode scenarios that are actually mitigated: an obsolete vulnerable `sid` after switching/restarting into fixed mode must not authenticate, and a copied fixed cookie must fail after logout or expiration.
- **D-03:** Do not claim that a freshly stolen, still-active fixed-mode session cookie is impossible to replay. The docs and tests should explain that the mitigation reduces cookie exposure, transport risk, lifetime, and post-logout reuse.
- **D-04:** Keep the proof focused on `GET /dashboard`, because that is the protected classroom resource and already contains visible fake private data for the demo.

### Observable Denial
- **D-05:** Treat `302 Location: /login` as the canonical failure signal for this Express app when `/dashboard` receives an invalid, obsolete, logged-out, expired, or missing session.
- **D-06:** The requirement may mention `401` as an acceptable generic denial, but Phase 4 should not change the dashboard to `401` just to match that wording. Reusing the existing redirect keeps the manual demo simple and consistent with `requireAuth`.
- **D-07:** If the planner adjusts user-facing messages, keep them small and didactic, such as a note in the checklist or login page. Do not add a new API endpoint or a separate auth system for verification.

### HTTPS and Localhost Explanation
- **D-08:** Document two verification lanes: browser rehearsal with `npm run dev:fixed` using `SESSION_COOKIE_SECURE=false` as an HTTP-local inspection fallback, and automated secure-path proof with `secureCookie: true`, `trustProxy: true`, and `X-Forwarded-Proto: https`.
- **D-09:** The checklist must explicitly say that `Secure` requires HTTPS for real protection. The HTTP-local fallback exists only so the team can log in and inspect the classroom app on `http://127.0.0.1:3000`.
- **D-10:** Do not implement a self-signed certificate installation workflow in this phase. It remains a v2 enhancement unless the user explicitly pulls it forward.

### Reset and Rehearsal Artifacts
- **D-11:** Create a focused document, preferably `docs/mitigation-verification.md`, with a before/after checklist, expected observations, reset steps, and screenshot/evidence prompts for the final presentation.
- **D-12:** Link the Phase 4 verification document from `README.md` so the team can find the rehearsal path quickly.
- **D-13:** Add a focused regression test, preferably `tests/session-mitigation-verification.test.js`, that proves the vulnerable replay still succeeds while fixed-mode invalidation/obsolete-cookie scenarios redirect to `/login`.
- **D-14:** Include Windows-friendly reset steps: stop the server with `Ctrl+C`, clear cookies/site data for `127.0.0.1` and `localhost`, use a fresh second client, restart vulnerable mode with `npm run dev`, and restart fixed inspection mode with `npm run dev:fixed`.
- **D-15:** Keep artifacts concise enough for a 25-minute presentation rehearsal. Phase 5 will turn this into slides and timed speaker notes.

### the agent's Discretion
The planner may choose exact test helper names, exact screenshot checklist wording, and whether the Phase 4 doc is a new file or a tight extension of the existing Phase 2/3 docs. The planner may also decide the exact expired-session test mechanics, as long as the proof remains focused and does not expand into a broad security suite.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Scope
- `.planning/PROJECT.md` - Project purpose, core value, active requirement to demonstrate mitigation failure of replay, and ethical/local constraints.
- `.planning/REQUIREMENTS.md` - Requirement `FIX-03`, plus documentation boundaries and v2 deferred items.
- `.planning/ROADMAP.md` - Phase 4 goal, success criteria, and planned slices `04-01` and `04-02`.
- `.planning/STATE.md` - Current position after Phase 3 and the known localhost/Secure-cookie concern.
- `.planning/phases/01-vulnerable-lab-foundation/01-CONTEXT.md` - Vulnerable lab decisions, especially `sid` and protected fake dashboard data.
- `.planning/phases/02-session-reuse-attack/02-CONTEXT.md` - Locked replay attack path, DevTools/cURL evidence style, and reset guidance.
- `.planning/phases/03-session-security-fixes/03-CONTEXT.md` - Fixed-mode cookie, logout, expiration, and Phase 4 boundary decisions.

### Existing Docs and Instructions
- `AGENTS.md` - Repository GSD rules, stack guidance, vulnerable/fixed cookie expectations, source notes, and presentation constraints.
- `README.md` - Current run commands, fixed-mode HTTP fallback explanation, fake users, and links to prior docs.
- `docs/session-reuse-attack.md` - Before-state attack walkthrough and evidence checklist to reuse as the baseline.
- `docs/session-security-fixes.md` - Phase 3 mitigation explanation and explicit statement that Phase 4 verifies replay failure.

### Existing App and Tests
- `package.json` - Existing scripts: `npm run dev`, `npm run dev:fixed`, and `npm test`.
- `src/server.js` - `createApp()`, login regeneration behavior, `/dashboard`, and `POST /logout`.
- `src/session/session-mode.js` - Mode selection, fixed/vulnerable cookie names, secure fallback, and clear-cookie options.
- `src/session/fixed-session.js` - Fixed cookie settings, `__Host-session`, 5-minute max age, and HTTP-local `sid` fallback.
- `src/session/vulnerable-session.js` - Intentionally insecure `sid` cookie settings used for the before proof.
- `src/middleware/require-auth.js` - Canonical unauthenticated denial path: redirect to `/login`.
- `tests/session-reuse-attack.test.js` - Existing vulnerable replay proof to preserve and reference.
- `tests/session-fixed-cookie.test.js` - Secure fixed-cookie attribute proof using HTTPS proxy headers.
- `tests/session-logout.test.js` - Existing proof that a copied fixed cookie fails after logout.
- `tests/app-shell.test.js` - Existing redirect and login failure patterns.

### External Specs
- No separate local spec files exist for Phase 4. External references to Express `express-session`, MDN `Set-Cookie`, and OWASP Session Management are listed in `AGENTS.md` source notes.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/server.js`: exposes `createApp(options)`, which lets tests instantiate vulnerable and fixed modes without starting a real server.
- `src/session/session-mode.js`: centralizes cookie names and secure-cookie fallback behavior, useful for making the verification test explicit.
- `src/session/fixed-session.js`: exports `FIXED_SESSION_MAX_AGE_MS`, `SECURE_FIXED_COOKIE_NAME`, and `LOCAL_FIXED_COOKIE_NAME`, which can support readable assertions.
- `src/middleware/require-auth.js`: already produces the denial signal Phase 4 should assert: redirect to `/login`.
- `tests/session-reuse-attack.test.js`: gives the vulnerable before-state pattern for extracting and replaying `sid`.
- `tests/session-logout.test.js`: already proves post-logout replay failure and can be reused or referenced rather than duplicated heavily.
- `docs/session-reuse-attack.md` and `docs/session-security-fixes.md`: provide the before and mitigation docs that the Phase 4 checklist should connect.

### Established Patterns
- CommonJS modules, Express server-rendered EJS, fake in-memory users, and no database.
- Tests use Vitest plus Supertest and prefer `createApp()` over running a live port.
- Documentation is concise Portuguese/ASCII prose aimed at classroom rehearsal on Windows.
- The roadmap keeps scope narrow: Phase 4 verifies mitigation, Phase 5 packages slides and timed script.

### Integration Points
- Add or update documentation under `docs/` and link it from `README.md`.
- Add one focused test file near the existing session tests, or extend current tests if that keeps the intent clearer.
- Use existing `/login`, `/dashboard`, and `/logout`; avoid adding new app routes unless a tiny message improves demo clarity.
- Reuse existing npm scripts instead of adding new runtime dependencies or external tools.

</code_context>

<specifics>
## Specific Ideas

- Recommended manual sequence: run vulnerable mode, show second client denied, log in as `alice`, copy `sid`, show replay succeeds, reset/clear cookies, run fixed mode, show the old vulnerable cookie no longer grants access, log in fixed mode, logout, then show the copied fixed cookie redirects to `/login`.
- Recommended automated sequence: keep the existing vulnerable replay success test, then add assertions that fixed-mode obsolete or logged-out cookies produce `302` with `Location: /login`.
- Recommended wording: "As mitigacoes reduzem a chance e a janela de sequestro; depois de invalidar/expirar a sessao, o cookie copiado deixa de funcionar."
- Evidence should stay local and fake: Alice dashboard data, cookie attribute screenshots, redirect to login, and terminal output from `npm test`.

</specifics>

<deferred>
## Deferred Ideas

- Full self-signed HTTPS certificate setup remains `ENH-03` / v2.
- Docker packaging remains `ENH-01` / v2.
- Full automated cookie/session coverage remains `ENH-02` / v2.
- Final slides, PDF export, references formatting, and timed speaking script remain Phase 5.
- XSS, CSRF, network sniffing, public deployment, device binding, real accounts, and external targets remain out of scope.

</deferred>

---

*Phase: 4-Mitigation Verification*
*Context gathered: 2026-06-09*
