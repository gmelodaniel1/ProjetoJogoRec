const { contextBridge, ipcRenderer } = require('electron');

// Expõe APIs seguras para a janela renderizadora
contextBridge.exposeInMainWorld('electronAPI', {
  toggleFullscreen: () => ipcRenderer.invoke('app:toggle-fullscreen'),
  isFullscreen: () => ipcRenderer.invoke('app:is-fullscreen'),
  quit: () => ipcRenderer.invoke('app:quit'),
  
  // Acesso seguro ao Roteiro em Markdown
  getAllEvents: () => ipcRenderer.invoke('narrative:get-all-events'),
  getEvent: (eventId) => ipcRenderer.invoke('narrative:get-event', eventId),

  // Inscrição reativa para Hot-Reloading de conteúdo
  onEventsUpdated: (callback) => {
    const listener = (_event, data) => callback(data);
    ipcRenderer.on('narrative:events-updated', listener);
    return () => ipcRenderer.removeListener('narrative:events-updated', listener);
  }
});

