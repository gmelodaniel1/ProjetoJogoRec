# 26: Tela Especial de Resolução em Papel Sobreposto com Foto Histórica & Consequências

**What to build:**
Substituir a transição abrupta pós-decisão por uma folha de ocorrência/relatório arquivístico sobreposta ao centro da mesa de jogo. O documento exibe a fotografia de época da cena, o carimbo oficial da escolha, a crônica narrativa do desfecho (Ticket 25) e o balanço tátil das alterações de atributos (+1 Sangue-Frio, +2 Moral Popular, etc.). O jogo só avança quando o jogador clica em `[ ASSIMILAR OS FATOS & SEGUIR ADIANTE ➔ ]`, integrando-se com a virada de ano extraordinária e o próximo evento.

**Blocked by:** Ticket 24 e Ticket 25.

**Status:** ready-for-agent

## Acceptance Criteria
- [ ] Modal diegético `#overlay-resolucao-consequencia` estilizado como folha de ocorrência sobreposta ao centro da mesa.
- [ ] Exibição da moldura fotográfica de época, tombo do acervo e carimbo oficial com cor correspondente.
- [ ] Exibição do texto da crônica do desfecho e das pílulas táteis de impacto nos atributos e recursos.
- [ ] Botão de encerramento `[ ASSIMILAR OS FATOS & SEGUIR ADIANTE ➔ ]` que só então transita para a virada de ano, próximo evento ou dossiê.
- [ ] Preservação estrita das regras de acessibilidade e compatibilidade híbrida Web + Electron.
- [ ] Suíte de testes automatizada `test/test_tela_resolucao_ticket26.js` aprovada com 100% de sucesso.

