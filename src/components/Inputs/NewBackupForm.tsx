import { Alert, AlertTitle, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import useGetWorkspaces from '../../hooks/useGetWorkspaces';
import { loadingStr } from '../../types/Loading';
import PathInput from './PathInput';

interface FormErrors {
    workspaceError?: string;
    pathError?: string;
}

export function NewBackupForm() {
    const userWorkspaces = useGetWorkspaces();

    const [selectedWorkspaceID, selectWorkspaceID] = React.useState<string | undefined>(undefined);
    const [backupPath, setBackupPath] = React.useState<string>("");
    const [inputErrors, setInputErrors] = React.useState<FormErrors>({});

    const selectedWorkspace = userWorkspaces !== loadingStr ? userWorkspaces
        .find(w => w.id === selectedWorkspaceID) : undefined;

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
                error={inputErrors.workspaceError !== undefined}
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

            <PathInput
                error={inputErrors.pathError !== undefined}
                helperText={inputErrors.pathError}
                path={backupPath}
                onChange={(path) => setBackupPath(path)}
            />

            <Button variant="contained" onClick={create}>
                Create
            </Button>

        </FormControl>
    </>;

    function create() {
        const errors = detectErrors(backupPath, selectedWorkspaceID);

        if (errors) {
            console.log(errors);
            setInputErrors(errors)
        }
        else {
            setInputErrors({});
            throw "not implemented";
        }
    }


}

function detectErrors(path: string, workspaceId: string | undefined): FormErrors | undefined {
    const errors: FormErrors = {};

    if (!path) {
        errors.pathError = "Path is required";
    }

    if (!workspaceId) {
        errors.workspaceError = "Workspace is required";
    }

    return Object.keys(errors).length > 0 ? errors : undefined;
}
