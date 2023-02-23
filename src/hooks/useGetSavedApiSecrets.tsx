import React from "react";
import { loadingStr, LoadingStr } from "../types/Loading";

export default function useGetSavedApiSecrets(): string[] | LoadingStr {

    const [secrets, setSecrets] = React.useState<string[] | LoadingStr>(loadingStr);

    React.useEffect(() => {
        setTimeout(() => {
            setSecrets([
                "secret1",
                "secret2"
            ])
        }, 5_000);
    }, [])

    return secrets;
}