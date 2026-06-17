# Referências - Apresentação de Session Hijacking

Estas são as referências oficiais e locais para citar nos slides e na fala.

## Fontes Oficiais

| Fonte | Link | Uso na apresentação |
|-------|------|---------------------|
| OWASP Top 10 2025 - A07 Authentication Failures | https://owasp.org/Top10/2025/A07_2025-Authentication_Failures/ | Mapear Session Hijacking e falhas de sessão/autenticação ao OWASP Top 10 atual. |
| OWASP Top 10 2021 - A07 Identification and Authentication Failures | https://owasp.org/Top10/2021/A07_2021-Identification_and_Authentication_Failures/ | Mencionar o nome usado em materiais baseados no Top 10 2021. |
| OWASP Session Management Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html | Justificar proteção do identificador de sessão, expiração e invalidação. |
| MDN Set-Cookie | https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie | Explicar `HttpOnly`, `Secure`, `SameSite`, `Path`, `Expires` e comportamento de localhost. |
| Express `express-session` | https://expressjs.com/en/resources/middleware/session/ | Mostrar que `cookie.httpOnly`, `cookie.secure`, `cookie.sameSite` e `cookie.maxAge` são opções reais da tecnologia usada. |

## Fontes Locais do Projeto

| Fonte | Caminho | Uso na apresentação |
|-------|---------|---------------------|
| Roteiro do ataque | `docs/session-reuse-attack.md` | Passos do replay do `sid`, cURL fallback e princípio violado. |
| Roteiro da correção | `docs/session-security-fixes.md` | Explicação dos atributos seguros, logout e Secure em localhost. |
| Roteiro de verificação | `docs/mitigation-verification.md` | Antes/depois e `302 Location: /login` como negação observável. |
| Código vulnerável | `src/session/vulnerable-session.js` | Snippet do `sid` com `httpOnly: false`, `secure: false`, `sameSite: false`. |
| Código corrigido | `src/session/fixed-session.js` | Snippet do `__Host-session`, `HttpOnly`, `Secure`, `SameSite=Strict`, `maxAge`. |
| Prova de ataque | `tests/session-reuse-attack.test.js` | Teste que reutiliza o `sid` em uma requisição separada. |
| Prova de mitigação | `tests/session-mitigation-verification.test.js` | Teste antes/depois com replay vulnerável e negação no modo corrigido. |
| Prova de cookie seguro | `tests/session-fixed-cookie.test.js` | Teste dos atributos do cookie corrigido. |
| Prova de logout | `tests/session-logout.test.js` | Teste de invalidação de sessão no servidor após logout. |

## Frases Curtas para os Slides

- "O cookie de sessão ativo funciona como credencial bearer."
- "As mitigações reduzem exposição, transporte inseguro e janela de uso."
- "`Secure` exige HTTPS para proteção real; o HTTP local é fallback de inspeção."
- "Depois de logout, expiração ou troca para modo corrigido, o cookie reutilizado redireciona para `/login`."

## Observação de Escopo

As referências apoiam apenas o tema Session Hijacking em ambiente local. XSS, CSRF, sniffing, Docker, HTTPS local completo e deploy público ficam fora do v1.
