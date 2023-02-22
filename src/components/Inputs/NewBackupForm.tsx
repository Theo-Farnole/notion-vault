import { Alert, AlertTitle, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import useGetWorkspaces from '../../hooks/useGetWorkspaces';
import { loadingStr } from '../../types/Loading';
import PathInput from './PathInput';

export function NewBackupForm() {
    const userWorkspaces = useGetWorkspaces();

    const [selectedWorkspaceID, selectWorkspaceID] = React.useState<string | undefined>(undefined);
    const [backupPath, setBackupPath] = React.useState<string | undefined>(undefined);

    const selectedWorkspace = userWorkspaces !== loadingStr ? userWorkspaces
        .find(w => w.id === selectedWorkspaceID) : undefined;

    // TODO: save location
    const SELECT_WORKSPACE_ID = "select-workspace-select";
    const SELECT_WORKSPACE_ID_LABEL = SELECT_WORKSPACE_ID + "-label";

    return <>
        <Alert severity="warning">
            <AlertTitle>Backup Time </AlertTitle>
            For the moment, the configuration of the time of the backups is not configurable.<br />
            The backups are done every day at <b>12:00 PM</b>.
        </Alert>

        <FormControl fullWidth className="d-flex flex-column" sx={{ gap: 3 }}>
            <InputLabel id={SELECT_WORKSPACE_ID_LABEL}>Workspace</InputLabel>
            <Select
                labelId={SELECT_WORKSPACE_ID_LABEL}
                id={SELECT_WORKSPACE_ID}
                value={selectedWorkspace?.name}
                label="Workspace"
                onChange={(e) => selectWorkspaceID(e.target.value)}
            >
                {userWorkspaces !== loadingStr && userWorkspaces.map(w => {
                    return <MenuItem value={w.id} key={w.id}>
                        {w.name}
                    </MenuItem>;
                })}

            </Select>

            <PathInput path={backupPath ?? ""} onChange={(path) => setBackupPath(path)} />

            <Button variant="contained">
                Create
            </Button>

        </FormControl>
    </>;
}
