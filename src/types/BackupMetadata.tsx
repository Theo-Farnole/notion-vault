export interface BackupMetadata {
    workspace: {
        name: string;
        avatarUrl: string
    },
    savePath: string,
    lastBackupTimestamp: number;
}