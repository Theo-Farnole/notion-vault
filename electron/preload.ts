import { BackupMetadata } from "../src/types/BackupMetadata"
import { ElectronApi } from "../src/types/ElectronApi"

const { contextBridge, ipcRenderer } = require('electron')

const electronApi: ElectronApi = {
    openFile: () => ipcRenderer.invoke('dialog:openFolder'),
    authorization: {
        getAuthorizationUrl: () => ipcRenderer.invoke('authorization:getUrl'),
        event: {

            on: (callback) => ipcRenderer.on('api:authorizeWorkspace', callback),
            removeListener: (callback) => ipcRenderer.removeListener('api:authorizeWorkspace', callback)
        }
    },
    storage: {
        backups: {
            add: (backupMetadata: BackupMetadata) => ipcRenderer.invoke('store:addBackup', backupMetadata),
            get: () => ipcRenderer.invoke('store:getBackups'),
            remove: (backupMetadata: BackupMetadata) => ipcRenderer.invoke('store:removeBackup', backupMetadata)
        },
        apiKeys: {
            set: (apiKeys: string[]) => ipcRenderer.invoke('store:setApiKeys', apiKeys),
            get: () => ipcRenderer.invoke('store:getApiKeys'),
        },
        updateEvent: {
            on: (callback) => ipcRenderer.on('store:update', callback),
            removeListener: (callback) => ipcRenderer.removeListener('store:update', callback)
        }
    }
};

contextBridge.exposeInMainWorld('electronApi', electronApi)