import React from "react";
import { electronApi } from "../../const";

export function useOnStorageUpdate(onUpdate: () => void): void {

    React.useEffect(() => {
        electronApi.storage.updateEvent.on(onUpdate);

        return () => {
            electronApi.storage.updateEvent.removeListener(onUpdate);
        }
    }, [onUpdate]);
}