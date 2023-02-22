
import { BackupMetadata } from "../src/types/BackupMetadata";
const Store = require("electron-store");

const store = new Store();
const KEYS = {
    backups: "backups"
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
