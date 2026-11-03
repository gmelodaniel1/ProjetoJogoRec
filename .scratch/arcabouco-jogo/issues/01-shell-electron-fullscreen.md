# 01: Shell Electron & Janela de Tela Cheia com IPC Seguro

**What to build:**
Inicialização do aplicativo desktop Electron configurado para execução nativa em tela cheia com toggle de janela (F11 e Esc), preload seguro com contextBridge e isolamento de contexto (contextIsolation), sem erros de CORS ao ler arquivos e assets locais, servindo de container estável para a interface do jogo.

**Blocked by:** None (can start immediately)

**Status:** done

- [x] O projeto possui `package.json` configurado com Electron e scripts de execução (`npm start`).
- [x] `main.js` inicializa uma janela nativa com suporte a tela cheia e atalhos de controle (`F11` para alternar fullscreen, `Esc` para sair).
- [x] `preload.js` estabelece um canal IPC seguro via `contextBridge` expondo métodos controlados para a janela renderizadora.
- [x] Uma página HTML de teste é carregada com sucesso na inicialização, exibindo a viewport sem barras de rolagem estranhas ou falhas de carregamento.
