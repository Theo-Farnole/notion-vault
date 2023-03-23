import { DeleteBackupBtn } from "../components/Actions/DeleteBackupBtn";
import { useGetSelectedBackup } from "../hooks/useGetSelectedBackup";
import { routeNames } from "../routes";
import { BackupMetadata } from "../types/BackupMetadata";
import { loadingStr } from "../types/Loading";
import { useNavigate } from 'react-router';
import { defaultAvatarWorkspace, electronApi } from "../const";
import { Button, Container, Divider } from "@mui/material";
import PageTextHeader from "../components/Text/PageTextHeader";
import React from "react";
import PathInput from "../components/Inputs/PathInput";
import SaveBtnIcon from '@mui/icons-material/Save';

export default function EditBackupPage() {


    const backup = useGetSelectedBackup();

    if (backup === loadingStr) {
        // TODO: show skeleton
        return <></>;
    }
    else {
        return <EditBackupContent backupMetadata={backup} />
    }
}

function EditBackupContent({
    backupMetadata
}: { backupMetadata: BackupMetadata }) {
    const navigate = useNavigate();

    const [path, setPath] = React.useState(backupMetadata.savePath);

    React.useEffect(() => {
        setPath(backupMetadata.savePath);
    }, [backupMetadata]);

    return <Container className="d-flex flex-column mb-5" sx={{ gap: 3 }}>
        <PageTextHeader
            className="mt-5"
            mainTitle={backupMetadata.workspace.name}
            subTitle='Edit your backup'
            rightImgSrc={backupMetadata.workspace.avatarUrl ?? defaultAvatarWorkspace}
            showBackBtn
        />

        <Divider />

        <PathInput
            path={path}
            onChange={(p) => setPath(p)}
        />

        <div className="d-flex flex-column" style={{ gap: 3 }}>
            <Button variant="contained" startIcon={<SaveBtnIcon />} disabled={path === backupMetadata.savePath}
                onClick={save}>
                Save
            </Button>

            <DeleteBackupBtn backupMetadata={backupMetadata} onDelete={() => navigate(routeNames.home)} />
        </div>
    </Container >

    function save() {
        const newBackup = {
            ...backupMetadata,
            savePath: path
        };

        electronApi.storage.backups.replace(backupMetadata, newBackup);
    }
}