import { Button, Container, Divider } from "@mui/material";
import { useParams } from "react-router";
import PageTextHeader from "../components/Text/PageTextHeader";
import { useGetSavedBackups } from "../hooks/storage/useGetSavedBackup";
import { BackupMetadata } from "../types/BackupMetadata";
import { loadingStr } from "../types/Loading";
import DeleteIcon from '@mui/icons-material/Delete';
import { electronApi } from "../const";
import { useNavigate } from 'react-router';
import { routeNames } from "../routes";
import React from "react";
import { ConfirmBackupDeleteModal } from "../components/Modal/ConfirmBackupDeleteModal";

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

function EditBackupContent({ backupMetadata }: { backupMetadata: BackupMetadata }) {

    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

    const navigate = useNavigate();

    return <Container className="d-flex flex-column" sx={{ gap: 3 }}>
        <PageTextHeader
            className="mt-5"
            mainTitle={backupMetadata.workspace.name}
            subTitle='Configure your backup'
            rightImgSrc={backupMetadata.workspace.avatarUrl}
            showBackBtn
        />

        <Divider />

        <Button
            variant="contained"
            onClick={() => electronApi.backup.makeBackup(backupMetadata)}
        >
            Manual backup
        </Button>

        <Button color="error" variant="contained" startIcon={<DeleteIcon />} onClick={() => setOpenDeleteModal(true)}>
            DELETE
        </Button>

        {/* TODO: change path */}
        {/* TODO: manual backup button */}

        <ConfirmBackupDeleteModal
            open={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
            onConfirm={() => deleteBackup()}
        />


    </Container >;

    async function deleteBackup() {
        await electronApi.storage.backups.remove(backupMetadata);

        navigate(routeNames.home);
    }
}

function useGetSelectedBackup() {
    const { id } = useParams();

    if (!id) throw new Error("Missing id in route params");

    const backups = useGetSavedBackups();

    if (backups === loadingStr) {
        return loadingStr;
    }
    else {
        const foundBackup = backups.find(b => b.workspace.id === id);

        if (!foundBackup) throw new Error("Cannot find database with id " + id);

        return foundBackup;
    }
}
