import { BackupMetadata } from "./BackupMetadata";

export interface ElectronApi {
    openFile: () => Promise<void>;
    storage: {
        backups: {
            add: (backupMetadata: BackupMetadata) => Promise<void>;
            get: () => Promise<void>;
        },
        apiKeys: {
            set: (apiKeys: string[]) => Promise<void>;
            get: () => Promise<void>;
        },
        updateEvent: {
            on: (fn: () => void) => void,
            removeListener: (fn: () => void) => void,
        }
        }
}