import { Container, Divider, Typography } from "@mui/material";
import PageTextHeader from "../components/Text/PageTextHeader";
import { BackupMetadata } from "../types/BackupMetadata";
import { loadingStr } from "../types/Loading";
import React from "react";
import { ManualBackupBtn } from "../components/Actions/ManualBackupBtn";
import { defaultAvatarWorkspace } from "../const";
import { BackupLogList } from "../components/Misc/BackupLogList";
import EditBackupFAB from "../components/Actions/EditBackupFAB";
import { useGetSelectedBackup } from "../hooks/useGetSelectedBackup";

export default function BackupDetailsPage() {


    const backup = useGetSelectedBackup();

    if (backup === loadingStr) {
        // TODO: show skeleton
        return <></>;
    }
    else {
        return <BackupDetailsContent backupMetadata={backup} />
    }
}

function BackupDetailsContent({ backupMetadata }: { backupMetadata: BackupMetadata }) {


    return <Container className="d-flex flex-column mb-5" sx={{ gap: 3 }}>
        <PageTextHeader
            className="mt-5"
            mainTitle={backupMetadata.workspace.name}
            subTitle='Details of your backup'
            rightImgSrc={backupMetadata.workspace.avatarUrl ?? defaultAvatarWorkspace}
            showBackBtn
        />

        <Divider />

        <div className="d-flex flex-column" style={{ gap: 3 }}>
            <ManualBackupBtn backupMetadata={backupMetadata} />

        </div>

        {backupMetadata.backupsLogs.length > 0 &&
            <>
                <Divider />

                <div>
                    <Typography component="h2" variant="h6" noWrap>
                        Latest backups
                    </Typography>
                    <BackupLogList backupsLogs={backupMetadata.backupsLogs} />
                </div>
            </>
        }
        <EditBackupFAB backupToEdit={backupMetadata} />

    </Container >;
}

