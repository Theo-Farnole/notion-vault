import React from "react";
import { electronApi } from "../../const";
import { loadingStr, LoadingStr } from "../../types/Loading";
import { useOnStorageUpdate } from "./useOnStorageUpdate";

export default function useGetSavedApiKeys(): string[] | LoadingStr {

    const [secrets, setSecrets] = React.useState<string[] | LoadingStr>(loadingStr);
    useOnStorageUpdate(() => {
        getSecrets()
    });

    React.useEffect(() => {
        getSecrets();
    }, [])

    return secrets;

    function getSecrets() {
        electronApi.storage.apiKeys.get()
            .then((b: any) => setSecrets(b || []));
    }
}

