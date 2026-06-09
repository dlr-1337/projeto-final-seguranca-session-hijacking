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

A reutilizacao do cookie de sessao ainda nao e documentada aqui. O roteiro de ataque pertence a Phase 2.

## Comandos de Teste

```bash
npm test
```

## Aviso Etico

Este projeto deve ser executado apenas em ambiente local e autorizado. Nao use dados reais, credenciais reais, sistemas externos ou redes de terceiros.
