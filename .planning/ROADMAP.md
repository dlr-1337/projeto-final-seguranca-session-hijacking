# Roadmap: Projeto Final Session Hijacking

## Overview

O projeto sera construido como um MVP vertical para que cada fase aumente a demonstracao pratica: primeiro uma aplicacao vulneravel funcionando, depois o ataque reproduzivel, em seguida a correcao, a prova de mitigacao e, por fim, os materiais de apresentacao. O resultado final deve permitir que a equipe mostre o antes e depois de Session Hijacking em ambiente local, com codigo e roteiro didatico.

## Phases

**Phase Numbering:**

- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Vulnerable Lab Foundation** - Aplicacao local com login, dashboard protegido e modo vulneravel.
- [ ] **Phase 2: Session Reuse Attack** - Roteiro e prova pratica de reutilizacao do cookie de sessao.
- [ ] **Phase 3: Session Security Fixes** - Cookies e ciclo de vida de sessao corrigidos.
- [ ] **Phase 4: Mitigation Verification** - Mesma tentativa de ataque falhando apos a correcao.
- [ ] **Phase 5: Presentation Package** - Slides, referencias e roteiro de 25 minutos prontos.

## Phase Details

### Phase 1: Vulnerable Lab Foundation

**Goal:** Entregar uma aplicacao local funcional que autentica usuarios ficticios e expoe, de forma controlada, a configuracao vulneravel de sessao.
**Mode:** mvp
**Depends on:** Nothing (first phase)
**Requirements:** APP-01, APP-02, VULN-01
**Success Criteria** (what must be TRUE):

  1. A equipe pode iniciar a aplicacao local por comando documentado.
  2. Um usuario ficticio pode fazer login e acessar um dashboard protegido.
  3. O modo vulneravel usa cookie de sessao com configuracao insegura visivel no codigo.
  4. O dashboard mostra dados privados ficticios suficientes para provar acesso autenticado.

**Plans:** 2 plans
Plans:
**Wave 1**

- [ ] 01-01: Criar app Express, paginas basicas, usuarios ficticios e scripts de execucao.

**Wave 2** *(blocked on Wave 1 completion)*

- [ ] 01-02: Implementar sessao vulneravel, dashboard protegido e evidencias do codigo vulneravel.

### Phase 2: Session Reuse Attack

**Goal:** Demonstrar Session Hijacking reutilizando o cookie de sessao do usuario logado em outro cliente local.
**Mode:** mvp
**Depends on:** Phase 1
**Requirements:** VULN-02, ATK-01, ATK-02
**Success Criteria** (what must be TRUE):

  1. A equipe consegue copiar o cookie de sessao em ambiente local controlado.
  2. Um segundo cliente acessa o dashboard protegido sem informar senha.
  3. O roteiro explica claramente qual principio de seguranca foi violado.
  4. A demonstracao pode ser repetida sem depender de dados reais ou alvos externos.

**Plans:** 2 plans

Plans:

- [ ] 02-01: Criar roteiro de ataque com navegador, DevTools e alternativa via Postman ou cURL.
- [ ] 02-02: Registrar evidencias da exploracao para slides e ensaio da demonstracao.

### Phase 3: Session Security Fixes

**Goal:** Implementar o modo corrigido com cookies seguros, expiracao adequada e invalidacao real da sessao no logout.
**Mode:** mvp
**Depends on:** Phase 2
**Requirements:** FIX-01, FIX-02
**Success Criteria** (what must be TRUE):

  1. O codigo corrigido configura `HttpOnly`, `Secure`, `SameSite` e `maxAge` de forma explicavel.
  2. O logout destroi a sessao no servidor e remove o cookie no cliente.
  3. O codigo deixa clara a diferenca entre modo vulneravel e modo corrigido.
  4. A equipe consegue explicar a relacao entre mitigacao, OWASP e Secure SDLC.

**Plans:** 2 plans

Plans:

- [ ] 03-01: Adicionar modo corrigido, configuracao de cookies e expiracao de sessao.
- [ ] 03-02: Corrigir logout, limpar sessao no servidor e documentar antes/depois do codigo.

### Phase 4: Mitigation Verification

**Goal:** Provar que o mesmo ataque que funcionava no modo vulneravel falha depois das mitigacoes.
**Mode:** mvp
**Depends on:** Phase 3
**Requirements:** FIX-03
**Success Criteria** (what must be TRUE):

  1. A tentativa de reutilizar cookie no modo corrigido resulta em login, `401` ou outra negacao observavel.
  2. A equipe tem uma sequencia antes/depois que mostra ataque funcionando e falhando.
  3. O ambiente pode ser resetado rapidamente para ensaio e apresentacao.
  4. As limitacoes de HTTPS em localhost ficam documentadas para evitar confusao na banca.

**Plans:** 2 plans

Plans:

- [ ] 04-01: Criar checklist de verificacao da mitigacao e comandos de reset do laboratorio.
- [ ] 04-02: Ensaiar fluxo completo e ajustar mensagens/erros para ficarem didaticos.

### Phase 5: Presentation Package

**Goal:** Preparar os slides em PDF e o roteiro final da apresentacao dentro do tempo maximo de 25 minutos.
**Mode:** mvp
**Depends on:** Phase 4
**Requirements:** DOC-01, DOC-02
**Success Criteria** (what must be TRUE):

  1. Os slides cobrem todos os itens obrigatorios do enunciado.
  2. O roteiro distribui conceito, ataque, correcao e conclusao no tempo exigido.
  3. Codigo vulneravel e codigo corrigido aparecem em trechos comparaveis.
  4. As referencias incluem OWASP, MDN e documentacao da tecnologia usada.

**Plans:** 2 plans

Plans:

- [ ] 05-01: Criar outline, conteudo dos slides e referencias.
- [ ] 05-02: Exportar PDF, revisar narrativa e preparar falas dos dois integrantes.

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Vulnerable Lab Foundation | 0/2 | Not started | - |
| 2. Session Reuse Attack | 0/2 | Not started | - |
| 3. Session Security Fixes | 0/2 | Not started | - |
| 4. Mitigation Verification | 0/2 | Not started | - |
| 5. Presentation Package | 0/2 | Not started | - |
