import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import moment from "moment";
import { BackupMetadata } from "../../types/BackupMetadata";

interface Props {
    backupsMetadata: BackupMetadata[]
}

export default function BackupList({ backupsMetadata }: Props) {
    return <>
        {
            backupsMetadata.map(backup => {
                return <Card sx={{ display: 'flex' }} >
                    <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        image={backup.workspace.avatarUrl}
                        alt="The workspace avatar"
                    />

                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                            {backup.workspace.name}
                        </Typography>

                        <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                            {backup.savePath}
                        </Typography>

                        <Typography sx={{ fontSize: 14 }} color="text.secondary">
                            Last backup was {moment(backup.lastBackupTimestamp).fromNow()}
                        </Typography>

                    </CardContent>
                </Card>;
            })
        }
    </>
}