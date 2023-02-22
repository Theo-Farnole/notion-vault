import { BackupMetadata } from "../src/types/BackupMetadata"

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    openFile: () => ipcRenderer.invoke('dialog:openFolder'),
    addBackup: (backupMetadata: BackupMetadata) => ipcRenderer.invoke('store:addBackup', backupMetadata),
    getBackups: () => ipcRenderer.invoke('store:getBackups')
})