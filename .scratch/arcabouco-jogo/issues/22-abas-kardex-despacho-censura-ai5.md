# 22: Abas Kardex de Fichário Suspenso & Despachos de Decisão com Tarja de Censura AI-5

**What to build:**
Refinar a navegação inferior e os elementos de tomada de decisão com rigor diegético e histórico:
1. **Abas de Atalho Kardex Suspensas (`.barra-atalhos-dossie`):** Substituir os botões quadrados por guias salientes de fichário Kardex de cartolina manila com visor de celuloide amarelado, elevação tátil e conexão contínua da aba ativa ao palco documental.
2. **Ordem de Despacho Deliberativo (`#btn-continuar-para-decisao`):** Transformar o botão de fluxo em dois tempos em uma autêntica Ordem de Despacho Policial anexa, fixada com fita adesiva gomada ressecada (`.fita-despacho-adesiva`).
3. **Cartões de Decisão Perfurados (`.cartao-decisao`):** Modelar as opções de escolha como tiras de papel picotado de telex/fichas de inquérito com micro-furos nas margens.
4. **Tarja de Censura AI-5 (`.tarja-censura-ai5`):** Substituir a tarja genérica das opções bloqueadas por uma tarja densa de nanquim preto passado à trincha pela censura federal, sobre a qual repousa o carimbo oficial: `[ CENSURADO // LEI DE IMPRENSA • AI-5 ]`.

**Blocked by:** None (concluído)

**Status:** closed

- [x] Implementar abas salientes Kardex em `.barra-atalhos-dossie` e `.btn-atalho-pasta` com visor de celuloide e relevo de fichário de arquivo.
- [x] Estilizar `#btn-continuar-para-decisao` como Ordem de Despacho com fita adesiva gomada ressecada e borda de carimbo.
- [x] Modelar `.cartao-decisao` como tiras de telex/despacho com perfurações e textura manila.
- [x] Implementar a tarja de censura da DCDP / Polícia Federal a nanquim preto com carimbo `[ CENSURADO // LEI DE IMPRENSA • AI-5 ]` para opções bloqueadas.
- [x] Atualizar `renderer.js` e `index.html` para renderizar os novos metadados de despacho e censura.
- [x] Validar conformidade absoluta com o Visual Blacklist (zero cantos arredondados, sem preto digital) e aprovação em 100% dos testes da engine e suítes E2E (9/9 asserções no novo teste e 107/107 asserções globais).
