# Projeto Final: Session Hijacking

## What This Is

Este projeto final da disciplina de Seguranca da Informacao constroi um ambiente local vulneravel a Session Hijacking e depois aplica as correcoes adequadas. O foco e permitir uma demonstracao pratica e didatica em que a equipe mostra como cookies de sessao inseguros permitem reutilizacao de sessao, e como a mitigacao bloqueia o ataque.

O projeto sera usado por uma equipe de 2 integrantes para desenvolver, configurar, demonstrar e apresentar oralmente a vulnerabilidade, relacionando a falha ao OWASP Top 10, aos principios de seguranca violados e ao Secure SDLC.

## Core Value

A demonstracao deve provar, de forma reproduzivel e local, que uma sessao insegura pode ser sequestrada e que as correcoes implementadas impedem a reutilizacao indevida da sessao.

## Requirements

### Validated

- [x] Phase 1 validated a local Express application with fake login, session-backed authentication, and a protected dashboard.
- [x] Phase 1 validated the vulnerable mode foundation: `sid` is intentionally configured with insecure cookie attributes for the local classroom demo.

### Active

- [ ] Demonstrar Session Hijacking por captura ou copia controlada do cookie de sessao e reutilizacao em outro navegador, ferramenta ou perfil.
- [ ] Implementar mitigacoes obrigatorias: cookies seguros, flags HttpOnly e SameSite, expiracao adequada e invalidacao de sessao no logout.
- [ ] Demonstrar que o ataque falha depois da correcao.
- [ ] Preparar slides em PDF com tema, integrantes, descricao da vulnerabilidade, arquitetura, codigo vulneravel, impactos, correcao, codigo corrigido, conclusao e referencias.
- [ ] Preparar roteiro de demonstracao com as etapas: mostrar vulnerabilidade, explorar falha, corrigir problema e demonstrar mitigacao funcionando.

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
| Construir uma aplicacao local propria | Atende ao requisito de desenvolver ou configurar o proprio ambiente vulneravel | Pending |
| Separar modo vulneravel e modo corrigido | Facilita demonstrar o ataque antes e depois da mitigacao | Pending |
| Usar dados ficticios de usuarios | Mantem a demonstracao etica e segura | Pending |
| Focar em reutilizacao de cookie de sessao | E o nucleo pratico do tema Session Hijacking | Pending |
| Usar Express, EJS e express-session no MVP | Mantem o laboratorio pequeno, testavel e facil de explicar em 25 minutos | Validated in Phase 1 |

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
*Last updated: 2026-06-09 after Phase 1 completion*
