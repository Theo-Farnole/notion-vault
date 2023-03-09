import { Workspace } from "./Workspace";

export type BackupType = "manual" | "automatic";

export interface BackupLog {
    startTimestamp: number;
    endTimestamp: number;
    type: BackupType;
}

export interface BackupMetadata {
    workspace: Workspace,
    savePath: string,
    backupsLogs: BackupLog[]
}