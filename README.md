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

A reutilizacao do cookie de sessao ainda nao e documentada aqui. O roteiro de ataque pertence a Phase 2.

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

Pare a verificacao aqui nesta fase. A reutilizacao controlada do cookie sera documentada apenas na Phase 2.

## Comandos de Teste

```bash
npm test
```

## Aviso Etico

Este projeto deve ser executado apenas em ambiente local e autorizado. Nao use dados reais, credenciais reais, sistemas externos ou redes de terceiros.
