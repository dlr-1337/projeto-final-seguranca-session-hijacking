# Pacote de Apresentação - Session Hijacking

Este diretório contém os materiais finais para a apresentação de até 25 minutos.

## Arquivos

| Arquivo | Uso |
|---------|-----|
| [`slides.html`](slides.html) | Fonte editável dos 12 slides em HTML. |
| [`session-hijacking-presentation.pdf`](session-hijacking-presentation.pdf) | PDF final para apresentar ou entregar. |
| [`speaker-script.md`](speaker-script.md) | Roteiro cronometrado com divisão entre Integrante 1 e Integrante 2. |
| [`evidence-checklist.md`](evidence-checklist.md) | Checklist das evidências locais, fictícias e ocultadas. |
| [`references.md`](references.md) | Referências oficiais e arquivos locais usados nos slides. |

## Divisão de Tempo

| Bloco | Tempo | Responsável |
|-------|-------|-------------|
| Conceito | 7 min | Integrante 1 |
| Ataque | 8 min | Integrante 1 com apoio do Integrante 2 |
| Correção e verificação | 8 min | Integrante 2 com apoio do Integrante 1 |
| Conclusão | 2 min | Integrante 2 |

## Ensaio

Rode os comandos abaixo antes da apresentação:

```bash
npm run dev
npm run dev:fixed
npm test
```

Use apenas `127.0.0.1`/localhost, usuários fictícios e cookies ocultados nos slides.
