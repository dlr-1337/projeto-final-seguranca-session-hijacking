# Checklist de Evidencias - Presentation Package

Use este checklist para coletar ou representar evidencias nos slides. Tudo deve ser local, autorizado e ficticio.

## Regras de Redacao

- Use `redact`/redigir em qualquer valor real de cookie antes de colocar em slide ou PDF.
- Nao mostrar cookies completos, contas reais, dominios externos, tokens reais ou historico de navegador.
- Usar apenas `127.0.0.1`/localhost e usuarios ficticios (`alice`, `bruno`).
- Preferir evidencias com dados fake visiveis: `Alice Demo`, `LAB-ALICE-001`, `Relatorio interno ficticio`.

## Evidencias Obrigatorias

| Ordem | Evidencia | Como obter | Uso no slide |
|-------|-----------|------------|--------------|
| 1 | Cliente A logado como Alice | `npm run dev`, login `alice` / `alice123`, abrir `/dashboard` | Provar sessao legitima local. |
| 2 | Cliente B negado antes do cookie | Cliente B abre `http://127.0.0.1:3000/dashboard` sem cookie | Mostrar redirecionamento para `/login`. |
| 3 | Cookie `sid` vulneravel copiado | DevTools no Cliente A, valor redigido | Mostrar que o identificador existe, nunca o valor real. |
| 4 | Cliente B acessa `/dashboard` com `sid` | Inserir cookie redigido ou usar `curl.exe` | Provar Session Hijacking local. |
| 5 | Modo corrigido iniciado | `npm run dev:fixed` | Mostrar troca para mitigacao. |
| 6 | Cookie antigo/invalido negado | Cliente B tenta `/dashboard` no modo corrigido | Mostrar `/login` ou `302 Location: /login`. |
| 7 | Logout invalida sessao | Login corrigido, copiar cookie, `POST /logout`, tentar reuso | Provar que servidor destruiu a sessao. |
| 8 | Prova automatizada | `npm test` | Mostrar que replay vulneravel e mitigacao foram testados. |

## Fallback de Demo

Se a edicao manual de cookie no navegador atrasar, usar:

```powershell
curl.exe -i http://127.0.0.1:3000/dashboard -H "Cookie: sid=<copied-sid-value>"
```

O placeholder `<copied-sid-value>` deve continuar redigido nos slides. A fala pode explicar que o valor real foi usado apenas no ambiente local durante o ensaio.

## Evidencias que Nao Entram

- Capturas de sites reais ou redes de terceiros.
- Senhas reais ou dados pessoais.
- XSS, CSRF, sniffing, malware, tunel publico ou qualquer alvo fora de localhost.
- Valor completo de `sid`, `__Host-session` ou qualquer token.

## Checagem Antes do PDF

- [ ] Todas as capturas usam `127.0.0.1` ou localhost.
- [ ] Toda informacao sensivel foi redigida.
- [ ] O slide de ataque mostra sucesso sem senha no Cliente B.
- [ ] O slide de mitigacao mostra `/login` ou `302 Location: /login`.
- [ ] A saida de `npm test` aparece como evidencia de reproducibilidade.
