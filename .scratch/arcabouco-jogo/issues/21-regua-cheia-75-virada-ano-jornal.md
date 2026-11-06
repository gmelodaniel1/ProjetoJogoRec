# 21: Régua Limnimétrica Esmaltada da Cheia de 75 & Overlay de Virada de Ano em Edição Extraordinária de Jornal

**What to build:**
Substituir os componentes abstratos/digitais da Cheia de 75 e da Virada de Ano por artefatos táteis analógicos autênticos do Recife (1958-1975):
1. **Régua Limnimétrica da Chesf / Defesa Civil (`.painel-cheia-75`):** Painel metálico esmaltado de ferro e concreto úmido, graduação milimetrada em estêncil industrial (`+1,00m`, `+2,00m`, `+3,50m`, `+4,50m - COTA DE RUPTURA`), água barrenta turva do Rio Capibaribe com lodo e linha de espuma/aguapés, e luz-piloto analógica âmbar pulsante.
2. **Overlay de Virada de Ano (`#overlay-virada-ano`):** Extinção do `backdrop-filter: blur(3px)` digital contemporâneo, substituído por vinheta densa de redação noturna e cartão estilizado como **Edição Extraordinária de Jornal de Época / Folha de Calendário de Parede de Tipografia Manual**.

**Blocked by:** None (concluído)

**Status:** closed

- [x] Redesenhar `.painel-cheia-75` com cantoneiras de aço, esmalte branco/preto de régua limnimétrica industrial, marcas de cota em metros e lodo barrento na coluna de água.
- [x] Implementar luz-piloto analógica pulsante de filamento incandescente da Defesa Civil (`@keyframes pulsarAlertaChesf`).
- [x] Eliminar `backdrop-filter: blur(3px)` em `.overlay-virada-ano`, substituindo-o por vinheta atmosférica escura analógica.
- [x] Transformar `.cartao-virada-ano` em Edição Extraordinária de Jornal com picote de guilhotina, carimbo de chancelaria e tipografia linotípica garrafal.
- [x] Preservar integralmente todos os IDs e manipuladores de eventos (`#regua-barra-nivel`, `#val-nivel-rio`, `#val-horas-cheia`, `#val-status-tapacura`, `#overlay-virada-ano`, `#virada-ano-de`, `#virada-ano-para`, `#virada-idade-info`, `#btn-continuar-virada-ano`).
- [x] Validar conformidade absoluta com o Visual Blacklist (zero cantos arredondados, sem preto digital) e aprovação em 100% dos testes automatizados (12/12 asserções no novo teste e 98/98 asserções no total da suíte).
