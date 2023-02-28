import { Button, Typography } from "@mui/material";
import React from "react";
import { CenteredModal, CenteredModalProps } from "./CenteredModal";

interface Props extends CenteredModalProps {
    onConfirm: () => void;
}

export function ConfirmBackupDeleteModal(props: Props) {

    const {
        onClose, onConfirm
    } = props;

    return <CenteredModal {...props}>
        <Typography variant="h6" component="h2">
            Confirm backup deletion ?
        </Typography>
        <Typography sx={{ mt: 2, mb: 2 }}>
            This operation cannot be reverted.
        </Typography>

        <div className="d-flex justify-content-between">

            <Button onClick={() => onClose()}>Cancel</Button>
            <Button color="error" onClick={() => { onClose(); onConfirm() }}>Delete</Button>
        </div>
    </CenteredModal>
}
