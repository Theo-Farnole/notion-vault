import { app } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
import { BackupService } from './backup-service';
import { createTray, createWindow } from './creator';
import { Settings } from './settings';


if (app.isPackaged) {
  app.setLoginItemSettings({
    openAtLogin: true
  })
}

app.whenReady().then(() => {
  // DevTools
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

  const settings = new Settings();
  const backupService = new BackupService(settings);

  backupService.startAutomaticBackups();
  backupService.startBackupIfAppWasClosed();

  const win = createWindow(settings, backupService);
  createTray(win);
});