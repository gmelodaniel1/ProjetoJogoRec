# Project: Águas de Ferro — Diretrizes de Direção de Arte e Pipeline Noir Documental

## Architecture
- **Metáfora Central**: Mesa de Arquivo Morto / Redação Clandestina de Jornal em 1975.
- **Identidade Estética**: Tropical Noir Documental (baixa clave, águas escuras do Capibaribe com reflexos verticais de néons e luminárias, chiaroscuro tropical úmido, grão de prata e reticulado de linotipo).
- **Arquitetura Técnica de Imagem**: Pipeline Híbrido (Pré-processamento offline de matrizes fotográficas + Modulação dinâmica em tempo de execução via GPU/CSS com transição pelas Fases 1, 2 e 3).
- **Integração de Interface**: Contêiner `#slot-moldura-evidencia` dentro de `.cenario-container` (~54% da tela, coluna esquerda), padrão widescreen 2.1:1 (1200x570px) com paridade matemática 40:19 ao SVG procedural (800x380px), fotos documentais 3:2 (1200x800px) e dossiês de personagens 3:4 (450x600px).

## Feature Inventory
| # | Feature | Description | Milestone | Source | Status |
|---|---------|-------------|-----------|--------|--------|
| 1 | Estudo Comparativo RecifeVibe vs Acervo MCR Vol 99 | Análise de iluminação noturna, reflexos no Capibaribe, néons (Phoenix, Bem-Te-Vi, INPS) vs fichas de tombo MCR P&B (comícios, Vargas, aeroporto, SAPS) | M1 | Survey | DONE |
| 2 | Pilares da Identidade Tropical Noir Documental | Definição formal dos 4 pilares: Iluminação/Chiaroscuro, Matriz Cromática (Fases 1, 2, 3), Textura/Grão de Prata, Composição/Enquadramento | M1 | Survey | DONE |
| 3 | Referências Visuais Históricas Complementares (1958–1975) | Pesquisa aprofundada de pontes, Rua da Aurora, DOPS-PE, Enchente de 75, linotipos do Diario de Pernambuco, veículos e luminárias de época | M1 | Survey | DONE |
| 4 | Comparativo Técnico: Runtime vs Pre-processamento vs Híbrido | Avaliação de desempenho, uso de memória (evitar fac-símiles de 113MB no DOM), fidelidade noir e recomendação inequívoca da Abordagem Híbrida | M1 | Survey | DONE |
| 5 | Parâmetros Técnicos Objetivos e Fórmulas de Filtro | Especificação de curvas de tom S, filtros CSS por fase (`.fase-1`, `.fase-2`, `.fase-3`), vinhetas radiais, reticulado e scripts operacionais em Python e Sharp | M1 | Survey / Worker | DONE |
| 6 | Especificação de Integração com Layout e DOM | Diretrizes para `#slot-moldura-evidencia`, `.cenario-container`, `.foto-jornal-wrapper`, carimbos, aspect ratios (2.1:1, 3:2, 3:4) e safe-zone central de 80% | M1 | Survey / Worker | DONE |
| 7 | Guia Prático de Curadoria e Ingestão de Fotos Históricas | Protocolo operacional de 6 passos para curadores converterem matrizes brutas em assets otimizados para o jogo | M1 | Worker | DONE |
| 8 | Suite de Testes e Validação E2E da Documentação e Pipeline | Criação de testes automatizados (`test/test_diretrizes_noir_e2e.js`), publicação de `TEST_READY.md` e 100% de não-regressão da engine | M2 | Test Track | DONE |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Elaboração do Documento Mestre de Diretrizes Estéticas Noir | Redação integral de `docs/DIRETRIZES_ESTETICAS_NOIR.md` cobrindo R1, R2, R3 e todos os critérios de aceitação | Survey | DONE (docs/DIRETRIZES_ESTETICAS_NOIR.md aprovado) |
| M2 | Testes E2E, Revisão Crítica e Auditoria Forense | Validação automatizada de integridade (48/48 E2E, 7/7 engine), review triplo (APPROVE), desafio duplo (APPROVE) e auditoria forense (CLEAN) | M1 | DONE (TEST_READY.md publicado, Gate PASS) |

## Interface Contracts
### Documento `docs/DIRETRIZES_ESTETICAS_NOIR.md` ↔ Código do Jogo
- Reside em `docs/DIRETRIZES_ESTETICAS_NOIR.md` (61.1 KB, 771 linhas).
- Mapeia com exatidão os seletores `#slot-moldura-evidencia`, `.cenario-container`, `.foto-jornal-wrapper`, `.filtro-jornal-75`, `.selo-sobreposto-cenario` e classes `.fase-1`, `.fase-2`, `.fase-3`.
- Estrita conformidade com o Visual Blacklist de `CONTEXT.md` (`border-radius: 0 !important`, sem sans-serif moderna, sem #000000 ou #FFFFFF puros).

## Code Layout
- `docs/DIRETRIZES_ESTETICAS_NOIR.md` — Documento mestre de diretrizes estéticas e pipeline técnico.
- `test/test_diretrizes_noir_e2e.js` — Suíte de testes E2E automatizada (48 asserções).
- `TEST_READY.md` — Relatório de prontidão e matriz de rastreabilidade de testes.
- `index.html` — Estrutura de visualização do palco.
- `style.css` — Estilos, classes de filtro e variáveis da paleta.
- `renderer.js` — Motor de injeção de imagens e fallback procedural SVG.
- `artes/` — Diretório de referências e assets fotográficos.
