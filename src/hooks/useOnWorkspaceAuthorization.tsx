import React from "react";
import { electronApi } from "../const";
import { Workspace } from "../types/Workspace";

export function useOnWorkspaceAuthorization(callback: (workspace: Workspace) => void) {

    React.useEffect(() => {
        electronApi.authorization.event.on(onAuthorize);

        return () => {
            electronApi.authorization.event.removeListener(onAuthorize);
        };

        function onAuthorize(event: any, workspace: Workspace) {
            callback(workspace);
        }
    }, [callback]);
}
