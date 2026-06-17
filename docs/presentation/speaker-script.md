# Roteiro de Apresentação - Session Hijacking

**Duração total:** 25 min
**Formato:** dois integrantes, demo local controlada, dados fictícios.

## Divisão Rápida

| Bloco | Tempo | Responsável | Slides | Objetivo |
|-------|-------|-------------|--------|----------|
| Conceito | 7 min | Integrante 1 | 1-4 | Explicar objetivo, arquitetura e como o cookie vira credencial bearer. |
| Ataque | 8 min | Integrante 1 com apoio do Integrante 2 | 5-7 | Mostrar o replay do `sid` em outro cliente local. |
| Correção e verificação | 8 min | Integrante 2 com apoio do Integrante 1 | 8-10 | Mostrar código corrigido, logout/expiração e `302 Location: /login`. |
| Conclusão | 2 min | Integrante 2 | 11-12 | Amarrar OWASP, Secure SDLC, conclusão e referências. |

## Antes de Começar

- Abrir o projeto no terminal.
- Confirmar que as dependências estão instaladas com `npm install`.
- Ter dois clientes locais: Cliente A e Cliente B.
- Deixar os arquivos `src/session/vulnerable-session.js` e `src/session/fixed-session.js` prontos para mostrar.
- Nunca mostrar valores reais de cookie; se aparecer em captura de tela, oculte.

## Bloco 1 - Conceito (7 min)

### Slide 1 - Título (1 min) - Integrante 1

Fala sugerida:

> Nosso tema é Session Hijacking. A ideia é mostrar, de forma local e autorizada, que um cookie de sessão inseguro pode ser reutilizado por outro cliente e que as correções bloqueiam o reuso quando a sessão fica inválida, antiga, expirada ou encerrada.

Observação esperada:

- A banca entende que o ambiente é local, didático e com dados fictícios.

### Slide 2 - Objetivo e escopo ético (1 min) - Integrante 1

Fala sugerida:

> Todo o teste roda em `127.0.0.1` ou localhost. Não usamos contas reais, dados reais, sites externos, sniffing, XSS ou CSRF. O foco é um único ponto: reutilização do cookie de sessão.

Observação esperada:

- O escopo ético fica claro antes de qualquer passo ofensivo.

### Slide 3 - Arquitetura (2 min) - Integrante 1

Fala sugerida:

> O navegador envia um cookie para o Express. O `express-session` guarda os dados no servidor e deixa no navegador apenas o identificador da sessão. O dashboard é protegido por `requireAuth`.

Mostrar rapidamente:

- `README.md` com usuários fictícios.
- Rotas principais: `/login`, `/dashboard`, `POST /logout`.

Observação esperada:

- A banca entende que copiar o identificador é suficiente para tentar "colar" outro cliente na mesma sessão.

### Slide 4 - Como acontece o hijacking (3 min) - Integrante 1

Fala sugerida:

> Um cookie bearer, ou cookie de sessão ativo, se comporta como credencial. Quem apresenta o identificador válido consegue se passar pela sessão enquanto o servidor aceitar aquele ID.

Mensagem obrigatória:

- As mitigações reduzem exposição, transporte inseguro e tempo de uso.
- Um cookie ativo ainda é sensível até expirar ou ser invalidado no servidor.

Observação esperada:

- A explicação prepara o ataque sem prometer uma defesa absoluta.

## Bloco 2 - Ataque (8 min)

### Slide 5 - Código vulnerável (2 min) - Integrante 1

Mostrar:

- `src/session/vulnerable-session.js`

Fala sugerida:

> O modo vulnerável usa `sid`, `httpOnly: false`, `secure: false`, `sameSite: false` e um `maxAge` longo. Isso foi intencional para a demonstração.

Observação esperada:

- A banca vê o código vulnerável, não apenas uma explicação teórica.

### Slide 6 - Demo do ataque (4 min) - Integrante 1 opera, Integrante 2 acompanha

Passos:

1. Iniciar modo vulnerável:

```bash
npm run dev
```

2. Cliente A abre:

```text
http://127.0.0.1:3000/login
```

3. Cliente A faz login:

```text
Usuário: alice
Senha: alice123
```

Resultado esperado:

- Cliente A entra em `/dashboard` e vê dados fictícios da Alice.

4. Cliente B tenta acessar antes do cookie:

```text
http://127.0.0.1:3000/dashboard
```

Resultado esperado:

- Cliente B redireciona para `/login`.

5. Cliente A copia o cookie `sid` pelo DevTools.

6. Cliente B recebe o cookie `sid` com valor ocultado/não exibido no slide.

Resultado esperado:

- Cliente B recarrega `/dashboard` e vê dados fictícios da Alice sem digitar senha.

Fallback se editar cookie no navegador estiver lento:

```powershell
curl.exe -i http://127.0.0.1:3000/dashboard -H "Cookie: sid=<copied-sid-value>"
```

Resultado esperado:

- Resposta contém `Painel protegido`, `Alice Demo` ou `LAB-ALICE-001`.

### Slide 7 - Impacto (2 min) - Integrante 1

Fala sugerida:

> O impacto é impersonação: o segundo cliente acessa o dashboard protegido sem senha. O princípio violado é o controle insuficiente do identificador de sessão.

Mostrar como prova automatizada:

- `tests/session-reuse-attack.test.js`

Observação esperada:

- A banca entende que o replay do cookie é a prova de acesso indevido.

## Reset Entre Ataque e Correção

Responsável: Integrante 2 opera, Integrante 1 narra rapidamente.

Passos:

1. Parar o servidor com `Ctrl+C`.
2. Limpar cookies/site data de `127.0.0.1` e `localhost`.
3. Usar Cliente B limpo ou nova janela.
4. Descartar o valor antigo de `sid` se estiver usando `curl.exe`.

Resultado esperado:

- Nenhum cookie antigo interfere no modo corrigido.

## Bloco 3 - Correção e Verificação (8 min)

### Slide 8 - Código corrigido (2 min) - Integrante 2

Mostrar:

- `src/session/fixed-session.js`

Fala sugerida:

> O caminho corrigido usa `__Host-session`, `httpOnly: true`, `secure: true`, `sameSite: "strict"`, `maxAge` de 5 minutos e `path: "/"`.

Ponto importante:

- `Secure` protege de verdade com HTTPS.
- `npm run dev:fixed` usa fallback HTTP local para inspeção em sala.

### Slide 9 - Lifecycle da sessão (2 min) - Integrante 2

Mostrar:

- `src/server.js`, especialmente login/regenerate e `POST /logout`.

Fala sugerida:

> Além dos atributos, o servidor invalida a sessão no logout com `req.session.destroy` e limpa o cookie. Isso importa porque apagar cookie no cliente sem destruir a sessão no servidor não basta.

Resultado esperado:

- A banca entende a diferença entre esconder o cookie e invalidar a sessão.

### Slide 10 - Verificação da mitigação (4 min) - Integrante 2 opera

Passos:

1. Iniciar modo corrigido local:

```bash
npm run dev:fixed
```

2. Tentar acessar `/dashboard` com cookie antigo, inválido ou ausente.

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

Mensagem obrigatória:

> A mitigação não promete que um cookie ativo copiado magicamente deixa de ser bearer. Ela reduz exposição e janela de uso, e a verificação mostra que cookies antigos, inválidos, expirados ou após logout não abrem mais o dashboard.

## Bloco 4 - Conclusão (2 min)

### Slide 11 - OWASP e Secure SDLC (1 min) - Integrante 2

Fala sugerida:

> O problema se relaciona ao OWASP Top 10 2025 A07 Authentication Failures. Também podemos citar o nome usado em 2021: Identification and Authentication Failures. A correção segue a linha do OWASP Session Management Cheat Sheet: proteger o identificador, reduzir exposição, limitar tempo de vida e invalidar no servidor.

### Slide 12 - Fechamento e referências (1 min) - Integrante 2

Fala sugerida:

> Concluindo: no antes, o `sid` vulnerável permite acesso sem senha em outro cliente. No depois, os controles de cookie, expiração e logout fazem a reutilização indevida falhar quando a sessão deixa de ser válida. O projeto mostrou Secure SDLC em miniatura: identificar, explorar localmente, corrigir e verificar.

Referências a mencionar:

- OWASP Top 10 A07 Authentication Failures.
- OWASP Session Management Cheat Sheet.
- MDN Set-Cookie.
- Express `express-session`.
- Código e testes deste laboratório.

## Checklist de Ensaio

- [ ] O tempo total fica em 25 min.
- [ ] O bloco de conceito fica em 7 min.
- [ ] O bloco de ataque fica em 8 min.
- [ ] O bloco de correção/verificação fica em 8 min.
- [ ] A conclusão fica em 2 min.
- [ ] Integrante 1 fala e participa da demo.
- [ ] Integrante 2 fala e participa da demo.
- [ ] O valor real de cookie nunca aparece no slide final.
- [ ] `npm run dev`, `npm run dev:fixed` e `npm test` foram ensaiados.
- [ ] O fallback com `curl.exe` está pronto.
