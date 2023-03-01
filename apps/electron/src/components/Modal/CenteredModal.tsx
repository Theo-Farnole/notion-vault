import { Box, Modal, Typography } from "@mui/material";
import React from "react";

export interface CenteredModalProps {
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    title?: string;
    body?: string;
}

export function CenteredModal({ open, onClose, children, title, body }: CenteredModalProps) {
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
            {
                title &&
                <Typography variant="h6" component="h2">
                    {title}
                </Typography>
            }
            {body &&
                <Typography sx={{ mt: 2, mb: 2 }}>
                    {body}
                </Typography>
            }

            {children}
        </Box>
    </Modal >;

}
