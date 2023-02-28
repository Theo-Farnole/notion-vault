import { Button } from "@mui/material";
import React from "react";
import { electronApi } from "../../const";
import { easeValue } from "../../math/easing";
import { BackupMetadata } from "../../types/BackupMetadata";
import { ProgressionModal } from "../Modal/ProgressionModal";

interface Props {
    backupMetadata: BackupMetadata;
}

export function ManualBackupBtn({ backupMetadata }: Props) {

    const [isProgressionModalOpen, setProgressionModal] = React.useState(false);
    const [backupProgression, setBackupProgression] = React.useState(0);
    const [fakeProgressionEase, setFakeProgressionEase] = React.useState<NodeJS.Timer | undefined>(undefined);

    const PROGRESSION_MAX_VALUE = 100;
    const FAKE_PROGRESSION_DURATION = 3_000;

    React.useEffect(() => {
        if (isProgressionModalOpen === false) {
            clearInterval(fakeProgressionEase);
            setBackupProgression(0);
        }
    }, [isProgressionModalOpen, fakeProgressionEase])

    return <>
        <Button
            variant="contained"
            onClick={makeBackup}
        >
            Manual backup
        </Button>

        <ProgressionModal
            onClose={() => setProgressionModal(false)}
            open={isProgressionModalOpen}
            progression={backupProgression}
        >
        </ProgressionModal>
    </>

    async function makeBackup() {

        setProgressionModal(true);

        // start fake progression
        setFakeProgressionEase(easeValue(
            (p) => setBackupProgression(p),
            PROGRESSION_MAX_VALUE,
            FAKE_PROGRESSION_DURATION));

        await electronApi.backup.makeBackup(backupMetadata);

        // make progress bar complete
        clearInterval(fakeProgressionEase);
        setBackupProgression(PROGRESSION_MAX_VALUE);
    }
}

