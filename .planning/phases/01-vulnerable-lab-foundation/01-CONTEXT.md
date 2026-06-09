# Phase 1: Vulnerable Lab Foundation - Context

**Gathered:** 2026-06-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 1 delivers the local vulnerable lab foundation: a minimal Node.js/Express application with fake login, a protected dashboard, and intentionally insecure session cookie configuration that is visible in the code and easy to explain in class.

This phase does not implement the cookie-reuse attack walkthrough, the fixed session mode, mitigation verification, or presentation materials. Those remain Phase 2, Phase 3, Phase 4, and Phase 5 work.

</domain>

<decisions>
## Implementation Decisions

### App Shell and Routes
- **D-01:** Build a small Express app with server-rendered HTML using EJS or plain templates. Avoid a SPA/frontend framework because the demo needs to be fast to explain and focused on sessions.
- **D-02:** The minimum route set is `GET /`, `GET /login`, `POST /login`, and protected `GET /dashboard`. A logout route may be added only if it stays clearly vulnerable or placeholder-like; real server-side logout invalidation belongs to Phase 3.
- **D-03:** Keep dependencies lightweight: `express`, `express-session`, a template option such as `ejs`, and optionally `dotenv` for future mode switching. Do not add a database in this phase.

### Fake Identity and Protected Data
- **D-04:** Use in-memory fake users with credentials documented for the classroom demo. No real names, real credentials, or sensitive data.
- **D-05:** The protected dashboard should show user-specific private-looking fake data, such as lab notes, account identifiers, or security checklist status, so unauthorized access is visibly meaningful without using real information.

### Vulnerable Session Configuration
- **D-06:** The default Phase 1 startup mode is vulnerable. Session configuration should live in a clearly named block or helper so Phase 3 can compare vulnerable and fixed settings without a large refactor.
- **D-07:** Use `express-session` with server-side session data and a browser cookie named `sid`.
- **D-08:** Configure the vulnerable cookie explicitly: `httpOnly: false`, `secure: false`, `sameSite: false` or omitted, and a long demo-friendly `maxAge` such as 24 hours. This makes the insecure settings inspectable in code and DevTools.
- **D-09:** Do not add session-regeneration or fixation-focused safeguards in Phase 1. Keep the visible failure centered on insecure session cookie reuse.

### Local Run and Evidence
- **D-10:** Provide simple local commands: `npm install`, `npm run dev`, and `npm start`, using a predictable local port such as `3000`.
- **D-11:** Add README instructions with run commands, fake credentials, and the file or section where the vulnerable cookie settings can be inspected.
- **D-12:** Keep execution local and controlled. Do not add Docker, public deployment, or detailed HTTPS certificate setup in Phase 1.

### Phase Boundary
- **D-13:** Phase 2 owns the reproducible cookie-reuse attack. Phase 3 owns secure cookie flags, expiration policy, and real logout invalidation. Phase 4 owns proving that the same reuse attempt fails after mitigation.

### the agent's Discretion
The planner may choose EJS or plain server-rendered HTML, exact fake usernames, exact dashboard copy, and whether to organize code as `src/server.js` plus helpers or another simple Express layout, as long as the decisions above remain true.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Scope
- `.planning/PROJECT.md` - Project purpose, core value, constraints, key decisions, and ethical boundaries for the local Session Hijacking demo.
- `.planning/REQUIREMENTS.md` - Requirements APP-01, APP-02, and VULN-01 mapped to Phase 1, plus deferred v2 items.
- `.planning/ROADMAP.md` - Phase 1 goal, success criteria, and the two planned work slices `01-01` and `01-02`.
- `.planning/STATE.md` - Current project status and known concern about Secure cookies requiring HTTPS or a clear localhost explanation later.

### Project Instructions
- `AGENTS.md` - Repository-level GSD workflow rules, recommended stack, vulnerable cookie configuration guidance, fixed-mode contrast, and presentation constraints.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- No application code exists yet. Phase 1 establishes the initial Express app, route structure, and documentation.

### Established Patterns
- Planning artifacts already favor Node.js, Express, `express-session`, server-rendered HTML, and no database for the MVP.
- The project is organized around GSD phase artifacts under `.planning/phases/`, with each phase expected to produce clear downstream context before planning.

### Integration Points
- Create the initial app entry points, likely `package.json`, `src/server.js` or `app.js`, a small views/templates folder, and a README.
- Keep session configuration easy to locate and compare, for example in a named helper or a clearly labeled section near server setup.

</code_context>

<specifics>
## Specific Ideas

- Vulnerable cookie name: `sid`.
- Vulnerable flags: `httpOnly: false`, `secure: false`, `sameSite: false` or omitted, and long `maxAge` such as 24 hours.
- Demo data should look private enough to prove authenticated access, but must be entirely fictitious.
- The dashboard can label the current mode as vulnerable if that helps the oral demonstration.

</specifics>

<deferred>
## Deferred Ideas

- Cookie capture/reuse walkthrough, DevTools/Postman/cURL steps, and exploit evidence belong to Phase 2.
- Fixed cookies, short expiration, `HttpOnly`, `Secure`, `SameSite`, and real logout invalidation belong to Phase 3.
- Verification that reuse fails after mitigation belongs to Phase 4.
- Slides, PDF export, final references, and 25-minute script belong to Phase 5.
- Docker packaging, full automated cookie/session tests, and detailed self-signed HTTPS certificate workflow remain v2 enhancements unless explicitly pulled into a later phase.

</deferred>

---

*Phase: 1-Vulnerable Lab Foundation*
*Context gathered: 2026-06-09*
