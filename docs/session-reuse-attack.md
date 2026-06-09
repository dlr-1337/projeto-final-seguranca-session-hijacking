# Session Reuse Attack

Roteiro local para demonstrar Session Hijacking reutilizando o cookie de sessao vulneravel `sid`.

Use este material apenas no laboratorio local autorizado do projeto. Nao use contas reais, dados reais, sites externos, redes de terceiros, tunel publico, sniffing de rede, XSS, CSRF ou qualquer alvo fora de `127.0.0.1`/localhost.

## Objetivo da Fase

Provar que, no modo vulneravel, a posse do cookie `sid` permite reutilizar a sessao de um usuario ficticio em outro cliente local. O segundo cliente deve acessar `/dashboard` sem informar senha.

## Pre-requisitos

- Node.js instalado.
- Dependencias instaladas com `npm install`.
- Aplicacao iniciada com `npm run dev`.
- Navegador com DevTools.
- Um segundo cliente local: outro perfil do navegador, janela anonima/privada, outro navegador, ou terminal com `curl.exe`.

Usuarios ficticios:

| Usuario | Senha |
|---------|-------|
| `alice` | `alice123` |
| `bruno` | `bruno123` |

## Roteiro Principal: Navegador + DevTools

### 1. Iniciar o laboratorio

```bash
npm run dev
```

Abra:

```text
http://127.0.0.1:3000/login
```

### 2. Fazer login como vitima ficticia

No Cliente A, entre com:

```text
Usuario: alice
Senha: alice123
```

Resultado esperado: o navegador redireciona para `/dashboard` e mostra o painel protegido com dados ficticios da Alice.

### 3. Copiar o cookie `sid`

No Cliente A:

1. Abra DevTools.
2. Va em Application/Storage.
3. Abra Cookies para `http://127.0.0.1:3000`.
4. Copie o valor do cookie `sid`.

Copie apenas o cookie de sessao do laboratorio. Nao copie armazenamento completo do navegador.

### 4. Confirmar que o segundo cliente nao esta autenticado

No Cliente B, antes de inserir qualquer cookie, abra:

```text
http://127.0.0.1:3000/dashboard
```

Resultado esperado: o Cliente B e redirecionado para `/login`. Isso prova que ele nao tinha acesso antes da reutilizacao.

### 5. Reutilizar o cookie no segundo cliente

No Cliente B, adicione um cookie para `http://127.0.0.1:3000` com:

```text
Nome: sid
Valor: <valor-copiado-do-cliente-A>
Path: /
```

Recarregue:

```text
http://127.0.0.1:3000/dashboard
```

Resultado esperado: o Cliente B acessa o painel protegido sem senha e ve os mesmos dados ficticios da Alice.

## Alternativa Reproduzivel: cURL

Se a edicao de cookies pelo navegador estiver lenta durante a apresentacao, use `curl.exe` como prova reproduzivel.

Depois de copiar o valor de `sid`, rode no PowerShell:

```powershell
curl.exe -i http://127.0.0.1:3000/dashboard -H "Cookie: sid=<copied-sid-value>"
```

Substitua `<copied-sid-value>` pelo valor exato do cookie `sid`. Preserve a codificacao copiada do DevTools ou do `Set-Cookie`.

Resultado esperado: a resposta contem `Painel protegido` e dados ficticios da Alice, mesmo sem enviar usuario e senha nessa requisicao.

## Principio Violado

O cookie `sid` funciona como o identificador da sessao. O `express-session` guarda os dados da sessao no servidor, mas o navegador envia o identificador no cookie. Quando outro cliente apresenta o mesmo `sid`, o servidor associa esse cliente a mesma sessao.

No modo vulneravel, o cookie foi configurado de forma insegura para fins didaticos:

- `httpOnly: false`
- `secure: false`
- `sameSite: false`
- `maxAge` longo para a demo

Assim, a posse do cookie reutilizavel e suficiente para impersonar o usuario ficticio enquanto a sessao existir. As mitigacoes reais ficam para as proximas fases: `HttpOnly`, `Secure`, `SameSite`, expiracao adequada e invalidacao de sessao no logout.

## Checklist de Evidencias

Capture apenas evidencias locais e ficticias:

1. Cliente A logado localmente como `alice` em `/dashboard`.
2. Cookie `sid` copiado pelo DevTools do Cliente A.
3. Cliente B sendo redirecionado para `/login` antes de receber o cookie.
4. Cliente B acessando `/dashboard` sem senha depois de reutilizar `sid`.

Como evidencia automatizada, rode:

```bash
npm test
```

O teste `session reuse attack` prova que uma requisicao separada reutiliza o cookie `sid` copiado e recebe os dados fake da Alice.

Screenshots e anotacoes devem conter apenas dados fake do dashboard local, como `Alice Demo`, `LAB-ALICE-001` e `Relatorio interno ficticio`. Nao capture cookies, dominios, contas ou informacoes de sistemas reais.

Essas evidencias serao usadas depois nos slides. A fase atual nao cria o PDF final.

## Reset e Limpeza

Para repetir o ensaio:

1. Feche ou limpe o Cliente B.
2. Remova cookies de `127.0.0.1`/localhost nos clientes usados.
3. Pare o servidor com `Ctrl+C`.
4. Reinicie com `npm run dev`.
5. Repita o fluxo desde o login da vitima ficticia.

## Aviso Etico

Este roteiro existe apenas para o ambiente local e controlado do projeto academico. Nao aplique estes passos contra sistemas reais, contas reais, redes de terceiros, ambientes de producao ou qualquer alvo sem autorizacao explicita.
