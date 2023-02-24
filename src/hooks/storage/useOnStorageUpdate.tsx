import React from "react";
import { electronApi } from "../../const";

/**
 * WARNING
 * For the moment it doesn't work because function cannot be sent with invoke method.
 * I push a commit to save my progress, and I am going to fix it right now.
 */
export function useOnStorageUpdate(onUpdate: () => void): void {

    React.useEffect(() => {
        electronApi.storage.updateEvent.on(onUpdate);

        return () => {
            electronApi.storage.updateEvent.removeListener(onUpdate);
        }
    });
}