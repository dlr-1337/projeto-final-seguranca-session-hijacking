# Phase 5: Presentation Package - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md - this log preserves the alternatives considered.

**Date:** 2026-06-09
**Phase:** 5-Presentation Package
**Areas discussed:** Narrativa e tempo, Formato dos artefatos, Codigo e evidencias, Divisao da apresentacao, Referencias e framing de seguranca

---

## Narrativa e Tempo

| Option | Description | Selected |
|--------|-------------|----------|
| Narrativa antes/depois com tempo exigido | Seguir 7 min conceito, 8 min ataque, 8 min correcao/verificacao, 2 min conclusao. | Yes |
| Demo primeiro, teoria depois | Abrir com a demo e explicar conceitos depois. | |
| Aula tecnica centrada no codigo | Dedicar mais tempo a percorrer arquivos de codigo. | |

**User's choice:** Auto-selected recommended option via `--auto`.
**Notes:** Keeps the deck aligned with the assignment timing and the validated phase progression.

---

## Formato dos Artefatos

| Option | Description | Selected |
|--------|-------------|----------|
| Fonte local versionada mais PDF | Criar slide source, roteiro, checklist/referencias and exported PDF in the repo. | Yes |
| Ferramenta externa de slides | Produzir em uma plataforma externa e anexar apenas o PDF final. | |
| Apenas outline em Markdown | Criar somente o conteudo textual, sem PDF exportado. | |

**User's choice:** Auto-selected recommended option via `--auto`.
**Notes:** Preserves reproducibility and avoids external accounts or hosted tools.

---

## Codigo e Evidencias

| Option | Description | Selected |
|--------|-------------|----------|
| Codigo lado a lado mais provas focadas | Mostrar vulnerable/fixed snippets, short test proof, and before/after demo evidence. | Yes |
| Walkthrough completo do codigo | Percorrer muitos arquivos durante a apresentacao. | |
| Somente screenshots da demo | Evitar codigo e depender de imagens. | |

**User's choice:** Auto-selected recommended option via `--auto`.
**Notes:** Satisfies the requirement to show vulnerable and corrected code without crowding the 25-minute talk.

---

## Divisao da Apresentacao

| Option | Description | Selected |
|--------|-------------|----------|
| Divisao equilibrada por antes/depois | Um integrante conduz conceito/ataque; outro conduz correcao/verificacao/conclusao. | Yes |
| Um apresenta slides e outro executa demo | Separar fala e operacao da demo. | |
| Roteiro sem responsaveis definidos | Deixar a divisao para ensaio posterior. | |

**User's choice:** Auto-selected recommended option via `--auto`.
**Notes:** Ensures both integrantes participate no desenvolvimento, configuracao, demonstracao e fala.

---

## Referencias e Framing de Seguranca

| Option | Description | Selected |
|--------|-------------|----------|
| Referencias oficiais com caveat de localhost | Usar OWASP Top 10 A07, OWASP Session Management, MDN Set-Cookie and Express docs, with clear Secure/localhost caveat. | Yes |
| Bibliografia minima | Citar poucas fontes sem mapear a falha claramente. | |
| Taxonomia ampla de varios ataques | Abranger XSS, CSRF, sniffing e outras tecnicas. | |

**User's choice:** Auto-selected recommended option via `--auto`.
**Notes:** Keeps the security framing accurate and avoids expanding beyond Session Hijacking.

---

## the agent's Discretion

- Exact presentation source format, filenames, visual layout, screenshot placeholder names, and PDF export mechanism.
- Exact wording of slide bullets and speaker notes, as long as timing and required topics are preserved.

## Deferred Ideas

- HTTPS local completo com certificado autoassinado remains v2.
- Docker packaging remains v2.
- XSS, CSRF, sniffing, public deployment, real accounts, real data, and external targets remain out of scope.
