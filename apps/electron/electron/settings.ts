
import { BackupMetadata } from "../src/types/BackupMetadata";
import { isEqual } from 'lodash';
const Store = require("electron-store");

const KEYS = {
    backups: "backups",
    apiKeys: "api-keys",
};

export class Settings {
    public readonly store = new Store();


    addBackup(backup: BackupMetadata) {
        this.setBackups([backup, ...this.getBackups()]);
    }

    replaceBackup(previous: BackupMetadata, newBackup: BackupMetadata) {
        const backups = this.getBackups();

        const index = backups
            .findIndex(b => {
                return b.workspace.id === previous.workspace.id &&
                    b.savePath === previous.savePath
            });

        if (index === -1) {
            throw new Error("Backup to replace is not found in backups.")
        }

        backups[index] = newBackup;

        this.setBackups(backups);
    }

    removeBackup(backup: BackupMetadata) {
        const backups = this.getBackups();

        const newBackups = backups
            .filter((b) => isEqual(b, backup) === false);

        this.setBackups(newBackups);
    }

    getBackups(): BackupMetadata[] {

        const backups: BackupMetadata[] | null = this.store.get(KEYS.backups);

        if (backups) {
            return [...backups] as BackupMetadata[];
        }
        else {
            return [];
        }
    }

    setBackups(backups: BackupMetadata[]) {
        this.store.set(KEYS.backups, backups);
    }

    setApiKeys(apiKeys: string[]) {
        this.store.set(KEYS.apiKeys, apiKeys);
    }

    getApiKeys(): string[] {
        const apiKeys = this.store.get(KEYS.apiKeys);

        if (apiKeys) {
            return [...apiKeys as any]
                .filter(b => b != null);  // while testing, we can introduce bad values
        }
        else {
            return [];
        }
    }
}

