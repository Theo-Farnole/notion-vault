import { CardContent, Container, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { defaultAvatarWorkspace } from "../../const";
import { routeNames } from "../../routes";
import { BackupMetadata } from "../../types/BackupMetadata";
import moment from "moment";

interface Props {
    backupsMetadata: BackupMetadata[]
}

function BackupElement({ backup }: { backup: BackupMetadata }) {

    const lastBackupTimestamp = getLastBackupTimestamp(backup);

    return <Link to={routeNames.backup(backup.workspace.id)} style={{ textDecoration: 'none' }}>
        <Paper sx={{ display: 'flex', height: 100, padding: "25px" }}>

            <img
                style={{ height: "100%", "aspectRatio": "1/1", objectFit: "cover" }}
                src={backup.workspace.avatarUrl ?? defaultAvatarWorkspace}
                alt="The workspace avatar"
            />

            <CardContent className="d-flex align-items-center  justify-content-between w-100 overflow-hidden" sx={{ gap: 3 }}>
                <div>
                    <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                        {backup.workspace.name}
                    </Typography>

                    <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                        {backup.savePath}
                    </Typography>
                </div>

                <Typography className="d-inline-block text-end" sx={{ fontSize: 14 }} color="text.secondary" noWrap textOverflow={"ellipsis"}>

                    {
                        lastBackupTimestamp !== undefined ?
                            <>
                                Last backup was {moment(lastBackupTimestamp).fromNow()}
                            </>
                            :
                            "No backups yet"
                    }
                </Typography>


            </CardContent >
        </Paper >
    </Link>
}

export default function BackupList({ backupsMetadata }: Props) {


    return <Container sx={{ width: '100%', display: 'flex', flexDirection: "column", gap: 3 }}  >

        {backupsMetadata
            .map((backup, i) => <BackupElement key={i} backup={backup} />)}

    </Container>;
}

function getLastBackupTimestamp(backup: BackupMetadata) {

    if (backup.backupsLogs.length > 0) {

        return Math.max(...backup.backupsLogs.map(b => b.startTimestamp));
    }
    else {
        return undefined;
    }
}