import { Workspace } from "./Workspace";

export interface BackupMetadata {
    workspace: Workspace,
    savePath: string,
    lastBackupTimestamp: number;
}