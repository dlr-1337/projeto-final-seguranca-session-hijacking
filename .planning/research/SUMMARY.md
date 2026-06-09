# Research Summary: Session Hijacking Lab

## Stack

Build a small Node.js + Express app using `express-session`. This stack keeps the implementation compact, makes cookie flags explicit, and is easy to demonstrate with browser DevTools, Postman, cURL, Burp Suite Community, or OWASP ZAP.

## Table Stakes

- Functional login and protected dashboard.
- Vulnerable cookie/session configuration.
- Reproducible session reuse attack.
- Corrected cookie/session configuration.
- Demonstration that the attack fails after mitigation.
- Slide-ready architecture, vulnerable code, corrected code, impacts, OWASP mapping, Secure SDLC discussion, conclusion, and references.

## Watch Out For

- `Secure` requires HTTPS except localhost-specific behavior, so the fixed demo should plan for local HTTPS or explain the limitation clearly.
- `HttpOnly`, `Secure`, and `SameSite` protect different parts of the problem; none of them alone is a complete session security model.
- Server-side expiration and logout invalidation are required for convincing mitigation.
- The classroom demo must stay local and use fictitious data.

## Recommended Project Shape

1. Build vulnerable Express app.
2. Script attack demo.
3. Add fixed mode.
4. Verify attack failure.
5. Produce slides and presentation script.

## Key References

- OWASP Session Management Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
- OWASP Top 10 A07:2021 Identification and Authentication Failures: https://owasp.org/Top10/2021/A07_2021-Identification_and_Authentication_Failures/
- MDN Secure cookie configuration: https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/Cookies
- MDN Set-Cookie header reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie
- Express session middleware: https://expressjs.com/en/resources/middleware/session/
