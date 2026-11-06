# 28: Menu Principal Diegético & Gaveteiro de Arquivos ("Arquivo Geral do Recife")

**What to build:**
Criar a tela de abertura do jogo (Menu Principal) e o modal de gerenciamento de arquivos em jogo (Gaveteiro de Prontuários). O menu inicial é ambientado como uma pasta confidencial fechada sobre a mesa de mogno com opções de `[ CONTINUAR INVESTIGAÇÃO ]`, `[ NOVO PRONTUÁRIO ]`, `[ GAVETEIRO DE ARQUIVOS ]` e `[ MANUAL DE PROCEDIMENTOS ]`. Em jogo, o gaveteiro pode ser aberto a qualquer momento pelo botão `#btn-menu-arquivo` na barra de sistema ou pela tecla `Escape`, permitindo salvar manualmente, carregar prontuários anteriores ou retornar ao menu.

**Blocked by:** Ticket 20, Ticket 27.

**Status:** closed

## Acceptance Criteria
- [x] Tela de Abertura (`#tela-menu-principal`) com capa diegética de arquivo arquivístico sobre a mesa, obedecendo ao Visual Blacklist (sem cantos arredondados, sem `#FFFFFF`).
- [x] Botão `[ CONTINUAR INVESTIGAÇÃO ]` ativado apenas quando existir salvamento válido no slot de auto-save ou nos slots manuais.
- [x] Ação de `[ NOVO PRONTUÁRIO ]` com confirmação protetiva antes de reiniciar o estado do zero.
- [x] Modal do Gaveteiro de Arquivos (`#modal-gaveteiro-arquivos`) exibindo as 4 fichas de arquivo com seus metadados de identificação visual.
- [x] Botão `#btn-menu-arquivo` na barra superior vintage e gatilho de atalho de teclado via tecla `Escape` (quando nenhum outro overlay modal estiver ativo).
- [x] Feedback tátil com animações mecânicas de abertura/fechamento de gaveta e carimbos de arquivo.
- [x] Suíte de testes automatizada `test/test_menu_gaveteiro_ticket28.js` aprovada com 100% de sucesso.

