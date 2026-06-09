# Phase 2: Session Reuse Attack - Context

**Gathered:** 2026-06-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 2 delivers a reproducible local Session Hijacking attack demonstration against the vulnerable lab created in Phase 1. The phase must show that a copied `sid` session cookie can be reused by a second local client to access `/dashboard` without entering the user's password, then record concise evidence and a repeatable walkthrough for the classroom demo.

This phase does not implement secure cookie flags, session expiration changes, server-side logout invalidation, mitigation verification, final slides, Docker packaging, or broader attack techniques. Those remain Phase 3, Phase 4, Phase 5, or v2 work.

</domain>

<decisions>
## Implementation Decisions

### Demonstration Path
- **D-01:** Use a visual browser-based attack as the primary classroom path: log in as a fake user in the legitimate browser/client, copy the local `sid` cookie via DevTools, reuse it in a second local browser profile/client, and access `/dashboard` without entering credentials in that second client.
- **D-02:** Include `cURL` as the required reproducible backup path because it is scriptable, easy to paste in the presentation notes, and does not depend on Postman UI setup. Postman can be mentioned as an equivalent optional tool, but the phase does not need a separate Postman-first flow.
- **D-03:** Before replaying the stolen cookie, the second client should demonstrate that `/dashboard` redirects to `/login` without a valid session. This makes the later cookie-reuse success obvious.

### Cookie Transfer Mechanics
- **D-04:** Copy only the session cookie needed for the demonstration. For browser reuse, copy the `sid` value from DevTools/Application/Storage. For `cURL`, send `Cookie: sid=<copied-value>` and preserve the exact value/encoding when copying from `Set-Cookie` or DevTools.
- **D-05:** Do not add a helper endpoint that exposes the session ID, do not export full browser storage, and do not introduce packet sniffing. The point is to show that the existing insecure cookie can be reused when copied in a controlled local lab.
- **D-06:** The explanation should connect the behavior to server-side sessions: `express-session` stores the session data on the server, while the browser cookie carries the session identifier that lets another client bind to that same server-side session.

### Proof and Evidence
- **D-07:** The proof of compromise is: a second local client reaches `/dashboard` without login and sees the same fake private data for the victim user, such as the display name, lab account, and private report text.
- **D-08:** Record evidence that is useful for slides later without building the final slides now: concise screenshots or notes for the legitimate login, the copied `sid` cookie, the unauthenticated second client being denied before replay, and the second client reaching the dashboard after replay.
- **D-09:** Add one focused automated proof test using the existing Vitest/Supertest pattern. The test should log in as a fake user, extract the `sid` cookie, send it from a separate client/request to `/dashboard`, and assert that fake private dashboard data is returned. Do not expand this into the deferred full cookie/session test suite.

### Safety and Repeatability
- **D-10:** Keep the entire attack local and authorized on `127.0.0.1`/localhost with the fake users from the README. Do not use real credentials, external targets, public tunnels, third-party websites, malware-like tooling, XSS, CSRF, or network sniffing.
- **D-11:** The walkthrough must include reset/cleanup steps, such as clearing site data, using a fresh profile/incognito window, stopping/restarting the local server if needed, and confirming which client is the victim versus the replay client.
- **D-12:** The oral explanation should name the violated security principle in plain terms: possession of the reusable session cookie is enough to impersonate the authenticated user because the vulnerable mode lacks sufficient cookie protection and session lifecycle controls.

### Phase 2 Artifacts
- **D-13:** Create a focused attack walkthrough document, preferably `docs/session-reuse-attack.md`, with the manual browser steps, the `cURL` backup command pattern, expected observations, evidence checklist, and ethical boundary note.
- **D-14:** Update `README.md` with a Phase 2 link or short section pointing to the attack walkthrough, while preserving the existing Phase 1 explanation of the vulnerable cookie configuration.
- **D-15:** Keep code changes minimal. Phase 2 should mostly add documentation and a focused proof test unless the planner finds a small app change is necessary to make the attack evidence clearer. Any fixed-mode session behavior belongs to later phases.

### the agent's Discretion
The planner may choose the exact screenshot filenames, the exact wording of the evidence checklist, whether the proof test is a new test file or an extension of `tests/session-cookie.test.js`, and whether to mention Postman as a short note. These choices are flexible as long as the decisions above remain true.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Scope
- `.planning/PROJECT.md` - Project purpose, core value, constraints, ethical boundaries, and active requirements for the Session Hijacking demo.
- `.planning/REQUIREMENTS.md` - Requirements VULN-02, ATK-01, and ATK-02 mapped to Phase 2, plus deferred v2 boundaries.
- `.planning/ROADMAP.md` - Phase 2 goal, success criteria, and the planned slices `02-01` and `02-02`.
- `.planning/STATE.md` - Current project position after Phase 1 and known concern about fixed-mode Secure cookies later.
- `.planning/phases/01-vulnerable-lab-foundation/01-CONTEXT.md` - Locked Phase 1 decisions, especially the vulnerable `sid` cookie and phase boundaries.

### Project Instructions and Existing App
- `AGENTS.md` - Repository-level GSD rules, recommended Express stack, vulnerable/fixed cookie guidance, source notes, and presentation constraints.
- `README.md` - Current local run commands, fake users, Phase 1 manual inspection steps, and ethical warning.
- `package.json` - Available scripts and dependencies: Express, EJS, `express-session`, Vitest, and Supertest.
- `src/server.js` - Existing login route, dashboard route, session middleware wiring, and exported `createApp()`.
- `src/session/vulnerable-session.js` - Intentionally insecure `sid` cookie configuration used by the attack.
- `src/middleware/require-auth.js` - Auth gate that redirects unauthenticated dashboard requests to `/login`.
- `tests/session-cookie.test.js` - Existing cookie assertions and Supertest patterns that can be reused for the replay proof.

### External Specs
- No separate external spec files exist. External references to Express `express-session`, MDN Set-Cookie, and OWASP Session Management are listed in `AGENTS.md` source notes.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/server.js`: exports `createApp()`, which makes focused Supertest attack proof tests straightforward.
- `src/session/vulnerable-session.js`: exposes the vulnerable `sid` cookie settings the walkthrough should point to.
- `src/middleware/require-auth.js`: gives a simple observable denial path for second clients without a valid session.
- `tests/session-cookie.test.js`: already extracts the `sid` cookie after login and checks vulnerable attributes.
- `README.md`: already documents local run commands, fake users, and Phase 1 cookie inspection.

### Established Patterns
- The app uses CommonJS modules, Express routes, server-rendered EJS pages, and no database.
- Tests use Vitest plus Supertest and avoid starting the network listener directly.
- Documentation is currently concise and classroom-oriented, with Portuguese project wording and ASCII-only text.
- The lab is intentionally local, fake-data-only, and presentation-focused.

### Integration Points
- Add the replay proof test near the existing session cookie tests or in a closely named new test file.
- Add Phase 2 documentation under a focused docs path and link it from the README.
- Reuse `/login` and `/dashboard`; avoid adding attack-specific app endpoints unless planning finds a very small clarity improvement.

</code_context>

<specifics>
## Specific Ideas

- Primary manual flow: start the app, log in as `alice`, copy `sid`, confirm a second client cannot reach `/dashboard` before replay, apply/send `sid` from the second client, reload/request `/dashboard`, and show Alice's fake private dashboard data without a password prompt.
- `cURL` backup should use the existing local host and a `Cookie: sid=<copied-value>` header. The exact command should be tested during implementation so quoting and cookie encoding work on Windows PowerShell.
- Evidence should be compact enough for later slides: "victim logged in", "sid copied", "second client denied before cookie", "second client accepted after cookie".
- Keep the explanation direct: the cookie is acting as the bearer of the session identity, so copying it copies access in vulnerable mode.

</specifics>

<deferred>
## Deferred Ideas

- Fixed cookie attributes, expiration changes, session regeneration, and real logout invalidation remain Phase 3.
- Showing the same cookie-reuse attack fail after mitigations remains Phase 4.
- Final slides, PDF export, references formatting, and the timed 25-minute oral script remain Phase 5.
- Docker packaging, full automated cookie/session test coverage, detailed HTTPS certificate setup, XSS, CSRF, network sniffing, public deployment, and real targets remain out of v1 Phase 2 scope.

</deferred>

---

*Phase: 2-Session Reuse Attack*
*Context gathered: 2026-06-09*
