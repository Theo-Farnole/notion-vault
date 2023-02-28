import { Button } from "@mui/material";
import { electronApi } from "../../const";
import { BackupMetadata } from "../../types/BackupMetadata";
import { ConfirmBackupDeleteModal } from "../Modal/ConfirmBackupDeleteModal";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";

interface Props {
    backupMetadata: BackupMetadata;
    onDelete?: () => void;
}

export function DeleteBackupBtn({ backupMetadata, onDelete }: Props) {
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

    return <>
        <Button color="error" variant="contained" startIcon={<DeleteIcon />} onClick={() => setOpenDeleteModal(true)}>
            DELETE
        </Button>

        <ConfirmBackupDeleteModal
            open={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
            onConfirm={() => deleteBackup()}
        />
    </>

    async function deleteBackup() {
        await electronApi.storage.backups.remove(backupMetadata);

        if (onDelete) {
            onDelete();
        }
    }
}