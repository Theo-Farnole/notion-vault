import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
import { Settings } from './settings';
import { enableExternalOpening, getAuthorizationUrl, startOAuthListener } from './auth-service';
import { makeBackup } from './backup-service';

function createWindow() {

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),

    },
    autoHideMenuBar: true
  })

  if (app.isPackaged) {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
  } else {
    win.loadURL('http://localhost:3000/index.html');

    // Hot Reloading on 'node_modules/.bin/electronPath'
    require('electron-reload')(__dirname, {
      electron: path.join(__dirname,
        '..',
        '..',
        'node_modules',
        '.bin',
        'electron' + (process.platform === "win32" ? ".cmd" : "")),
      forceHardReset: true,
      hardResetMethod: 'exit'
    });
  }



  return win;
}

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

async function openFolder(win: BrowserWindow) {
  const { canceled, filePaths } = await dialog.showOpenDialog(win, {
    properties: ["openDirectory"]
  })
  if (canceled) {
    return
  } else {
    return filePaths[0]
  }
}