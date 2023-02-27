import { Button } from "@mui/material";
import { electronApi } from "../../const";
import { Workspace } from "../../types/Workspace";
import { useOnWorkspaceAuthorization } from "../../hooks/useOnWorkspaceAuthorization";

interface Props {
    onConnect: (workspace: Workspace) => void;
}

export function ConnectWorkspaceBtn({ onConnect }: Props) {

    useOnWorkspaceAuthorization(onConnect);

    return <Button variant="outlined" onClick={connectWorkspace}>
        Connect a workspace
    </Button>

    async function connectWorkspace() {
        window.open(await electronApi.authorization.getAuthorizationUrl());
    }
}

