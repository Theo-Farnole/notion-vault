import { Container, Divider } from "@mui/material";
import { useParams } from "react-router";
import PageTextHeader from "../components/Text/PageTextHeader";
import { useGetSavedBackups } from "../hooks/useGetSavedBackup";
import { BackupMetadata } from "../types/BackupMetadata";
import { loadingStr } from "../types/Loading";


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

    return <Container className="d-flex flex-column" sx={{ gap: 3 }}>
        <PageTextHeader
            className="mt-5"
            mainTitle={backupMetadata.workspace.name}
            subTitle='Configure your backup'
            rightImgSrc={backupMetadata.workspace.avatarUrl}
            showBackBtn
        />

        <Divider />

        <p className="text-center">
            There is nothing to see here.
        </p>

        {/* TODO: change path */}
        {/* TODO: manual backup button */}
    </Container>
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
