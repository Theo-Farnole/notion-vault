import { Button } from "@mui/material";
import React from "react";
import { electronApi } from "../../const";
import { BackupMetadata } from "../../types/BackupMetadata";
import { FakeProgressionModal } from "../Modal/FakeProgressionModal";

interface Props {
    backupMetadata: BackupMetadata;
}

export function ManualBackupBtn({ backupMetadata }: Props) {

    const [isProgressionModalOpen, setProgressionModal] = React.useState(false);
    const [isBackupCompleted, setBackupCompleted] = React.useState(false);
    const FAKE_PROGRESSION_DURATION = 60_000;

    React.useEffect(() => {
        if (isProgressionModalOpen === false) {
            setBackupCompleted(false);
        }
    }, [isProgressionModalOpen])

    return <>
        <Button
            variant="contained"
            onClick={makeBackup}
        >
            Manual backup
        </Button>

        <FakeProgressionModal
            onClose={() => setProgressionModal(false)}
            open={isProgressionModalOpen}
            easeDurationMs={FAKE_PROGRESSION_DURATION}
            forceCompleted={isBackupCompleted}
        />
    </>

    async function makeBackup() {

        setProgressionModal(true);

        await electronApi.backup.makeBackup(backupMetadata);

        setBackupCompleted(true);
    }
}

