# Referencias - Session Hijacking Presentation

Estas sao as referencias oficiais e locais para citar nos slides e na fala.

## Fontes Oficiais

| Fonte | Link | Uso na apresentacao |
|-------|------|---------------------|
| OWASP Top 10 2025 - A07 Authentication Failures | https://owasp.org/Top10/2025/A07_2025-Authentication_Failures/ | Mapear Session Hijacking e falhas de sessao/autenticacao ao OWASP Top 10 atual. |
| OWASP Top 10 2021 - A07 Identification and Authentication Failures | https://owasp.org/Top10/2021/A07_2021-Identification_and_Authentication_Failures/ | Mencionar o nome usado em materiais baseados no Top 10 2021. |
| OWASP Session Management Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html | Justificar protecao do identificador de sessao, expiracao e invalidacao. |
| MDN Set-Cookie | https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie | Explicar `HttpOnly`, `Secure`, `SameSite`, `Path`, `Expires` e comportamento de localhost. |
| Express `express-session` | https://expressjs.com/en/resources/middleware/session/ | Mostrar que `cookie.httpOnly`, `cookie.secure`, `cookie.sameSite` e `cookie.maxAge` sao opcoes reais da tecnologia usada. |

## Fontes Locais do Projeto

| Fonte | Caminho | Uso na apresentacao |
|-------|---------|---------------------|
| Roteiro do ataque | `docs/session-reuse-attack.md` | Passos do replay do `sid`, cURL fallback e principio violado. |
| Roteiro da correcao | `docs/session-security-fixes.md` | Explicacao dos atributos seguros, logout e Secure em localhost. |
| Roteiro de verificacao | `docs/mitigation-verification.md` | Antes/depois e `302 Location: /login` como negacao observavel. |
| Codigo vulneravel | `src/session/vulnerable-session.js` | Snippet do `sid` com `httpOnly: false`, `secure: false`, `sameSite: false`. |
| Codigo corrigido | `src/session/fixed-session.js` | Snippet do `__Host-session`, `HttpOnly`, `Secure`, `SameSite=Strict`, `maxAge`. |
| Prova de ataque | `tests/session-reuse-attack.test.js` | Teste que reutiliza o `sid` em uma requisicao separada. |
| Prova de mitigacao | `tests/session-mitigation-verification.test.js` | Teste antes/depois com replay vulneravel e negacao no modo corrigido. |
| Prova de cookie seguro | `tests/session-fixed-cookie.test.js` | Teste dos atributos do cookie corrigido. |
| Prova de logout | `tests/session-logout.test.js` | Teste de invalidacao de sessao no servidor apos logout. |

## Frases Curtas para os Slides

- "O cookie de sessao ativo funciona como credencial bearer."
- "As mitigacoes reduzem exposicao, transporte inseguro e janela de uso."
- "`Secure` exige HTTPS para protecao real; o HTTP local e fallback de inspecao."
- "Depois de logout, expiracao ou troca para modo corrigido, o cookie reutilizado redireciona para `/login`."

## Observacao de Escopo

As referencias apoiam apenas o tema Session Hijacking em ambiente local. XSS, CSRF, sniffing, Docker, HTTPS local completo e deploy publico ficam fora do v1.
