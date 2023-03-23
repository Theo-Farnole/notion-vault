import { Fab } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import React from "react";
import { BackupMetadata } from "../../types/BackupMetadata";
import { routeNames } from "../../routes";
import { Link } from "react-router-dom";

export default function EditBackupFAB({
    backupToEdit
}: {
    backupToEdit: BackupMetadata
}) {


    return <Link to={routeNames.editBackup(backupToEdit.workspace.id)}>
        <Fab color="primary" aria-label="edit" sx={{ position: "fixed", bottom: "50px", right: "50px" }}>
            <EditIcon />
        </Fab>;
    </Link>
}