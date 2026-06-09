# Feature Research: Session Hijacking Lab

## Table Stakes

### Vulnerable Application

- Login page with at least two fictitious users.
- Authenticated dashboard showing username, role, and a fake private value.
- Cookie/session inspection page or visible demo panel showing the current session mode.
- Vulnerable session settings that allow cookie reuse.
- Logout behavior that is intentionally weak in vulnerable mode.

### Attack Demonstration

- Step-by-step way to obtain a session cookie in the controlled lab.
- Reuse of that cookie in another browser profile, private window, Postman, cURL, Burp Suite, or OWASP ZAP.
- Proof that the second client accesses the protected dashboard without knowing the password.
- Clear reset path so the demo can be repeated during presentation.

### Mitigation Demonstration

- Fixed session settings with `HttpOnly`, `Secure`, `SameSite`, and expiration.
- Server-side logout that destroys the session.
- Attempted cookie reuse after mitigation.
- Clear evidence that the protected route rejects the stolen or expired session.

### Documentation and Presentation

- Code snippets for vulnerable and fixed session configuration.
- Architecture diagram showing browser, cookie, server, session store, and protected page.
- Slide-ready explanation of impact and violated security principles.
- Script for the 25-minute presentation.

## Differentiators

- Toggle between vulnerable and fixed modes using an environment variable, for example `SESSION_MODE=vulnerable|fixed`.
- Local HTTPS mode using a self-signed certificate for the `Secure` cookie demonstration.
- `/debug/session` endpoint available only in vulnerable mode to make the session state visible for teaching.
- Automated smoke tests showing attack succeeds in vulnerable mode and fails in fixed mode.
- Dockerfile or npm scripts to make setup one-command.

## Anti-Features

- Do not target real websites or external systems.
- Do not store real credentials.
- Do not overbuild user management, registration, database schema, or admin panels.
- Do not add unrelated vulnerabilities such as SQL Injection or XSS unless used only as a brief conceptual comparison.

## Source Notes

- OWASP describes session hijacking as possible when the session ID is disclosed, captured, predicted, brute forced, or fixed: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
- OWASP Top 10 A07 covers identification, authentication, and session management failures: https://owasp.org/Top10/2021/A07_2021-Identification_and_Authentication_Failures/
- MDN recommends restrictive cookie attributes, including Secure, HttpOnly, and SameSite: https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/Cookies
