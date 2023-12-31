import { Box, Fab } from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useState } from "react";
import TransitionModal from "../transition-modal/transition-modal";
import MessageNewForm from "../../message-new-form/message-new-form";

export default function MessageNew() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <>
            <Box sx={{ position: 'absolute', bottom: 0, right: 0, margin: '25px' }}>
                <Fab color="primary" aria-label="create-message" onClick={handleOpen}>
                    <BorderColorIcon />
                </Fab>
            </Box>
            <TransitionModal open={open} handleClose={handleClose} sx={{ maxWidth: 500, width: '100%' }}>
                <MessageNewForm />
            </TransitionModal>
        </>
    )
}