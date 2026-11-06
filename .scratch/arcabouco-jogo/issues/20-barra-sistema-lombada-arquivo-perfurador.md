# 20: Redesign Diegético da Barra de Sistema — Lombada de Arquivo de Aço e Furos Perfurados

**What to build:**
Substituir a atual barra de sistema de estilo "software web" por uma autêntica **Lombada de Gaveteiro Metálico de Arquivo / Plaqueta de Aço Militar do DOPS**. A barra deve ostentar textura de metal oxidado verde-oliva/latão escurecido com rebites mecânicos fatiados nas extremidades, plaqueta de identificação de arquivo gravada, indicador de ações estilizado como **orifícios mecânicos de perfurador de mesa / furos de cartão perfurado IBM**, marcador de data/ano em estilo **carimbo datador mecânico de anéis de borracha**, e botões de sistema (DevTools / Tela Cheia) estilizados como **etiquetas gravadas em fita rotuladora Dymo em relevo**.

**Blocked by:** None (concluído)

**Status:** closed

- [x] Reformular a estrutura visual de `.barra-sistema` em `style.css` com aparência de metal verde-oliva militar (`#353B30`), chanfros mecânicos, relevo em latão escurecido e rebites parafusados nas extremidades (`.rebite-parafuso`).
- [x] Transformar o indicador de ações (`#indicador-acoes`) em orifícios de perfurador de mesa / furos de cartão perfurado (`.furo-perfurador`, `.ponto-ativo` como disco esmeralda intacto e `.ponto-gasto` como orifício perfurado escuro com sombra interna vazada).
- [x] Estilizar `#etiqueta-fase` e `#ano-atual` com a estética de plaqueta metálica de gaveteiro e carimbo datador rotativo mecânico.
- [x] Redesenhar os botões de ação do sistema (`#btn-devtools` e `#btn-fullscreen`) como autênticas fitas rotuladoras plásticas Dymo dos anos 60/70 com letras brancas prensadas em relevo (`text-shadow`) e fita adesiva texturizada.
- [x] Manter 100% de integridade com o DOM (`index.html`) e a sincronização reativa de `renderer.js`.
- [x] Validar conformidade absoluta com o Visual Blacklist (zero cantos arredondados, sem preto digital, fontes analógicas) e aprovação em todas as suítes de teste (11/11 asserções no teste do ticket e 86/86 asserções no total de testes).
