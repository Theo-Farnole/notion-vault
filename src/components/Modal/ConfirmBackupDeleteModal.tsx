import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";

export function ConfirmBackupDeleteModal({
    open, onClose, onConfirm
}: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}) {
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return <Modal
        open={open}
        onClose={() => { onClose(); }}
    >
        <Box sx={style}>
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
        </Box>
    </Modal >;

}
