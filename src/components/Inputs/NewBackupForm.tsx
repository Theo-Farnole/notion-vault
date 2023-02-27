import { LoadingButton } from '@mui/lab';
import { Alert, AlertTitle, Button, FormControl, Paper } from '@mui/material';
import React from 'react';
import { BackupMetadata } from '../../types/BackupMetadata';
import { Workspace } from '../../types/Workspace';
import { ConnectWorkspaceBtn } from '../Actions/ConnectWorkspaceBtn';
import PathInput from './PathInput';
import RemoveIcon from '@mui/icons-material/RemoveCircle';

interface FormErrors {
    workspaceError?: string;
    pathError?: string;
}

interface NewBackup {
    path: string;
    workspace?: Workspace;
}

interface Props {
    onCreate: (backup: BackupMetadata) => void;
}

export function NewBackupForm({ onCreate }: Props) {

    const [newBackup, setNewBackup] = React.useState<NewBackup>({
        path: "",
    });

    console.log("w", newBackup.workspace);

    const [inputErrors, setInputErrors] = React.useState<FormErrors>({});
    const [isButtonLoading, setIsButtonLoading] = React.useState(false);

    return <>
        <Alert severity="warning">
            <AlertTitle>Backup Time </AlertTitle>
            For the moment, the configuration of the time of the backups is not configurable.<br />
            The backups are done every day at <b>12:00 PM</b>.
        </Alert>

        <FormControl fullWidth className="d-flex flex-column" sx={{ gap: 3 }}>
            {newBackup.workspace !== undefined ?
                <div className='d-flex'>
                    <Paper className="d-flex flex-grow-1 align-items-center" sx={{ height: 75, padding: "15px", gap: 3 }}>
                        <img
                            style={{ height: "100%", "aspectRatio": "1/1", objectFit: "cover" }}
                            src={newBackup.workspace.avatarUrl}
                            alt="avatar of workspace"
                        />
                        <p>{newBackup.workspace.name}</p>

                    </Paper>
                    <Button color="error" endIcon={<RemoveIcon />} onClick={removeWorkspace}>
                        Disconnect
                    </Button>
                </div>
                :
                <ConnectWorkspaceBtn onConnect={(workspace) => setNewBackup({ workspace, ...newBackup })} />
            }

            <PathInput
                error={inputErrors.pathError !== undefined}
                helperText={inputErrors.pathError}
                path={newBackup.path}
                onChange={(path) => setNewBackup({ ...newBackup, path: path })}
            />

            {
                isButtonLoading ?
                    <LoadingButton loading variant="contained">
                        Creating
                    </LoadingButton>
                    :
                    <Button variant="contained" onClick={create}>
                        Create
                    </Button>
            }

        </FormControl>
    </>;

    function removeWorkspace() {
        setNewBackup({
            ...newBackup,
            workspace: undefined
        })
    }


    function create() {
        const errors = detectErrors(newBackup);

        if (errors) {
            console.log(errors);
            setInputErrors(errors)
        }
        else {
            setInputErrors({});
            setIsButtonLoading(true);

            if (!newBackup.workspace) throw new Error("This exception should not happen and should be avoided by detectErrors");

            onCreate({
                savePath: newBackup.path,
                workspace: newBackup.workspace,
                lastBackupTimestamp: -1
            })
        }
    }


}

function detectErrors(backup: NewBackup): FormErrors | undefined {
    const errors: FormErrors = {};

    if (!backup.path) {
        errors.pathError = "Path is required";
    }

    if (!backup.path) {
        errors.workspaceError = "Workspace is required";
    }

    return Object.keys(errors).length > 0 ? errors : undefined;
}
