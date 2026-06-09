# Session Security Fixes

Roteiro local para explicar as mitigacoes da Phase 3 contra Session Hijacking no laboratorio Express.

Use este material apenas no ambiente local autorizado do projeto. A Phase 3 implementa as correcoes; a Phase 4 prova, em uma sequencia antes/depois, que a reutilizacao do cookie passa a falhar.

## Objetivo

Mostrar no codigo corrigido que a sessao agora usa atributos de cookie seguros, expiracao curta e logout com invalidacao real no servidor.

## Como Iniciar

Modo vulneravel padrao:

```bash
npm run dev
```

Modo corrigido em HTTP local para inspecao didatica:

```bash
npm run dev:fixed
```

O script `dev:fixed` usa `SESSION_MODE=fixed` e `SESSION_COOKIE_SECURE=false` porque o navegador comum em `http://127.0.0.1:3000` nao persistiria um cookie Secure sem HTTPS. Isso e um fallback de laboratorio para observar `HttpOnly`, `SameSite`, `maxAge` e logout; nao e a postura segura completa.

O caminho seguro do codigo fica em `src/session/fixed-session.js` e e coberto por teste automatizado com `secure: true`.

## Codigo Vulneravel vs Corrigido

Configuracao vulneravel:

- Arquivo: `src/session/vulnerable-session.js`
- Cookie: `sid`
- `httpOnly: false`
- `secure: false`
- `sameSite: false`
- `maxAge: 24 * 60 * 60 * 1000`

Configuracao corrigida:

- Arquivo: `src/session/fixed-session.js`
- Cookie seguro: `__Host-session`
- `httpOnly: true`
- `secure: true`
- `sameSite: "strict"`
- `maxAge: 5 * 60 * 1000`
- `path: "/"`
- Sem `Domain`

## Atributos Corrigidos

| Atributo | Por que mitiga |
|----------|----------------|
| `HttpOnly` | Reduz exposicao do identificador de sessao a JavaScript no navegador. |
| `Secure` | Restringe envio do cookie a transporte HTTPS. |
| `SameSite=Strict` | Reduz envio automatico do cookie em contextos cross-site. |
| `maxAge` curto | Limita a janela de reutilizacao caso um cookie seja copiado. |
| `__Host-session` | Exige uma forma mais restrita de cookie: Secure, Path=/ e sem Domain. |

## Expiracao

O modo corrigido usa `FIXED_SESSION_MAX_AGE_MS = 5 * 60 * 1000`. Esse valor e curto para deixar a mitigacao visivel em uma demonstracao e para limitar a duracao util de um cookie copiado.

Se a equipe precisar ensaiar por mais tempo, pode reiniciar a sessao ou ajustar o valor de forma explicita, explicando que sessoes mais longas ampliam a janela de risco.

## Logout e Invalidacao

O dashboard tem um formulario `POST /logout`. O servidor executa:

1. `req.session.destroy(...)` para invalidar o estado de sessao no servidor.
2. `res.clearCookie(...)` com o nome e opcoes do cookie ativo.
3. Redirecionamento para `/login`.

O teste `tests/session-logout.test.js` valida que o cookie antigo nao acessa `/dashboard` depois do logout. Isso cobre a exigencia de invalidar a sessao no servidor, nao apenas esconder o cookie no cliente.

## Limitacao do Secure em HTTP Local

`Secure` so protege de verdade quando ha HTTPS. No laboratorio simples em `http://127.0.0.1:3000`, o script `npm run dev:fixed` desativa `SESSION_COOKIE_SECURE` apenas para permitir a inspecao local no navegador.

Para a apresentacao:

- Mostre o codigo corrigido com `secure: true`.
- Mostre o teste `tests/session-fixed-cookie.test.js`, que verifica o cookie seguro.
- Explique que um fluxo HTTPS local completo ou certificado autoassinado detalhado ficou fora do v1 e pode ser melhoria futura.

## Relacao com OWASP

As mitigacoes seguem a ideia central do OWASP Session Management Cheat Sheet: proteger o identificador de sessao, reduzir exposicao do cookie, limitar tempo de vida e invalidar a sessao no servidor.

No ataque da Phase 2, a posse do `sid` bastava para acessar a conta ficticia. Na correcao, o identificador fica menos exposto, tem transporte restrito no caminho seguro, expira mais rapido e e removido do servidor no logout.

## Relacao com Secure SDLC

O fluxo do projeto mostra uma etapa simples de Secure SDLC:

1. Identificar a falha: cookie de sessao reutilizavel em modo vulneravel.
2. Demonstrar impacto: segundo cliente acessa `/dashboard` sem senha.
3. Implementar mitigacao: atributos seguros, expiracao e logout real.
4. Verificar mitigacao: Phase 4 repetira o mesmo ataque e registrara a falha da reutilizacao.

## O Que a Phase 4 Vai Verificar

A Phase 4 deve repetir o mesmo fluxo da Phase 2 contra o modo corrigido:

1. Confirmar o ataque funcionando no modo vulneravel.
2. Trocar para modo corrigido.
3. Tentar reutilizar o cookie no segundo cliente.
4. Observar redirecionamento para `/login`, resposta `401`, ou outra negacao clara.

Esta Phase 3 nao cria a prova final de replay falhando; ela entrega o codigo corrigido e os testes focados que tornam essa prova possivel.
