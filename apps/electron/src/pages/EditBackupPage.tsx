import { Container, Divider } from "@mui/material";
import { useParams } from "react-router";
import PageTextHeader from "../components/Text/PageTextHeader";
import { useGetSavedBackups } from "../hooks/storage/useGetSavedBackup";
import { BackupMetadata } from "../types/BackupMetadata";
import { loadingStr } from "../types/Loading";
import { useNavigate } from 'react-router';
import { routeNames } from "../routes";
import React from "react";
import { ManualBackupBtn } from "../components/Actions/ManualBackupBtn";
import { DeleteBackupBtn } from "../components/Actions/DeleteBackupBtn";
import { defaultAvatarWorkspace } from "../const";

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
    const navigate = useNavigate();

    return <Container className="d-flex flex-column" sx={{ gap: 3 }}>
        <PageTextHeader
            className="mt-5"
            mainTitle={backupMetadata.workspace.name}
            subTitle='Configure your backup'
            rightImgSrc={backupMetadata.workspace.avatarUrl ?? defaultAvatarWorkspace}
            showBackBtn
        />

        <Divider />

        <ManualBackupBtn backupMetadata={backupMetadata} />
        <DeleteBackupBtn backupMetadata={backupMetadata} onDelete={() => navigate(routeNames.home)} />

        {/* TODO: change path */}

    </Container >;
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
