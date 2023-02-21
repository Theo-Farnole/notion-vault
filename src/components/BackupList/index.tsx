import { CardContent, Container, Paper, Typography } from "@mui/material";
import moment from "moment";
import { BackupMetadata } from "../../types/BackupMetadata";

interface Props {
    backupsMetadata: BackupMetadata[]
}

function BackupElement({ backup }: { backup: BackupMetadata }) {
    return <Paper sx={{ display: 'flex', height: 100, padding: "25px" }}>

        <img
            style={{ height: "100%", "aspectRatio": "1/1", objectFit: "cover" }}
            src={backup.workspace.avatarUrl}
            alt="The workspace avatar"
        />

        <CardContent className="d-flex align-items-center  justify-content-between w-100">
            <div>
                <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                    {backup.workspace.name}
                </Typography>

                <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                    {backup.savePath}
                </Typography>
            </div>

            <div>

                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    Last backup was {moment(backup.lastBackupTimestamp).fromNow()}
                </Typography>
            </div>

        </CardContent >
    </Paper >;

}

export default function BackupList({ backupsMetadata }: Props) {


    return <Container sx={{ width: '100%', display: 'flex', flexDirection: "column", gap: 3 }}  >

        {backupsMetadata
            .map(backup => <BackupElement backup={backup} />)}

    </Container>;
}