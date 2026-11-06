# 29: Módulo de Áudio Sintetizado Analógico & Soundscape (Web Audio API)

**What to build:**
Centralizar e expandir a arquitetura sonora do jogo através de um `AudioManager` singleton baseado na Web Audio API, eliminando vazamentos de contextos múltiplos e oferecendo uma biblioteca rica de efeitos sonoros sintetizados proceduralmente (100% livres de dependências de arquivos de áudio externos). Inclui sons táteis de máquina de escrever para a leitura progressiva, estalido e fricção de papel para o Kardex e folha de resolução, carimbo niquelado encorpado e controle de Mute/Volume integrado à barra de sistema.

**Blocked by:** Ticket 20, Ticket 24, Ticket 26.

**Status:** closed

## Acceptance Criteria
- [x] Classe singleton `AudioManager` com gerenciamento de estado (`audioContext` único) e inicialização resiliente com primeiro gesto do usuário.
- [x] Sintetizador procedural com suporte aos seguintes efeitos:
  - `somCarimbo()`: impacto grave encorpado com decaimento exponencial.
  - `somDatilografia()`: estalido percussivo metálico leve com modulação aleatória de tom para parágrafos narrativos.
  - `somPapel()`: ruído branco de fricção para abas Kardex, abertura de dossiê e sobreposição de folha.
  - `somGavetaMetalica()`: ruído de trilho metálico e trava para abertura do gaveteiro de arquivos.
  - `somAlertaTenso()`: drone grave dissonante (45Hz) para censura AI-5 e crises do DOPS.
- [x] Controle visual de áudio na barra superior (`#btn-audio-toggle`) permitindo alternar entre Áudio Ativo e Silenciado, com persistência da preferência no `localStorage`.
- [x] Conexão direta dos eventos táteis do jogo (`progredirLeitura`, troca de abas, exibição de desfecho) com os novos efeitos sintetizados.
- [x] Suíte de testes automatizada `test/test_audio_manager_ticket29.js` aprovada com 100% de sucesso.

