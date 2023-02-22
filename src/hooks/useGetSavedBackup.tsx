import React from "react";
import { BackupMetadata } from "../types/BackupMetadata";
import { loadingStr, LoadingStr } from "../types/Loading";

export function useGetSavedBackups() {

    const [backups, setBackups] = React.useState<LoadingStr | BackupMetadata[]>(loadingStr);

    React.useEffect(() => {
        (window as any).electronAPI.getBackups()
            .then((b: any) => setBackups(b || []));
    }, []);

    return backups;
}