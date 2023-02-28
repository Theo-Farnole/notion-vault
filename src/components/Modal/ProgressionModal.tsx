import { Button } from "@mui/material";
import { CenteredModal, CenteredModalProps } from "./CenteredModal";
import LinearProgress from '@mui/material/LinearProgress';

interface Props extends CenteredModalProps {
    progression: number;
}

export function ProgressionModal(props: Props) {
    const maxProgression = 100;
    const {
        progression,
        onClose
    } = props;

    console.log(progression);

    return <CenteredModal
        title={"Backup progression"}
        {...props}>

        <LinearProgress variant="determinate" value={progression} />

        {progression >= maxProgression &&
            <>
                <Button onClick={() => onClose()}>
                    Ok
                </Button>
            </>
        }
    </CenteredModal>;
}