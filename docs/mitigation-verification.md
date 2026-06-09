# Mitigation Verification

Roteiro local para provar o requisito `FIX-03`: a reutilizacao do cookie que funciona no modo vulneravel deve falhar de forma observavel depois das mitigacoes implementadas.

Use este material apenas no laboratorio local autorizado do projeto. Nao use contas reais, dados reais, sites externos, redes de terceiros, tunel publico, sniffing de rede, XSS, CSRF ou qualquer alvo fora de `127.0.0.1`/localhost.

## Objetivo da Fase

Mostrar a sequencia antes/depois:

1. Antes: no modo vulneravel, o cookie `sid` copiado permite acessar `/dashboard` em um segundo cliente.
2. Depois: no modo corrigido, um cookie vulneravel antigo ou um cookie corrigido apos logout nao abre `/dashboard`; o app responde com `302 Location: /login`.

Essa prova confirma a mitigacao implementada sem afirmar que um cookie bearer ativo copiado manualmente se torna inutil imediatamente. Enquanto uma sessao ativa existir no servidor, o identificador de sessao continua sendo uma credencial bearer; as mitigacoes reduzem exposicao, transporte inseguro e janela de uso, e invalidam a sessao apos logout ou expiracao.

## Pre-requisitos

- Node.js instalado.
- Dependencias instaladas com `npm install`.
- Navegador com DevTools.
- Um segundo cliente local: outro perfil do navegador, janela anonima/privada, outro navegador, ou terminal com `curl.exe`.
- Usuarios ficticios:

| Usuario | Senha |
|---------|-------|
| `alice` | `alice123` |
| `bruno` | `bruno123` |

## Parte 1: Antes - Ataque Funcionando

### 1. Iniciar modo vulneravel

```bash
npm run dev
```

Abra:

```text
http://127.0.0.1:3000/login
```

### 2. Login da vitima ficticia

No Cliente A, entre com:

```text
Usuario: alice
Senha: alice123
```

Resultado esperado: o Cliente A acessa `/dashboard` e ve dados ficticios da Alice.

### 3. Confirmar negacao antes do cookie

No Cliente B, abra:

```text
http://127.0.0.1:3000/dashboard
```

Resultado esperado: o Cliente B e redirecionado para `/login`.

### 4. Reutilizar `sid`

No Cliente A, copie o valor do cookie `sid` pelo DevTools. No Cliente B, adicione:

```text
Nome: sid
Valor: <valor-copiado-do-cliente-A>
Path: /
```

Recarregue:

```text
http://127.0.0.1:3000/dashboard
```

Resultado esperado: o Cliente B acessa `/dashboard` sem senha e ve os dados ficticios da Alice. Esse e o antes vulneravel.

Alternativa com PowerShell:

```powershell
curl.exe -i http://127.0.0.1:3000/dashboard -H "Cookie: sid=<copied-sid-value>"
```

Resultado esperado: a resposta contem `Painel protegido` e dados ficticios da Alice.

## Reset Entre Antes e Depois

1. Pare o servidor com `Ctrl+C`.
2. Feche o Cliente B ou limpe o perfil usado para o replay.
3. Remova cookies/site data de `127.0.0.1` e `localhost` nos clientes usados.
4. Se estiver ensaiando com `curl.exe`, descarte o valor antigo de `sid`.
5. Reinicie no modo corrigido para a parte seguinte.

## Parte 2: Depois - Mitigacao Bloqueando Reuso Invalido

### 1. Iniciar modo corrigido em HTTP local

```bash
npm run dev:fixed
```

Esse script usa `SESSION_MODE=fixed` e `SESSION_COOKIE_SECURE=false` para permitir login em `http://127.0.0.1:3000` durante a inspecao didatica. Isso nao e a postura segura completa; o atributo `Secure` exige HTTPS para protecao real.

### 2. Tentar usar cookie vulneravel antigo

No Cliente B, tente acessar:

```text
http://127.0.0.1:3000/dashboard
```

Se voce ainda tiver um cookie `sid` antigo da parte vulneravel, tente reutiliza-lo no modo corrigido.

Resultado esperado: o app nao associa o segundo cliente a uma sessao valida e retorna `302 Location: /login` ou mostra o redirecionamento para `/login` no navegador.

### 3. Login corrigido e logout

No Cliente A, entre novamente com:

```text
Usuario: alice
Senha: alice123
```

No dashboard, use o formulario `POST /logout`.

Resultado esperado: o servidor destroi a sessao e redireciona para `/login`.

### 4. Reutilizar cookie corrigido apos logout

Tente reutilizar o cookie corrigido que existia antes do logout.

Resultado esperado: `GET /dashboard` com esse cookie retorna `302 Location: /login`. Isso prova que a sessao foi invalidada no servidor; nao basta apenas esconder ou limpar o cookie no cliente.

## Prova Automatizada

Rode:

```bash
npm test
```

O teste `mitigation verification` cobre:

1. Antes: replay do `sid` vulneravel acessa `/dashboard`.
2. Depois: `sid` vulneravel antigo e rejeitado por um app em modo corrigido.
3. Depois: cookie corrigido copiado deixa de funcionar apos `POST /logout`.

O caminho seguro do cookie corrigido e testado com `secureCookie: true`, `trustProxy: true` e `X-Forwarded-Proto: https`, simulando transporte HTTPS para validar o atributo `Secure`.

## Checklist de Evidencias

Capture apenas evidencias locais e ficticias:

1. Cliente A logado como `alice` no modo vulneravel.
2. Cliente B negado em `/dashboard` antes do cookie.
3. Cliente B acessando `/dashboard` sem senha com `sid` vulneravel.
4. Modo corrigido iniciado com `npm run dev:fixed`.
5. Cookie antigo ou invalido resultando em `/login`.
6. Logout corrigido destruindo sessao no servidor.
7. Cookie corrigido copiado antes do logout falhando depois do logout.
8. Saida de `npm test` com todos os testes passando.

Screenshots e anotacoes devem conter apenas dados fake do dashboard local, como `Alice Demo`, `LAB-ALICE-001` e `Relatorio interno ficticio`.

## Limitacao de HTTPS em Localhost

`Secure` so protege de verdade quando ha HTTPS. No laboratorio simples em `http://127.0.0.1:3000`, o script `npm run dev:fixed` desativa `SESSION_COOKIE_SECURE` apenas para permitir a demonstracao manual em navegador comum.

Na apresentacao, explique assim:

- O codigo corrigido tem caminho seguro com `secure: true` e cookie `__Host-session`.
- O teste automatizado valida esse caminho seguro simulando HTTPS com `X-Forwarded-Proto: https`.
- O HTTP local e um fallback de laboratorio, nao a configuracao segura completa.
- Certificado autoassinado e HTTPS local detalhado ficaram como melhoria futura.

## Explicacao Curta Para a Banca

No modo vulneravel, possuir o cookie `sid` bastava para o segundo cliente assumir a sessao da Alice.

No modo corrigido, a equipe reduziu a exposicao do identificador (`HttpOnly`), exigiu transporte seguro no caminho correto (`Secure`), restringiu envio cross-site (`SameSite=Strict`), reduziu a janela de uso (`maxAge` curto) e invalidou a sessao no servidor no logout.

A verificacao mostra que um cookie invalido, antigo, expirado ou associado a uma sessao destruida nao abre mais `/dashboard`: o servidor redireciona para `/login`.

## Aviso Etico

Este roteiro existe apenas para o ambiente local e controlado do projeto academico. Nao aplique estes passos contra sistemas reais, contas reais, redes de terceiros, ambientes de producao ou qualquer alvo sem autorizacao explicita.
