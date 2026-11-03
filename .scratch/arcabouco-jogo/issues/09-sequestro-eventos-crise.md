# 09: Sistema de Sequestro de Agenda por Eventos de Crise Forçados

**What to build:**
Mecanismo de tensão extrema por quebra de limiares. Quando um recurso crítico estoura ou zera (ex: `Suspeita do DOPS == 10` ou `Capital == 0`), a agenda do dossiê é imediatamente sequestrada pelo motor. Um evento de emergência obrigatório é disparado, forçando o jogador a queimar atributos ou sofrer sequelas graves para evitar a eliminação.

**Blocked by:** 08: Sistema de Dossiê da Fase & Economia de Ações

**Status:** done

- [x] Verificador contínuo de limiares de recursos e perigos do jogador.
- [x] Bloqueio imediato do acesso ao dossiê normal ao atingir um valor extremo.
- [x] Injeção de evento de crise obrigatório correspondente à crise deflagrada.
- [x] Opções desesperadas de queima de outros recursos ou perda permanente para escapar da eliminação.

