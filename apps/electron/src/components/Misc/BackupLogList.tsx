import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import React from "react"
import { BackupLog } from "../../types/BackupMetadata"

interface Props {
    backupsLogs: BackupLog[]
}

export const BackupLogList = ({ backupsLogs }: Props) => {

    const sortedLogs = React.useMemo(() => backupsLogs.sort(b => -b.startTimestamp), [backupsLogs])

    return <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Start</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell align="right">Type</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>

                {sortedLogs
                    .map((backupLog) => (
                        <TableRow
                            key={backupLog.startTimestamp}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {dateToHumanReadable(backupLog.startTimestamp)}
                            </TableCell>
                            <TableCell>
                                {durationToHumanReadable(backupLog.endTimestamp - backupLog.startTimestamp)} s
                            </TableCell>
                            <TableCell align="right">{backupLog.type}</TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    </TableContainer>

    function dateToHumanReadable(timestamp: number): string {
        const date = new Date(timestamp);

        return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    }

    function durationToHumanReadable(durationTimestamp: number) {
        return (durationTimestamp / 1000).toFixed(0);
    }
}