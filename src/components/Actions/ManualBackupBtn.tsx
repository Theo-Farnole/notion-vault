import { Button } from "@mui/material";
import { electronApi } from "../../const";
import { BackupMetadata } from "../../types/BackupMetadata";

interface Props {
    backupMetadata: BackupMetadata;
}

export function ManualBackupBtn({ backupMetadata }: Props) {


    return <>
        <Button
            variant="contained"
            onClick={makeBackup}
        >
            Manual backup
        </Button>
    </>

    async function makeBackup() {

        // open modal

        await electronApi.backup.makeBackup(backupMetadata)

        // close it
    }
}
