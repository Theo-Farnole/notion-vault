import { DeleteBackupBtn } from "../components/Actions/DeleteBackupBtn";
import { useGetSelectedBackup } from "../hooks/useGetSelectedBackup";
import { routeNames } from "../routes";
import { BackupMetadata } from "../types/BackupMetadata";
import { loadingStr } from "../types/Loading";
import { useNavigate } from 'react-router';
import { defaultAvatarWorkspace } from "../const";
import { Container } from "@mui/material";
import PageTextHeader from "../components/Text/PageTextHeader";

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

    return <Container className="d-flex flex-column mb-5" sx={{ gap: 3 }}>
        <PageTextHeader
            className="mt-5"
            mainTitle={backupMetadata.workspace.name}
            subTitle='Edit your backup'
            rightImgSrc={backupMetadata.workspace.avatarUrl ?? defaultAvatarWorkspace}
            showBackBtn
        />
        <DeleteBackupBtn backupMetadata={backupMetadata} onDelete={() => navigate(routeNames.home)} />
    </Container>
}