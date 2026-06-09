# Requirements: Projeto Final Session Hijacking

**Defined:** 2026-06-09
**Core Value:** A demonstracao deve provar, de forma reproduzivel e local, que uma sessao insegura pode ser sequestrada e que as correcoes implementadas impedem a reutilizacao indevida da sessao.

## v1 Requirements

Requirements for the initial project delivery. Each requirement maps to one roadmap phase.

### Application

- [x] **APP-01**: A equipe pode executar uma aplicacao local com login usando usuarios ficticios.
- [x] **APP-02**: Um usuario autenticado pode acessar um dashboard protegido que exibe dados privados ficticios.

### Vulnerability

- [x] **VULN-01**: A equipe pode iniciar a aplicacao em modo vulneravel com cookie de sessao inseguro.
- [x] **VULN-02**: A sessao vulneravel permite reutilizacao do cookie em outro navegador, perfil, Postman, cURL, Burp Suite ou OWASP ZAP.

### Attack Demonstration

- [x] **ATK-01**: A equipe possui um roteiro reproduzivel para capturar ou copiar, de forma controlada, o cookie de sessao no ambiente local.
- [x] **ATK-02**: A equipe pode demonstrar acesso ao dashboard protegido sem senha usando apenas o cookie reutilizado.

### Mitigation

- [x] **FIX-01**: A aplicacao possui modo corrigido com cookie de sessao configurado com `HttpOnly`, `Secure`, `SameSite` e expiracao adequada.
- [x] **FIX-02**: O logout invalida a sessao no servidor e remove o cookie do cliente.
- [x] **FIX-03**: A tentativa de reutilizar o cookie apos a mitigacao falha de forma observavel, como redirecionamento para login ou resposta `401`.

### Documentation

- [x] **DOC-01**: Os slides em PDF cobrem tema e integrantes, descricao da vulnerabilidade, arquitetura, codigo vulneravel, impactos, correcao implementada, codigo corrigido, conclusao e referencias.
- [x] **DOC-02**: O roteiro de apresentacao distribui o conteudo no limite de 25 minutos: 7 minutos de conceito, 8 minutos de ataque, 8 minutos de correcao e 2 minutos de conclusao.

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhancements

- **ENH-01**: Empacotar o laboratorio com Docker para execucao igual em diferentes maquinas.
- **ENH-02**: Adicionar testes automatizados completos para todos os cenarios de cookie e sessao.
- **ENH-03**: Adicionar HTTPS local com certificado autoassinado e documentacao detalhada de instalacao do certificado.
- **ENH-04**: Adicionar comparacao extra com XSS ou CSRF apenas como contexto teorico.

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Ataques contra sites reais ou redes de terceiros | Viola o escopo etico e academico; a demonstracao deve ser local e autorizada. |
| Uso de dados reais ou credenciais reais | O projeto deve usar apenas usuarios e dados ficticios. |
| Deploy publico em producao | O ambiente vulneravel e didatico e deve executar localmente. |
| Sistema completo de cadastro, banco de dados e administracao | Nao e necessario para provar Session Hijacking e consumiria tempo da apresentacao. |
| Vulnerabilidades fora do tema principal | O trabalho deve permanecer focado em Session Hijacking para cumprir o tema escolhido. |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| APP-01 | Phase 1 | Complete |
| APP-02 | Phase 1 | Complete |
| VULN-01 | Phase 1 | Complete |
| VULN-02 | Phase 2 | Complete |
| ATK-01 | Phase 2 | Complete |
| ATK-02 | Phase 2 | Complete |
| FIX-01 | Phase 3 | Complete |
| FIX-02 | Phase 3 | Complete |
| FIX-03 | Phase 4 | Complete |
| DOC-01 | Phase 5 | Complete |
| DOC-02 | Phase 5 | Complete |
| ENH-01 | v2 | Deferred |
| ENH-02 | v2 | Deferred |
| ENH-03 | v2 | Deferred |
| ENH-04 | v2 | Deferred |

**Coverage:**

- v1 requirements: 11 total
- Mapped to phases: 11
- Unmapped: 0

---
*Requirements defined: 2026-06-09*
*Last updated: 2026-06-09 after Phase 4 completion*
