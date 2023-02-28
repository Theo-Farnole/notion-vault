import { Box, Modal } from "@mui/material";
import React from "react";

export interface CenteredModalProps {
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

export function CenteredModal({ open, onClose, children }: CenteredModalProps) {
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
            {children}
        </Box>
    </Modal >;

}
