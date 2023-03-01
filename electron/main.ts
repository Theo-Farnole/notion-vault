import { app, BrowserWindow, ipcMain } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
import { Settings } from './settings';
import { enableExternalOpening, getAuthorizationUrl, startOAuthListener } from './auth-service';
import { makeBackup } from './backup-service';
import { createWindow } from './creator';
import { openFolder } from './misc';

app.whenReady().then(() => {
  // DevTools
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

  const win = createWindow();
  const settings = new Settings(win);

  startOAuthListener(win);
  enableExternalOpening(win);

  ipcMain.handle('dialog:openFolder', () => openFolder(win))
  ipcMain.handle("store:addBackup", (_, backup) => settings.addBackup(backup));
  ipcMain.handle("store:removeBackup", (_, backup) => settings.removeBackup(backup));
  ipcMain.handle("store:getBackups", () => settings.getBackups());
  ipcMain.handle("store:getApiKeys", () => settings.getApiKeys());
  ipcMain.handle("store:setApiKeys", (_, apiKeys: string[]) => settings.setApiKeys(apiKeys));
  ipcMain.handle("authorization:getUrl", () => getAuthorizationUrl());
  ipcMain.handle("backup:makeBackup", (_, workspace) => makeBackup(workspace));

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
});