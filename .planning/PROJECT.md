# Projeto Final: Session Hijacking

## What This Is

Este projeto final da disciplina de Seguranca da Informacao constroi um ambiente local vulneravel a Session Hijacking e depois aplica as correcoes adequadas. O foco e permitir uma demonstracao pratica e didatica em que a equipe mostra como cookies de sessao inseguros permitem reutilizacao de sessao, e como a mitigacao bloqueia o ataque.

O projeto sera usado por uma equipe de 2 integrantes para desenvolver, configurar, demonstrar e apresentar oralmente a vulnerabilidade, relacionando a falha ao OWASP Top 10, aos principios de seguranca violados e ao Secure SDLC.

## Core Value

A demonstracao deve provar, de forma reproduzivel e local, que uma sessao insegura pode ser sequestrada e que as correcoes implementadas impedem a reutilizacao indevida da sessao.

## Current State

**v1.0 MVP shipped on 2026-06-09.** The repository now contains a complete local Session Hijacking lab, vulnerable and fixed session modes, automated tests, before/after mitigation documentation, and the final presentation package.

Primary deliverables:

- Local Express app with fake users and protected dashboard.
- Vulnerable `sid` session configuration and reproducible replay proof.
- Fixed session configuration with `HttpOnly`, `Secure`, `SameSite`, short expiration, and server-side logout invalidation.
- Verification docs and tests proving invalid, obsolete, expired, or logged-out cookies redirect to `/login`.
- Presentation package in `docs/presentation/`, including editable HTML source, exported PDF, speaker script, evidence checklist, and references.

## Next Milestone Goals

- None defined. v2 ideas are deferred and should be reconsidered only if the project continues beyond the academic submission.

## Requirements

### Validated

- [x] Phase 1 validated a local Express application with fake login, session-backed authentication, and a protected dashboard.
- [x] Phase 1 validated the vulnerable mode foundation: `sid` is intentionally configured with insecure cookie attributes for the local classroom demo.
- [x] Phase 2 validated controlled Session Hijacking by copying the local `sid` cookie and replaying it from a second client.
- [x] Phase 2 validated that the team has a reproducible browser/DevTools walkthrough with a cURL fallback.
- [x] Phase 2 validated protected dashboard access without a password using only the reused session cookie.
- [x] Phase 3 validated the corrected session mode with `HttpOnly`, `Secure`, `SameSite`, short expiration, and documented local HTTP fallback.
- [x] Phase 3 validated logout invalidation: `POST /logout` destroys server-side session state and clears the active cookie.
- [x] Phase 4 validated that the before/after mitigation proof works: vulnerable `sid` replay succeeds, while invalid, obsolete, or logged-out cookies in fixed mode redirect to `/login`.
- [x] Phase 5 validated the final PDF slide deck with tema, integrantes, vulnerabilidade, arquitetura, codigo vulneravel, impactos, correcao, codigo corrigido, conclusao e referencias.
- [x] Phase 5 validated the 25-minute roteiro with 7/8/8/2 timing, two-presenter split, reset steps, cURL fallback and `npm test` proof.

### Active

- None. v1 delivery is complete; remaining ideas are tracked under v2 requirements.

### Out of Scope

- Ataques em sistemas reais, redes de terceiros ou ambientes nao autorizados - o trabalho deve ocorrer apenas em ambiente local e controlado.
- Roubo real de credenciais ou dados sensiveis - a demonstracao deve usar usuarios e dados ficticios.
- Implantacao publica em producao - o requisito da disciplina pede execucao local e segura.
- HTTPS com certificado publico real - pode ser simulado localmente ou explicado, desde que as flags e mitigacoes de cookies sejam demonstradas.
- Tecnicas ofensivas fora de Session Hijacking - o tema escolhido deve permanecer focado para evitar perda de tempo na apresentacao.

## Context

O enunciado pede a construcao e correcao de ambientes vulneraveis. A equipe deve desenvolver ou configurar seu proprio ambiente, demonstrar a exploracao da falha, corrigir a vulnerabilidade e demonstrar que o ataque falha apos a mitigacao.

Tema escolhido: 05 - Session Hijacking.

Construcoes esperadas para o ambiente vulneravel:

- Cookies inseguros.
- Sessoes sem expiracao adequada.
- Area autenticada que permita comprovar acesso indevido quando a sessao e reutilizada.

Demonstracao esperada:

- Reutilizacao de sessao.
- Comparacao entre acesso legitimo e acesso obtido apenas com o cookie.
- Uso de ferramentas locais como navegador, DevTools, Burp Suite Community, OWASP ZAP, Postman ou cURL.

Correcao obrigatoria:

- HTTPS ou explicacao/simulacao local da exigencia de transporte seguro.
- Cookies seguros, com Secure, HttpOnly e SameSite apropriados.
- Expiracao adequada de sessao.
- Invalidacao de sessao no logout.

Entregaveis obrigatorios:

- Slides em PDF.
- Demonstracao pratica com ataque e mitigacao.
- Apresentacao total de ate 25 minutos: 7 minutos de conceito, 8 minutos de ataque, 8 minutos de correcao e 2 minutos de conclusao.

## Constraints

- **Tema**: Session Hijacking - o projeto deve focar em cookies de sessao e reutilizacao de sessao.
- **Ambiente**: Local e controlado - requisito etico e academico da atividade.
- **Tempo de apresentacao**: Maximo de 25 minutos - o roteiro precisa ser direto e ensaiavel.
- **Entrega didatica**: Deve mostrar codigo vulneravel e codigo corrigido - nao basta apenas explicar conceitualmente.
- **Seguranca**: Nao usar dados reais nem alvos externos - a demonstracao deve ser autorizada e reproduzivel.
- **Equipe**: 2 integrantes - ambos devem participar do desenvolvimento, configuracao, demonstracao e apresentacao oral.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Construir uma aplicacao local propria | Atende ao requisito de desenvolver ou configurar o proprio ambiente vulneravel | Validated through Phases 1 and 2 |
| Separar modo vulneravel e modo corrigido | Facilita demonstrar o ataque antes e depois da mitigacao | Validated through Phase 3 |
| Usar dados ficticios de usuarios | Mantem a demonstracao etica e segura | Validated through Phases 1 and 2 |
| Focar em reutilizacao de cookie de sessao | E o nucleo pratico do tema Session Hijacking | Validated in Phase 2 |
| Usar Express, EJS e express-session no MVP | Mantem o laboratorio pequeno, testavel e facil de explicar em 25 minutos | Validated in Phase 1 |
| Usar DevTools como caminho principal e cURL como backup | Mantem a demonstracao visual para a apresentacao e reproduzivel por comando | Validated in Phase 2 |
| Enquadrar cookies ativos como bearer tokens | Evita prometer que flags de cookie impedem replay manual de uma sessao ainda valida | Validated in Phase 4 |
| Manter `docs/presentation/slides.html` como fonte editavel e exportar PDF local | Permite revisar o deck sem ferramenta hospedada e ainda entregar o PDF exigido | Validated in Phase 5 |
| Encerrar v1.0 como milestone completo apos merge da PR #5 | Preserva o historico em `.planning/milestones/` e deixa o projeto pronto para entrega ou novo milestone | Completed in v1.0 |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `$gsd-transition`):
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone** (via `$gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check - still the right priority?
3. Audit Out of Scope - reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-09 after v1.0 milestone completion*
