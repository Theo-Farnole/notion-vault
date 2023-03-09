import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import { BackupLog } from "../../types/BackupMetadata"

interface Props {
    backupsLogs: BackupLog[]
}

export const BackupLogList = ({ backupsLogs }: Props) => {
    return <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Start</TableCell>
                    <TableCell>End</TableCell>
                    <TableCell align="right">Type</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>

                {backupsLogs.map((backupLog) => (
                    <TableRow
                        key={backupLog.startTimestamp}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {backupLog.startTimestamp}
                        </TableCell>
                        <TableCell>{backupLog.endTimestamp}</TableCell>
                        <TableCell align="right">{backupLog.type}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
}