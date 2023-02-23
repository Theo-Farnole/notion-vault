import { CardContent, Container, Paper, Typography } from "@mui/material";
import moment from "moment";
import { Link } from "react-router-dom";
import { routeNames } from "../../routes";
import { BackupMetadata } from "../../types/BackupMetadata";

interface Props {
    backupsMetadata: BackupMetadata[]
}

function BackupElement({ backup }: { backup: BackupMetadata }) {

    return <Link to={routeNames.backup(backup.workspace.id)} style={{ textDecoration: 'none' }}>
        <Paper sx={{ display: 'flex', height: 100, padding: "25px" }}>

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
                        {backup.lastBackupTimestamp !== -1 ?
                            "Last backup was " + moment(backup.lastBackupTimestamp).fromNow()
                            :
                            "No backup"
                        }
                    </Typography>
                </div>

            </CardContent >
        </Paper >
    </Link>

}

export default function BackupList({ backupsMetadata }: Props) {


    return <Container sx={{ width: '100%', display: 'flex', flexDirection: "column", gap: 3 }}  >

        {backupsMetadata
            .map(backup => <BackupElement backup={backup} />)}

    </Container>;
}