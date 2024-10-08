import { contextBridge, ipcRenderer, webUtils } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
const api = {
  droppedFiles: (paths) =>
    ipcRenderer.send('dropped-files', paths.map(webUtils.getPathForFile)),
  onUpdateFiles: (callback) => ipcRenderer.on('update-files', callback),
  offUpdateFiles: (callback) => ipcRenderer.off('update-files', callback),
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = electronAPI;
  window.api = api;
}
