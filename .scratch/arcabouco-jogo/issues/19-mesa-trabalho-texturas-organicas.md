# 19: Mesa de Trabalho Viva e Texturas Orgânicas

**What to build:**
Transformar a interface do jogo em uma autêntica mesa física de redação clandestina / arquivo morto do DOPS (1958-1975). Introduzir quebra de alinhamento ortogonal (micro-rotação na folha editorial de jornal e pasta documental), adereços diegéticos táteis de mesa (marcas circulares de fundo de xícara de café frio com absorção capilar, grampo metálico oxidado com halo de ferrugem migrando para a celulose, clipe metálico avulso), textura e iluminação cônica motivada de abajur de leitura sobre madeira de lei, e micro-oscilação analógica de filamento incandescente em momentos de crise.

**Blocked by:** None (concluído)

**Status:** closed

- [x] Implementar iluminação de mesa com cone de luz de leitura focal e penumbra periférica escura na viewport (`.mesa-viewport`).
- [x] Aplicar micro-rotações diegéticas assimétricas (`.folha-narrativa` com +0.35deg e `.palco-central` com -0.15deg) com sombras dinâmicas de descolamento de papel da bancada de madeira.
- [x] Criar adereço diegético de marcas de xícara de café (*Coffee Ring Stains*) com bordas escuras capilares e centro translúcido em SVG/CSS sobre a mesa e interceptando a folha.
- [x] Criar grampo oxidado com halo de ferrugem (*Rusted Staple*) no topo da folha editorial de jornal.
- [x] Implementar micro-oscilação analógica (flicker de voltagem) em estados de crise urgente e blecaute da Fase 3.
- [x] Aplicar tipografia de linotipo nos parágrafos narrativos (`text-align: justify`, `hyphens: auto`, `text-indent: 1.5em`).
- [x] Validar conformidade estrita com o Visual Blacklist (sem border-radius, sem preto puro, tipografia analógica) e aprovação em 100% dos testes automatizados da engine e suítes E2E (11/11 asserções no novo teste dedicado e 75/75 asserções globais).
