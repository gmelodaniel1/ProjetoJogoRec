# 27: Sistema de Persistência Determinística, Save/Load e Auto-Save de Prontuários

**What to build:**
Implementar o arcabouço técnico de serialização, armazenamento e recuperação de estado do jogo (`CharacterStateStore` e sessão ativa). O sistema gerencia múltiplos slots de prontuário arquivado (Slot Auto-Save + 3 Slots Manuais de Arquivo) usando uma camada desacoplada (`StorageAdapter` / `SaveManager`) baseada em `localStorage` no browser e compatível com persistência local no Electron. Inclui gatilhos automáticos de salvamento a cada decisão e validação defensiva contra corrupção de dados.

**Blocked by:** Ticket 05, Ticket 06, Ticket 26.

**Status:** open

## Acceptance Criteria
- [ ] Classe/Módulo `SaveManager` para serializar o estado completo (`CharacterStateStore`), histórico de decisões, ano, fase e variáveis da sessão.
- [ ] Suporte a 4 slots persistentes: `auto_save`, `slot_1`, `slot_2` e `slot_3`.
- [ ] Metadados de resumo rápidos por slot (ano, idade, condição social, timestamp, fase, principais carimbos) para listagem sem deserializar todo o estado.
- [ ] Gatilhos de auto-salvamento automático após assimilar decisões na folha de resolução e nas viradas de ano.
- [ ] Mecanismo de restauração determinística (`carregarSlot(slotId)`) que reidrata a interface e o dossiê/evento ativo com precisão.
- [ ] Tratamento defensivo de erros (corrupção de dados, fallback gracioso e versionamento de schema `versaoSchema: 1`).
- [ ] Suíte de testes automatizada `test/test_persistencia_save_load_ticket27.js` aprovada com 100% de sucesso.

