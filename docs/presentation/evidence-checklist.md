# Checklist de Evidências - Pacote de Apresentação

Use este checklist para coletar ou representar evidências nos slides. Tudo deve ser local, autorizado e fictício.

## Regras de Ocultação

- Redija ou oculte qualquer valor real de cookie antes de colocar em slide ou PDF.
- Não mostrar cookies completos, contas reais, domínios externos, tokens reais ou histórico de navegador.
- Usar apenas `127.0.0.1`/localhost e usuários fictícios (`alice`, `bruno`).
- Preferir evidências com dados fictícios visíveis: `Alice Demo`, `LAB-ALICE-001`, `Relatório interno fictício`.

## Evidências Obrigatórias

| Ordem | Evidência | Como obter | Uso no slide |
|-------|-----------|------------|--------------|
| 1 | Cliente A logado como Alice | `npm run dev`, login `alice` / `alice123`, abrir `/dashboard` | Provar sessão legítima local. |
| 2 | Cliente B negado antes do cookie | Cliente B abre `http://127.0.0.1:3000/dashboard` sem cookie | Mostrar redirecionamento para `/login`. |
| 3 | Cookie `sid` vulnerável copiado | DevTools no Cliente A, valor ocultado | Mostrar que o identificador existe, nunca o valor real. |
| 4 | Cliente B acessa `/dashboard` com `sid` | Inserir cookie ocultado ou usar `curl.exe` | Provar Session Hijacking local. |
| 5 | Modo corrigido iniciado | `npm run dev:fixed` | Mostrar troca para mitigação. |
| 6 | Cookie antigo/inválido negado | Cliente B tenta `/dashboard` no modo corrigido | Mostrar `/login` ou `302 Location: /login`. |
| 7 | Logout invalida sessão | Login corrigido, copiar cookie, `POST /logout`, tentar reuso | Provar que servidor destruiu a sessão. |
| 8 | Prova automatizada | `npm test` | Mostrar que replay vulnerável e mitigação foram testados. |

## Fallback de Demo

Se a edição manual de cookie no navegador atrasar, usar:

```powershell
curl.exe -i http://127.0.0.1:3000/dashboard -H "Cookie: sid=<copied-sid-value>"
```

O placeholder `<copied-sid-value>` deve continuar ocultado nos slides. A fala pode explicar que o valor real foi usado apenas no ambiente local durante o ensaio.

## Evidências que Não Entram

- Capturas de sites reais ou redes de terceiros.
- Senhas reais ou dados pessoais.
- XSS, CSRF, sniffing, malware, túnel público ou qualquer alvo fora de localhost.
- Valor completo de `sid`, `__Host-session` ou qualquer token.

## Checagem Antes do PDF

- [ ] Todas as capturas usam `127.0.0.1` ou localhost.
- [ ] Toda informação sensível foi ocultada.
- [ ] O slide de ataque mostra sucesso sem senha no Cliente B.
- [ ] O slide de mitigação mostra `/login` ou `302 Location: /login`.
- [ ] A saída de `npm test` aparece como evidência de reprodutibilidade.
