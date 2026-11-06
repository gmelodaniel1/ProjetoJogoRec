# 23: Prontuário de Atributos em Pasta Manila Suspenso & Painel de Consequências com Clichê Tipográfico

**What to build:**  
Transformar a tela de Atributos e Recursos (`#aba-atributos`) em uma autêntica **Pasta Manila de Arquivo Suspenso de Prontuário Individual do DOPS**, com guia/orelha de cartolina manila saliente, cabeçalho de inquérito formal, linhas pontilhadas de clichê tipográfico e réguas de espectro qualitativo modeladas como carimbos mecânicos de 5 patamares. Redesenhar o Painel de Consequências pós-decisão (`#painel-consequencias-decisao`) como uma **Segunda Via de Despacho Oficial Anexa**, fixada por fita gomada ressecada com carimbo de registro e deltas de impacto estilo *The Life and Suffering of Sir Brante*.

**Blocked by:** Ticket 20, Ticket 21 e Ticket 22.

**Status:** closed

## Acceptance Criteria
- [x] `#aba-atributos` estilizada como pasta manila de arquivo suspenso (`#D2C4A8` / `#C3B394`), com guia/orelha de índice datilografada (`.guia-pasta-manila`).
- [x] Cabeçalho com formulário de inquérito oficial do DOPS (`.prontuario-cabecalho-oficial`) e carimbo de registro confidencial.
- [x] Campos de condição social e antecedentes com linhas de clichê tipográfico pontilhadas (`.linha-cliche-pontilhada`).
- [x] Barras de espectro qualitativo (`.barra-espectro-brante`) modeladas como réguas gravadas e carimbos de 5 patamares estampados em alto relevo.
- [x] `#painel-consequencias-decisao` redesenhado como Segunda Via de Despacho Consequencial preso com fita gomada e carimbado com o resultado da ação.
- [x] Preservação estrita de todos os IDs de atributos (`#attr-astucia`, `#rec-capital`, `#rec-suspeita`, etc.) e do botão de fechamento.
- [x] Respeito rigoroso ao Visual Blacklist (zero `border-radius: [1-9]px`, sem `#000000` puro, fontes analógicas estritas).
- [x] Suíte de testes automatizada `test/test_atributos_consequencias_ticket23.js` aprovada com 100% de sucesso.

