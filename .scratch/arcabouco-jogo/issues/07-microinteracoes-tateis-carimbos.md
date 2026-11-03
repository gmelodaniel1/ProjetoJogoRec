# 07: Microinterações Táteis: Carimbos, Screen Shake e Tarjas de Censura

**What to build:**
Camada de "game feel" analógico e resposta tátil. Decisões bloqueadas exibem tarjas pretas de censura e carimbos vermelhos de impedimento. Ao clicar em uma decisão válida, um carimbo de decisão bate sobre a folha com impacto visual e breve tremor de tela (`screen shake` de 100ms) antes da virada da página.

**Blocked by:** 06: Motor Determinístico de Decisão & Verificador de Requisitos

**Status:** done

- [x] Opções bloqueadas exibem tarja de censura preta ou carimbo diagonal vermelho `[BLOQUEADO — REQUER ...]`.
- [x] O motivo do bloqueio é visível e transparente ao jogador.
- [x] Decisões confirmadas ativam animação tátil de carimbo descendo sobre o documento.
- [x] Micro-tremor de tela (`screen shake` de 100ms) executado no impacto do carimbo.
- [x] Transição suave para a próxima folha após o impacto.

