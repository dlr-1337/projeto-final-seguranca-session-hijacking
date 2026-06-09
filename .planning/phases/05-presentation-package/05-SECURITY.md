---
phase: 05
slug: presentation-package
status: verified
threats_open: 0
asvs_level: 1
created: 2026-06-09
updated: 2026-06-09
---

# Phase 05 - Security

Per-phase security contract for the Presentation Package phase. This file verifies the plan-time threat model in:

- `.planning/phases/05-presentation-package/05-01-PLAN.md`
- `.planning/phases/05-presentation-package/05-02-PLAN.md`

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| Local project artifacts to classroom presentation | The team presents PDF/HTML/script materials generated from the repo. | Security claims, code snippets, demo commands, and references. |
| Demo evidence to final slides | Local screenshots or command output may be represented in the deck. | Cookie names, fake users, fake dashboard data, and expected observations. |
| Presenter rehearsal to audience understanding | The speaker script guides the 25-minute delivery. | Timing, presenter ownership, attack/mitigation sequence, caveats, and ethical scope. |

## Threat Register

| Threat ID | Category | Component | Disposition | Mitigation | Status |
|-----------|----------|-----------|-------------|------------|--------|
| T-05-01 | Tampering | Slide content completeness | mitigate | Slides and PDF text contain the required assignment sections: tema/integrantes, vulnerabilidade, arquitetura, codigo vulneravel, impactos, correcao, codigo corrigido, conclusao, and referencias. | closed |
| T-05-02 | Information Disclosure | Presentation evidence | mitigate | Evidence checklist requires `redact`/redigir, local-only fake data, and no complete cookie/token values; scans found no raw-looking session cookie values in presentation text or PDF text. | closed |
| T-05-03 | Repudiation | Security claim accuracy | mitigate | Slides/script/references retain the bearer-cookie caveat, Secure/localhost note, OWASP mapping, and Phase 4 denial scope. | closed |
| T-05-04 | Denial of Service | Presentation timing | mitigate | Deck has 12 slides and speaker script preserves the 7/8/8/2 structure for a 25-minute presentation. | closed |
| T-05-05 | Dependency Risk | Slide tooling | mitigate | Final artifacts live under `docs/presentation/`; PDF was exported locally from `slides.html` without hosted accounts or online slide services. | closed |
| T-05-06 | Integrity | PDF export | mitigate | PDF exists, is 12 pages, is `148724` bytes, and text extraction found all required core sections. | closed |
| T-05-07 | Operational | Two-presenter roteiro | accept + mitigate | Script assigns Integrante 1 and Integrante 2, includes reset steps and fallback commands; exact oral pacing still depends on team rehearsal. | closed |
| T-05-08 | Discoverability | README entry points | mitigate | Root README and `docs/presentation/README.md` link the package, PDF, editable source, script, checklist, references, and rehearsal commands. | closed |
| T-05-09 | Repudiation | Final polish/security framing | mitigate | Final content checks confirmed `cookie bearer`, `Secure`, `localhost`, `HTTPS`, `OWASP Top 10 2025`, and `OWASP Session Management` framing remains present. | closed |

## Evidence

| Evidence | Result |
|----------|--------|
| `npm test` | Passed: 6 test files, 12 tests. |
| Phase 5 delegated UAT | Passed: 7 tests, 0 issues, 0 gaps. |
| PDF inspection | `session-hijacking-presentation.pdf` has 12 pages and size `148724` bytes. |
| PDF text extraction | Required presentation sections were found; raw-looking session cookie values count was `0`. |
| Presentation text scan | No raw-looking `sid`, `__Host-session`, or `connect.sid` values found in presentation text files. |
| Visual render check | Headless Edge rendered `slides.html` to a non-empty screenshot showing the first slide correctly. |
| Package scan | README/package links, timing markers, evidence safety terms, OWASP/MDN/Express references, and rehearsal commands were present. |
| `audit-open --json` | Reported no open UAT gaps, verification gaps, todos, seeds, debug sessions, or context questions. |

## Accepted Risks Log

| Risk ID | Threat Ref | Rationale | Accepted By | Date |
|---------|------------|-----------|-------------|------|
| AR-05-01 | T-05-07 | The repository can provide a timed roteiro and presenter split, but the actual oral delivery still depends on the two integrantes rehearsing the material. | Project scope for classroom delivery | 2026-06-09 |

## Security Audit Trail

| Audit Date | Threats Total | Closed | Open | Run By |
|------------|---------------|--------|------|--------|
| 2026-06-09 | 9 | 9 | 0 | codex-inline |

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log
- [x] `threats_open: 0` confirmed
- [x] `status: verified` set in frontmatter

**Approval:** verified 2026-06-09
