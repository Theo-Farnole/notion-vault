import { Button } from "@mui/material";
import React from "react";
import { CenteredModal, CenteredModalProps } from "./CenteredModal";

interface Props extends CenteredModalProps {
    onConfirm: () => void;
}

export function ConfirmBackupDeleteModal(props: Props) {

    const {
        onClose, onConfirm
    } = props;

    return <CenteredModal
        title={"Confirm backup deletion ?"}
        body={"This operation cannot be reverted."}
        {...props}
    >

        <div className="d-flex justify-content-between">

            <Button onClick={() => onClose()}>Cancel</Button>
            <Button color="error" onClick={() => { onClose(); onConfirm() }}>Delete</Button>
        </div>
    </CenteredModal>
}
