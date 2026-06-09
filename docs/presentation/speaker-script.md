# Roteiro de Apresentacao - Session Hijacking

**Duracao total:** 25 min
**Formato:** dois integrantes, demo local controlada, dados ficticios.

## Divisao Rapida

| Bloco | Tempo | Responsavel | Slides | Objetivo |
|-------|-------|-------------|--------|----------|
| Conceito | 7 min | Integrante 1 | 1-4 | Explicar objetivo, arquitetura e como o cookie vira credencial bearer. |
| Ataque | 8 min | Integrante 1 com apoio do Integrante 2 | 5-7 | Mostrar o replay do `sid` em outro cliente local. |
| Correcao e verificacao | 8 min | Integrante 2 com apoio do Integrante 1 | 8-10 | Mostrar codigo corrigido, logout/expiracao e `302 Location: /login`. |
| Conclusao | 2 min | Integrante 2 | 11-12 | Amarrar OWASP, Secure SDLC, conclusao e referencias. |

## Antes de Comecar

- Abrir o projeto no terminal.
- Confirmar que as dependencias estao instaladas com `npm install`.
- Ter dois clientes locais: Cliente A e Cliente B.
- Deixar os arquivos `src/session/vulnerable-session.js` e `src/session/fixed-session.js` prontos para mostrar.
- Nunca mostrar valores reais de cookie; se aparecer em screenshot, redact.

## Bloco 1 - Conceito (7 min)

### Slide 1 - Titulo (1 min) - Integrante 1

Fala sugerida:

> Nosso tema e Session Hijacking. A ideia e mostrar, de forma local e autorizada, que um cookie de sessao inseguro pode ser reutilizado por outro cliente e que as correcoes bloqueiam o reuso quando a sessao fica invalida, antiga, expirada ou encerrada.

Observacao esperada:

- A banca entende que o ambiente e local, didatico e com dados ficticios.

### Slide 2 - Objetivo e escopo etico (1 min) - Integrante 1

Fala sugerida:

> Todo o teste roda em `127.0.0.1` ou localhost. Nao usamos contas reais, dados reais, sites externos, sniffing, XSS ou CSRF. O foco e um unico ponto: reutilizacao do cookie de sessao.

Observacao esperada:

- O escopo etico fica claro antes de qualquer passo ofensivo.

### Slide 3 - Arquitetura (2 min) - Integrante 1

Fala sugerida:

> O navegador envia um cookie para o Express. O `express-session` guarda os dados no servidor e deixa no navegador apenas o identificador da sessao. O dashboard e protegido por `requireAuth`.

Mostrar rapidamente:

- `README.md` com usuarios ficticios.
- Rotas principais: `/login`, `/dashboard`, `POST /logout`.

Observacao esperada:

- A banca entende que copiar o identificador e suficiente para tentar "colar" outro cliente na mesma sessao.

### Slide 4 - Como acontece o hijacking (3 min) - Integrante 1

Fala sugerida:

> Um cookie de sessao ativo se comporta como credencial bearer. Quem apresenta o identificador valido consegue se passar pela sessao enquanto o servidor aceitar aquele ID.

Mensagem obrigatoria:

- As mitigacoes reduzem exposicao, transporte inseguro e tempo de uso.
- Um cookie ativo ainda e sensivel ate expirar ou ser invalidado no servidor.

Observacao esperada:

- A explicacao prepara o ataque sem prometer uma defesa absoluta.

## Bloco 2 - Ataque (8 min)

### Slide 5 - Codigo vulneravel (2 min) - Integrante 1

Mostrar:

- `src/session/vulnerable-session.js`

Fala sugerida:

> O modo vulneravel usa `sid`, `httpOnly: false`, `secure: false`, `sameSite: false` e um `maxAge` longo. Isso foi intencional para a demonstracao.

Observacao esperada:

- A banca ve o codigo vulneravel, nao apenas uma explicacao teorica.

### Slide 6 - Demo do ataque (4 min) - Integrante 1 opera, Integrante 2 acompanha

Passos:

1. Iniciar modo vulneravel:

```bash
npm run dev
```

2. Cliente A abre:

```text
http://127.0.0.1:3000/login
```

3. Cliente A faz login:

```text
Usuario: alice
Senha: alice123
```

Resultado esperado:

- Cliente A entra em `/dashboard` e ve dados ficticios da Alice.

4. Cliente B tenta acessar antes do cookie:

```text
http://127.0.0.1:3000/dashboard
```

Resultado esperado:

- Cliente B redireciona para `/login`.

5. Cliente A copia o cookie `sid` pelo DevTools.

6. Cliente B recebe o cookie `sid` com valor redigido/nao exibido no slide.

Resultado esperado:

- Cliente B recarrega `/dashboard` e ve dados ficticios da Alice sem digitar senha.

Fallback se editar cookie no navegador estiver lento:

```powershell
curl.exe -i http://127.0.0.1:3000/dashboard -H "Cookie: sid=<copied-sid-value>"
```

Resultado esperado:

- Resposta contem `Painel protegido`, `Alice Demo` ou `LAB-ALICE-001`.

### Slide 7 - Impacto (2 min) - Integrante 1

Fala sugerida:

> O impacto e impersonacao: o segundo cliente acessa o dashboard protegido sem senha. O principio violado e o controle insuficiente do identificador de sessao.

Mostrar como prova automatizada:

- `tests/session-reuse-attack.test.js`

Observacao esperada:

- A banca entende que o replay do cookie e a prova de acesso indevido.

## Reset Entre Ataque e Correcao

Responsavel: Integrante 2 opera, Integrante 1 narra rapidamente.

Passos:

1. Parar o servidor com `Ctrl+C`.
2. Limpar cookies/site data de `127.0.0.1` e `localhost`.
3. Usar Cliente B limpo ou nova janela.
4. Descartar o valor antigo de `sid` se estiver usando `curl.exe`.

Resultado esperado:

- Nenhum cookie antigo interfere no modo corrigido.

## Bloco 3 - Correcao e Verificacao (8 min)

### Slide 8 - Codigo corrigido (2 min) - Integrante 2

Mostrar:

- `src/session/fixed-session.js`

Fala sugerida:

> O caminho corrigido usa `__Host-session`, `httpOnly: true`, `secure: true`, `sameSite: "strict"`, `maxAge` de 5 minutos e `path: "/"`.

Ponto importante:

- `Secure` protege de verdade com HTTPS.
- `npm run dev:fixed` usa fallback HTTP local para inspecao em sala.

### Slide 9 - Lifecycle da sessao (2 min) - Integrante 2

Mostrar:

- `src/server.js`, especialmente login/regenerate e `POST /logout`.

Fala sugerida:

> Alem dos atributos, o servidor invalida a sessao no logout com `req.session.destroy` e limpa o cookie. Isso importa porque apagar cookie no cliente sem destruir a sessao no servidor nao basta.

Resultado esperado:

- A banca entende a diferenca entre esconder o cookie e invalidar a sessao.

### Slide 10 - Verificacao da mitigacao (4 min) - Integrante 2 opera

Passos:

1. Iniciar modo corrigido local:

```bash
npm run dev:fixed
```

2. Tentar acessar `/dashboard` com cookie antigo, invalido ou ausente.

Resultado esperado:

- Redirecionamento para `/login` ou `302 Location: /login`.

3. Fazer login como Alice, copiar o cookie corrigido, executar logout pelo dashboard.

4. Tentar reutilizar o cookie corrigido depois do logout.

Resultado esperado:

- `GET /dashboard` retorna `302 Location: /login`.

5. Rodar prova automatizada:

```bash
npm test
```

Resultado esperado:

- Testes passam, incluindo `mitigation verification`, `fixed session cookie` e `fixed session logout`.

Mensagem obrigatoria:

> A mitigacao nao promete que um cookie ativo copiado magicamente deixa de ser bearer. Ela reduz exposicao e janela de uso, e a verificacao mostra que cookies antigos, invalidos, expirados ou apos logout nao abrem mais o dashboard.

## Bloco 4 - Conclusao (2 min)

### Slide 11 - OWASP e Secure SDLC (1 min) - Integrante 2

Fala sugerida:

> O problema se relaciona ao OWASP Top 10 2025 A07 Authentication Failures. Tambem podemos citar o nome usado em 2021: Identification and Authentication Failures. A correcao segue a linha do OWASP Session Management Cheat Sheet: proteger o identificador, reduzir exposicao, limitar tempo de vida e invalidar no servidor.

### Slide 12 - Fechamento e referencias (1 min) - Integrante 2

Fala sugerida:

> Concluindo: no antes, o `sid` vulneravel permite acesso sem senha em outro cliente. No depois, os controles de cookie, expiracao e logout fazem a reutilizacao indevida falhar quando a sessao deixa de ser valida. O projeto mostrou Secure SDLC em miniatura: identificar, explorar localmente, corrigir e verificar.

Referencias a mencionar:

- OWASP Top 10 A07 Authentication Failures.
- OWASP Session Management Cheat Sheet.
- MDN Set-Cookie.
- Express `express-session`.
- Codigo e testes deste laboratorio.

## Checklist de Ensaio

- [ ] O tempo total fica em 25 min.
- [ ] O bloco de conceito fica em 7 min.
- [ ] O bloco de ataque fica em 8 min.
- [ ] O bloco de correcao/verificacao fica em 8 min.
- [ ] A conclusao fica em 2 min.
- [ ] Integrante 1 fala e participa da demo.
- [ ] Integrante 2 fala e participa da demo.
- [ ] O valor real de cookie nunca aparece no slide final.
- [ ] `npm run dev`, `npm run dev:fixed` e `npm test` foram ensaiados.
- [ ] O fallback com `curl.exe` esta pronto.
