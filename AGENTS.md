<!-- GSD:project-start source:PROJECT.md -->

## Project

**Projeto Final: Session Hijacking**

Este projeto final da disciplina de Seguranca da Informacao constroi um ambiente local vulneravel a Session Hijacking e depois aplica as correcoes adequadas. O foco e permitir uma demonstracao pratica e didatica em que a equipe mostra como cookies de sessao inseguros permitem reutilizacao de sessao, e como a mitigacao bloqueia o ataque.

O projeto sera usado por uma equipe de 2 integrantes para desenvolver, configurar, demonstrar e apresentar oralmente a vulnerabilidade, relacionando a falha ao OWASP Top 10, aos principios de seguranca violados e ao Secure SDLC.

**Core Value:** A demonstracao deve provar, de forma reproduzivel e local, que uma sessao insegura pode ser sequestrada e que as correcoes implementadas impedem a reutilizacao indevida da sessao.

### Constraints

- **Tema**: Session Hijacking - o projeto deve focar em cookies de sessao e reutilizacao de sessao.
- **Ambiente**: Local e controlado - requisito etico e academico da atividade.
- **Tempo de apresentacao**: Maximo de 25 minutos - o roteiro precisa ser direto e ensaiavel.
- **Entrega didatica**: Deve mostrar codigo vulneravel e codigo corrigido - nao basta apenas explicar conceitualmente.
- **Seguranca**: Nao usar dados reais nem alvos externos - a demonstracao deve ser autorizada e reproduzivel.
- **Equipe**: 2 integrantes - ambos devem participar do desenvolvimento, configuracao, demonstracao e apresentacao oral.

<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->

## Technology Stack

## Recommendation

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

<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:

- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
