import React from "react";
import { easeValue } from "../../math/easing";
import { CenteredModalProps } from "./CenteredModal";
import { ProgressionModal } from "./ProgressionModal";

interface Props extends CenteredModalProps {
    easeDurationMs: number;
    forceCompleted?: boolean;
}

export function FakeProgressionModal(props: Props) {

    const { easeDurationMs, forceCompleted } = props;

    const [backupProgression, setBackupProgression] = React.useState(0);
    const [fakeProgressionEase, setFakeProgressionEase] = React.useState<NodeJS.Timer | undefined>(undefined);

    const PROGRESSION_MAX_VALUE = 100;

    React.useEffect(() => {
        if (props.open === true) {
            startEasing();
        }
        else {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.open]);

    React.useEffect(() => {
        if (forceCompleted === true) {
            clearInterval(fakeProgressionEase);
            setBackupProgression(PROGRESSION_MAX_VALUE);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceCompleted])


    return <ProgressionModal
        {...props}
        progression={backupProgression} />

    function reset() {
        clearInterval(fakeProgressionEase);
        setBackupProgression(0);
    }

    function startEasing() {
        setFakeProgressionEase(easeValue(
            (p) => setBackupProgression(p),
            PROGRESSION_MAX_VALUE,
            easeDurationMs));
    }
}