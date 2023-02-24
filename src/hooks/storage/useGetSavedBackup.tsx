import React from "react";
import { electronApi } from "../../const";
import { BackupMetadata } from "../../types/BackupMetadata";
import { loadingStr, LoadingStr } from "../../types/Loading";

export function useGetSavedBackups() {

    const [backups, setBackups] = React.useState<LoadingStr | BackupMetadata[]>(loadingStr);

    React.useEffect(() => {
        electronApi.storage.backups.get()
            .then((b: any) => setBackups(b || []));
    }, []);

    return backups;
}