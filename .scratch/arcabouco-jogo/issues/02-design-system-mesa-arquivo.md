# 02: Design System da "Mesa de Arquivo Morto" & Tipografia Editorial

**What to build:**
Superfície visual completa e imersiva que coloca o jogador em frente a uma mesa de madeira gasta com documentos de arquivo morto dos anos 70. O layout divide o espaço em duas colunas assimétricas (35% prontuário, 65% folha de leitura e decisão), com tipografia serifada editorial, capitular clássica (3 linhas de altura), fontes monoespaçadas datilografadas e estrita obediência à Blacklist Visual (sem sans-serif modernas, sem cantos arredondados e sem fundos brancos/pretos puros).

**Blocked by:** 01: Shell Electron & Janela de Tela Cheia com IPC Seguro

**Status:** done

- [x] Variáveis CSS declaradas no `:root` definindo a paleta de papel envelhecido (`#E6DFD3`, `#D8CFBC`), tintas (`#1E1D1B`, `#5A554C`) e madeira gasta (`#161412`).
- [x] Layout assimétrico funcional com coluna esquerda (35%) e folha direita (65%) com margens confortáveis e `max-width: 65ch`.
- [x] Fontes tipográficas carregadas e aplicadas: serifada editorial para leitura e monoespaçada datilografada para registros.
- [x] O primeiro parágrafo renderiza capitular (`::first-letter`) de 3 linhas de altura em estilo editorial.
- [x] Zero violações da Blacklist Visual estipulada no CONTEXT.md.

