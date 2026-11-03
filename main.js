const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const path = require('path');
const fs = require('fs');
const { carregarTodosEventos, parseEventFile } = require('./src/narrative-parser');

let mainWindow = null;
const pastaConteudo = path.join(__dirname, 'conteudo');
let debounceWatcherTimer = null;

function iniciarObservadorDeConteudo() {
  if (!fs.existsSync(pastaConteudo)) return;

  try {
    fs.watch(pastaConteudo, { recursive: true }, (eventType, filename) => {
      if (!filename || !filename.endsWith('.md')) return;

      if (debounceWatcherTimer) clearTimeout(debounceWatcherTimer);
      debounceWatcherTimer = setTimeout(() => {
        console.log(`[HOT-RELOAD] Arquivo alterado no disco: ${filename}`);
        const dadosAtualizados = carregarTodosEventos(pastaConteudo);
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('narrative:events-updated', dadosAtualizados);
        }
      }, 150);
    });
    console.log(`[HOT-RELOAD] Monitorando pasta de conteúdo: ${pastaConteudo}`);
  } catch (err) {
    console.warn(`[HOT-RELOAD] Falha ao iniciar observador recursivo: ${err.message}`);
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    fullscreen: true,
    autoHideMenuBar: true,
    backgroundColor: '#161412', // Madeira escura do fundo da mesa
    show: false, // Exibe suavemente após pronto
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false // Permite preload seguro com acesso a módulos Node necessários
    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Atalhos de controle de tela
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F11' && input.type === 'keyDown') {
      mainWindow.setFullScreen(!mainWindow.isFullScreen());
      event.preventDefault();
    }
    if (input.key === 'Escape' && input.type === 'keyDown' && mainWindow.isFullScreen()) {
      mainWindow.setFullScreen(false);
      event.preventDefault();
    }
    if (input.key === 'F12' && input.type === 'keyDown') {
      mainWindow.webContents.toggleDevTools();
      event.preventDefault();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// IPC Handlers seguros
ipcMain.handle('app:toggle-fullscreen', () => {
  if (mainWindow) {
    const isFull = !mainWindow.isFullScreen();
    mainWindow.setFullScreen(isFull);
    return isFull;
  }
  return false;
});

ipcMain.handle('app:is-fullscreen', () => {
  return mainWindow ? mainWindow.isFullScreen() : false;
});

ipcMain.handle('app:quit', () => {
  app.quit();
});

// IPC Handlers de Narrativa e Conteúdo Markdown
ipcMain.handle('narrative:get-all-events', async () => {
  return carregarTodosEventos(pastaConteudo);
});

ipcMain.handle('narrative:get-event', async (event, eventId) => {
  const dados = carregarTodosEventos(pastaConteudo);
  return dados.eventos[eventId] || null;
});

app.whenReady().then(() => {
  createWindow();
  iniciarObservadorDeConteudo();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

