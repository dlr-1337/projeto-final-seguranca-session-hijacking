# Session Hijacking Lab

Aplicacao local e didatica para demonstrar Session Hijacking em ambiente controlado.

## Uso Local

```bash
npm install
npm run dev
```

Abra: http://127.0.0.1:3000

Para executar sem modo watch:

```bash
npm start
```

O modo padrao continua vulneravel para preservar a demonstracao antes/depois.
Para iniciar a variante corrigida em HTTP local para inspecao didatica:

```bash
npm run dev:fixed
```

Esse comando usa `SESSION_MODE=fixed` e `SESSION_COOKIE_SECURE=false` apenas para permitir login em `http://127.0.0.1:3000`. O atributo `Secure` exige HTTPS para protecao real; o codigo corrigido e os testes cobrem o caminho seguro com `secure: true`.

## Usuarios Ficticios

| Usuario | Senha |
|---------|-------|
| `alice` | `alice123` |
| `bruno` | `bruno123` |

Todos os dados exibidos no dashboard sao ficticios e existem apenas para a demonstracao academica.

## Escopo da Fase 1

Esta fase cria a base local do laboratorio:

- App Express com paginas de login e dashboard.
- Usuarios e dados privados ficticios.
- Scripts locais de execucao e testes.
- Sessao vulneravel com cookie inseguro visivel no codigo.

A reutilizacao controlada do cookie de sessao esta documentada no roteiro da Phase 2.

## Modo Vulneravel

A configuracao vulneravel esta em `src/session/vulnerable-session.js`.

Cookie de sessao:

| Atributo | Valor vulneravel |
|----------|------------------|
| Nome | `sid` |
| `httpOnly` | `false` |
| `secure` | `false` |
| `sameSite` | `false` |
| `maxAge` | `24 * 60 * 60 * 1000` |

Esses valores sao intencionais para a demonstracao local. Eles nao representam uma configuracao segura.

### Inspecao Manual no Navegador

1. Execute `npm run dev`.
2. Abra http://127.0.0.1:3000/login.
3. Entre com um usuario ficticio.
4. Abra DevTools e veja os cookies do site local.
5. Confirme que o cookie `sid` existe e que os atributos vulneraveis acima estao ausentes ou inseguros.

Pare a verificacao da Phase 1 aqui. Para a reutilizacao controlada do cookie, siga o roteiro da Phase 2 abaixo.

## Phase 2: Reutilizacao de Sessao

O roteiro de ataque local esta em [`docs/session-reuse-attack.md`](docs/session-reuse-attack.md).

Ele mostra como copiar o cookie vulneravel `sid` com DevTools e reutiliza-lo em outro cliente local para acessar `/dashboard` sem senha. O roteiro tambem inclui uma alternativa reproduzivel com `curl.exe`.

## Phase 3: Modo Corrigido

A configuracao corrigida esta em `src/session/fixed-session.js`. A selecao entre modos fica em `src/session/session-mode.js`.

O roteiro da correcao esta em [`docs/session-security-fixes.md`](docs/session-security-fixes.md).

Para o modo vulneravel padrao:

```bash
npm run dev
```

Para o modo corrigido em HTTP local de inspecao:

```bash
npm run dev:fixed
```

Tambem e possivel selecionar o modo por variaveis de ambiente:

```powershell
$env:SESSION_MODE="fixed"
$env:SESSION_COOKIE_SECURE="false"
npm run dev
```

Cookie corrigido no caminho seguro:

| Atributo | Valor corrigido |
|----------|-----------------|
| Nome | `__Host-session` |
| `HttpOnly` | `true` |
| `Secure` | `true` |
| `SameSite` | `Strict` |
| `maxAge` | `5 * 60 * 1000` |
| `Path` | `/` |
| `Domain` | nao definido |

Quando `SESSION_COOKIE_SECURE=false` for usado para HTTP local, o app usa o cookie `sid` sem o prefixo `__Host-`. Esse fallback serve apenas para inspecao local em navegador comum; nao deve ser descrito como configuracao segura completa. A prova de que a reutilizacao do cookie falha depois das mitigacoes pertence a Phase 4.

O logout do modo corrigido usa `POST /logout`, destroi a sessao no servidor e limpa o cookie do cliente.

## Phase 4: Verificacao da Mitigacao

O roteiro de verificacao esta em [`docs/mitigation-verification.md`](docs/mitigation-verification.md).

Ele repete a sequencia antes/depois: o replay do `sid` vulneravel acessa `/dashboard`, enquanto o modo corrigido nega cookies invalidos, antigos ou apos logout com `302 Location: /login`. Rode `npm test` para ver a prova automatizada dessa mitigacao.

## Comandos de Teste

```bash
npm test
```

## Aviso Etico

Este projeto deve ser executado apenas em ambiente local e autorizado. Nao use dados reais, credenciais reais, sistemas externos ou redes de terceiros.
