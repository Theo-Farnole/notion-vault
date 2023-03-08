import { app, BrowserWindow, ipcMain, Menu, nativeImage, Tray } from 'electron';
import * as path from 'path';
import { enableExternalOpening, getAuthorizationUrl, startOAuthListener } from './auth-service';
import { makeBackup } from './backup-service';
import { trayIcon } from './icons';
import { openFolder } from './misc';
import { Settings } from './settings';

export function createWindow(settings: Settings) {

    const isDev = app.isPackaged === false;

    const window = new BrowserWindow({
        width: 800,
        height: 600,
        show: isDev, // hide at startup, show in dev mode
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),

        },
        autoHideMenuBar: true,
        icon: getIconPath("ico")
    })

    if (app.isPackaged) {
        // 'build/index.html'
        window.loadURL(`file://${__dirname}/../index.html`);
    } else {
        window.loadURL('http://localhost:3000/index.html');

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

    window.on('close', function (event) {
        event.preventDefault();
        window.hide();
    });

    settings.store.onDidAnyChange(() => {
        window.webContents.send("store:update");
    })

    startOAuthListener(window);
    enableExternalOpening(window);

    ipcMain.handle('dialog:openFolder', () => openFolder(window))
    ipcMain.handle("store:addBackup", (_, backup) => settings.addBackup(backup));
    ipcMain.handle("store:removeBackup", (_, backup) => settings.removeBackup(backup));
    ipcMain.handle("store:getBackups", () => settings.getBackups());
    ipcMain.handle("store:getApiKeys", () => settings.getApiKeys());
    ipcMain.handle("store:setApiKeys", (_, apiKeys: string[]) => settings.setApiKeys(apiKeys));
    ipcMain.handle("authorization:getUrl", () => getAuthorizationUrl());
    ipcMain.handle("backup:makeBackup", (_, workspace) => makeBackup(workspace));

    return window;
}

function getIconPath(extension: "png" | "ico") {
    return path.join(__dirname, '../../assets/icon.' + extension);
}

export function createTray(controlledWindow: BrowserWindow): Tray {

    // I couldn't put a tray icon with getIconPath. So I converted the png to base64
    let icon = nativeImage.createFromDataURL(trayIcon);

    icon = icon.resize({
        height: 16,
        width: 16
    });
    const tray = new Tray(icon)
    const contextMenu = Menu.buildFromTemplate([
        {
            label: "Show",
            click: () => {
                controlledWindow.show();
            }
        },
        {
            label: "Exit",
            click: () => {
                // TODO: handle when backup are running
                app.quit();
            }
        }
    ])
    tray.setContextMenu(contextMenu)

    tray.on("click", () => {
        if (!controlledWindow.isVisible()) {
            controlledWindow.show();
        }
    });

    return tray;
}