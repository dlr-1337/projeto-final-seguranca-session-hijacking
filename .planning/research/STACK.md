# Stack Research: Session Hijacking Lab

## Recommendation

Use a small Node.js + Express application with `express-session`, server-rendered HTML, and simple in-memory users/sessions for the academic lab.

## Why This Stack Fits

- Express is lightweight and fast to explain in a 25-minute presentation.
- `express-session` stores only the session ID in the browser cookie and keeps session data server-side, which matches the concept being demonstrated.
- Cookie options are explicit and easy to compare between vulnerable and fixed modes: `secure`, `httpOnly`, `sameSite`, `maxAge`, and session invalidation.
- The app can run locally on Windows without Kali or Docker, while still allowing demonstration with browser DevTools, Postman, Burp Suite Community, OWASP ZAP, or cURL.
- A single process is enough for the classroom demo; no database is required unless the team wants extra realism.

## Proposed Runtime

- Node.js
- Express
- express-session
- EJS or plain server-rendered HTML
- Optional: dotenv for mode switching
- Optional: self-signed HTTPS for the fixed-mode Secure cookie demo

## Vulnerable Configuration

- Cookie name: `sid` or another visibly simple name.
- `httpOnly: false` to show that client-side JavaScript or DevTools can read the cookie.
- `secure: false` so the cookie is sent over HTTP.
- `sameSite: false` or omitted.
- Long or absent `maxAge` so the session remains reusable.
- Logout either missing or not destroying the server-side session.

## Fixed Configuration

- Cookie name: `__Host-session` when HTTPS is enabled locally, or `sid` when running plain localhost with an explicit note.
- `httpOnly: true`.
- `secure: true` for HTTPS mode.
- `sameSite: 'lax'` or `'strict'`.
- Short `maxAge`, for example 5 minutes for demo clarity.
- Server-side session destruction on logout.
- Optional: regenerate session after login to reduce fixation risk.

## Source Notes

- Express `express-session` documents cookie options and defaults, including `httpOnly`, `secure`, `sameSite`, and `maxAge`: https://expressjs.com/en/resources/middleware/session/
- MDN documents Set-Cookie attributes and notes that Secure cookies require HTTPS except localhost handling: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie
- OWASP recommends secure session identifiers, secure cookie attributes, and server-side expiration: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
