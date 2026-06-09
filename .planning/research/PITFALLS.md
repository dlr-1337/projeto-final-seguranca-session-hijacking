# Pitfalls Research: Session Hijacking Lab

## Technical Pitfalls

- `Secure` cookies are not sent over ordinary HTTP. The fixed-mode demo should either run on HTTPS locally or explicitly explain browser behavior on localhost.
- `HttpOnly` prevents JavaScript access through `document.cookie`, but it does not stop a copied cookie from being sent by the browser if the attacker already has it.
- `SameSite` helps with cross-site request contexts, but it is not a complete defense against a token already copied by an attacker.
- Client-side expiration alone is insufficient; session expiration must be enforced server-side.
- Destroying the cookie in the browser is not enough if the server-side session remains valid.
- Long demos can fail if the fixed-mode `maxAge` is too short; choose a short but presentable timeout.
- Browser extensions, restored browser sessions, and DevTools behavior can make cookie demos look inconsistent. Keep a Postman or cURL fallback.

## Presentation Pitfalls

- Do not spend too long explaining generic authentication. The scoring rewards building, exploiting, correcting, and teaching the specific vulnerability.
- Show before/after code side by side. The rubric explicitly expects vulnerable code and corrected code.
- Use fake users and fake sensitive data so the ethics section is visibly respected.
- Keep the attack repeatable with clean reset commands.
- Make the mitigation proof concrete: a 401/redirect/login prompt is easier to understand than a vague explanation.

## Security Pitfalls

- Do not include real credentials in slides or source code.
- Do not publish the vulnerable app as-is.
- Do not demonstrate against real websites, university systems, classmates, or public IPs.
- Label intentionally vulnerable code clearly.

## Source Notes

- OWASP states that once authenticated, the session ID temporarily acts as equivalent to the authentication method, which explains the impact of stolen tokens: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
- MDN notes Secure cookies are only sent over HTTPS, except specific localhost behavior: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie
- Express warns that `secure: true` requires HTTPS and gives environment-based examples: https://expressjs.com/en/resources/middleware/session/
