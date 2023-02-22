import { Container, Divider, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import PageTextHeader from '../components/Text/PageTextHeader';
import useGetWorkspaces from '../hooks/useGetWorkspaces';
import { loadingStr } from '../types/Loading';

export default function NewBackupPage() {
    return <Container className="d-flex flex-column" sx={{ gap: 3 }}>
        <PageTextHeader
            className="mt-5"
            mainTitle='New backup'
            subTitle='Configure your backup'
        />

        <Divider />

        <NewBackupForm />
    </Container>
}

function NewBackupForm() {
    const userWorkspaces = useGetWorkspaces();

    const [selectedWorkspaceID, selectWorkspaceID] = React.useState<string | undefined>(undefined);

    const selectedWorkspace = userWorkspaces !== loadingStr ? userWorkspaces
        .find(w => w.id === selectedWorkspaceID) : undefined;

    // TODO: save location
    // TODO: info daily backup

    const SELECT_WORKSPACE_ID = "select-workspace-select";
    const SELECT_WORKSPACE_ID_LABEL = SELECT_WORKSPACE_ID + "-label";

    return <FormControl fullWidth>
        <InputLabel id={SELECT_WORKSPACE_ID_LABEL}>Age</InputLabel>
        <Select
            labelId={SELECT_WORKSPACE_ID_LABEL}
            id={SELECT_WORKSPACE_ID}
            value={selectedWorkspace?.name}
            label="Workspace"
            onChange={(e) => selectWorkspaceID(e.target.value)}
        >
            {
                userWorkspaces !== loadingStr && userWorkspaces.map(w => {
                    return <MenuItem value={w.id}>
                        {w.name}
                    </MenuItem>
                })
            }

        </Select>
    </FormControl>


}