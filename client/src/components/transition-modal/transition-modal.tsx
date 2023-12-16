import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export default function TransitionsModal({ open, handleClose, children, sx={}, ...other } : { open: boolean, handleClose: ()=>void, children: React.ReactNode, sx?: object }) {
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
            <Box sx={{...style, ...sx}} {...other}>
                {children}
            </Box>
        </Fade>
    </Modal>
  );
}

TransitionsModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    children: PropTypes.node,
    sx: PropTypes.object,
};
