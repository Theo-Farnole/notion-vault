import React from "react";
import { electronApi } from "../../const";
import { BackupMetadata } from "../../types/BackupMetadata";
import { loadingStr, LoadingStr } from "../../types/Loading";
import { useOnStorageUpdate } from "./useOnStorageUpdate";

export function useGetSavedBackups() {

    const [backups, setBackups] = React.useState<LoadingStr | BackupMetadata[]>(loadingStr);

    useOnStorageUpdate(getBackups);

    React.useEffect(() => {
        getBackups();
    }, []);

    return backups;

    function getBackups() {
        electronApi.storage.backups.get()
            .then((b: any) => setBackups(b || []));
    }
}