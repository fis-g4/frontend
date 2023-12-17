import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import PropTypes, { InferProps } from 'prop-types';
import { forwardRef } from 'react';

type TransitionModalProps = {
    open: boolean,
    handleClose: ()=>void,
    children: React.ReactNode,
    sx?: object,
};

const TransitionModal = forwardRef(({ open, handleClose, children, sx={}, ...other } : InferProps<TransitionModalProps>, ref) => {
  
  const basicStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  return (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
            backdrop: {
                timeout: 500,
            },
        }}
        >
        <Fade in={open}>
            <Box sx={{...basicStyle, ...sx}} ref={ref} {...other}>
                {children}
            </Box>
        </Fade>
    </Modal>
  );
});

TransitionModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    children: PropTypes.node,
    sx: PropTypes.object,
};

export default TransitionModal;