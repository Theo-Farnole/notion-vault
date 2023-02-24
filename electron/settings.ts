
import { BackupMetadata } from "../src/types/BackupMetadata";
import { BrowserWindow } from 'electron';
const Store = require("electron-store");

const KEYS = {
    backups: "backups",
    apiKeys: "api-keys",
};

export class Settings {
    private readonly _store = new Store();

    constructor(private readonly _window: BrowserWindow) {
        this._store.onDidAnyChange(this.triggerUpdateEvent.bind(this))
    }

    addBackup(backup: BackupMetadata) {
        this.setBackups([backup, ...this.getBackups()]);
    }

    removeBackup(backup: BackupMetadata) {
        const backups = this.getBackups();

        const index = backups.indexOf(backup);

        if (index !== -1) {
            this.setBackups(backups.splice(index, 1));
        }
        else {
            console.error("Removing backup failed because no backup found:", backup);
        }
    }

    getBackups(): BackupMetadata[] {

        const backups = this._store.get(KEYS.backups);

        if (backups) {
            return [...backups as any]
                .filter(b => b != null);  // while testing, we can introduce bad values
        }
        else {
            return [];
        }
    }

    setBackups(backups: BackupMetadata[]) {
        this._store.set(KEYS.backups, backups);
    }

    setApiKeys(apiKeys: string[]) {
        this._store.set(KEYS.apiKeys, apiKeys);
    }

    getApiKeys(): string[] {
        const apiKeys = this._store.get(KEYS.apiKeys);

        if (apiKeys) {
            return [...apiKeys as any]
                .filter(b => b != null);  // while testing, we can introduce bad values
        }
        else {
            return [];
        }
    }

    private triggerUpdateEvent() {
        this._window.webContents.send("store:update");
    }
}

