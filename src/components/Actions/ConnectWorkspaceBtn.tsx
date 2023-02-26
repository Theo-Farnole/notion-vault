import React from "react";
import { Button } from "react-bootstrap";
import { electronApi } from "../../const";
import { Workspace } from "../../types/Workspace";

interface Props {
    onConnect: (workspace: Workspace) => void;
}

export function ConnectWorkspaceBtn({ onConnect }: Props) {

    useAuthorizeWorkspace(onConnect);

    return <Button onClick={connectWorkspace}>
        Connect a workspace
    </Button>

    async function connectWorkspace() {
        window.open(await electronApi.authorization.getAuthorizationUrl());
        // electronApi.authorization.openPage();
    }
}

function useAuthorizeWorkspace(onAuthorize: (workspace: Workspace) => void) {

    React.useEffect(() => {
        electronApi.authorization.event.on(onAuthorize);

        return () => {
            electronApi.authorization.event.removeListener(onAuthorize);
        }
    }, [onAuthorize]);
}