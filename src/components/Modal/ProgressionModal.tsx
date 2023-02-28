import { Box, Button } from "@mui/material";
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

        <Box className="mt-3 d-flex flex-column" sx={{ gap: 3 }}>

            <LinearProgress variant="determinate" value={progression} />

            {progression >= maxProgression &&
                <>
                    <Button className="w-100" onClick={() => onClose()}>
                        Done
                    </Button>
                </>
            }
        </Box>
    </CenteredModal>;
}