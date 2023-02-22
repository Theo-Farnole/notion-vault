
import { BackupMetadata } from "../src/types/BackupMetadata";
const Store = require("electron-store");

const store = new Store();
const KEYS = {
    backups: "backups"
};


export function addBackup(backup: BackupMetadata) {

    const backups = getBackups();

    backups.push(backup);

    setBackups(backups);
}

function getBackups(): BackupMetadata[] {
    return Array.from(store.get(KEYS.backups) ?? []) as BackupMetadata[];
}

function setBackups(backups: BackupMetadata[]) {
    store.set(KEYS.backups, backups);
}
