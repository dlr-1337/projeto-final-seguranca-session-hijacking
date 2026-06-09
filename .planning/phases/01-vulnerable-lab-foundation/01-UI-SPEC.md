---
phase: 01
slug: vulnerable-lab-foundation
status: approved
shadcn_initialized: false
preset: none
created: 2026-06-09
---

# Phase 01 - UI Design Contract

> Visual and interaction contract for the login and protected dashboard screens in the local vulnerable lab.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none |
| Preset | not applicable |
| Component library | none |
| Icon library | none required |
| Font | system sans-serif |

---

## Spacing Scale

Declared values (must be multiples of 4):

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Inline gaps |
| sm | 8px | Form field spacing |
| md | 16px | Default element spacing |
| lg | 24px | Form and dashboard section padding |
| xl | 32px | Page-level gaps |
| 2xl | 48px | Main content top spacing |
| 3xl | 64px | Unused unless needed for wide desktop breathing room |

Exceptions: none

---

## Typography

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Body | 16px | 400 | 1.5 |
| Label | 14px | 600 | 1.4 |
| Heading | 24px | 700 | 1.25 |
| Display | 32px | 700 | 1.2 |

---

## Color

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | `#f7f8fa` | Page background |
| Secondary (30%) | `#ffffff` | Forms, dashboard panels, tables |
| Accent (10%) | `#0f766e` | Primary action, focus ring, active status |
| Destructive | `#b91c1c` | Error text or invalid login state only |

Accent reserved for: primary login button, focus outlines, and small mode/status indicators.

---

## Copywriting Contract

| Element | Copy |
|---------|------|
| Primary CTA | Entrar no laboratorio |
| Empty state heading | Nenhum dado de sessao |
| Empty state body | Faca login com um usuario ficticio para acessar o dashboard protegido. |
| Error state | Credenciais invalidas. Use uma conta ficticia documentada no README. |
| Destructive confirmation | Logout vulneravel: esta acao nao representa a correcao final da sessao. |

---

## Screen Contracts

### Login

- Keep the login form compact and centered or aligned in a simple constrained column.
- Include only the fields needed for the demo: username and password.
- Show validation/error text only after a failed submission.
- Do not add registration, password reset, MFA, or social login.

### Dashboard

- Show user-specific fake private data immediately after login.
- Include a visible but restrained vulnerable-mode indicator if helpful for the classroom demo.
- Keep the page scannable for presentation: user identity, fake private data, and session/demo notes should be visible without scrolling on a standard laptop viewport.
- Do not show a tutorial for the attack; Phase 2 owns the attack walkthrough.

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | none | not required |
| third-party registries | none | not allowed in Phase 1 |

---

## Checker Sign-Off

- [x] Dimension 1 Copywriting: PASS
- [x] Dimension 2 Visuals: PASS
- [x] Dimension 3 Color: PASS
- [x] Dimension 4 Typography: PASS
- [x] Dimension 5 Spacing: PASS
- [x] Dimension 6 Registry Safety: PASS

**Approval:** approved 2026-06-09
