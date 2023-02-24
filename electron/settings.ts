
import { BackupMetadata } from "../src/types/BackupMetadata";
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
const Store = require("electron-store");

const store = new Store();
store.onDidAnyChange(triggerUpdateEvent)

const KEYS = {
    backups: "backups",
    apiKeys: "api-keys",
};

export function addBackup(backup: BackupMetadata) {

    setBackups([backup, ...getBackups()]);
}

export function getBackups(): BackupMetadata[] {

    const backups = store.get(KEYS.backups);

    if (backups) {
        return [...backups as any]
            .filter(b => b != null);  // while testing, we can introduce bad values
    }
    else {
        return [];
    }
}

function setBackups(backups: BackupMetadata[]) {
    store.set(KEYS.backups, backups);
}

export function setApiKeys(apiKeys: string[]) {
    store.set(KEYS.apiKeys, apiKeys);
}

export function getApiKeys(): string[] {
    const apiKeys = store.get(KEYS.apiKeys);

    if (apiKeys) {
        return [...apiKeys as any]
            .filter(b => b != null);  // while testing, we can introduce bad values
    }
    else {
        return [];
    }
}


const updateListeners: (() => void)[] = [];

function triggerUpdateEvent() {
    ipcMain.emit("test");
}

export function addStoreUpdateListener(fn: () => void) {
    updateListeners.push(fn);
}

export function removeStoreUpdateListener(fn: () => void) {
    updateListeners.splice(updateListeners.indexOf(fn), 1);

}