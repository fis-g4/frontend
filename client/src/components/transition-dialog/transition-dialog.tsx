import { Fragment, forwardRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import PropTypes, { InferProps } from 'prop-types';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface TransitionDialogInterface {
    open: boolean;
    handleClose: () => void;
    title?: string;
    children?: React.ReactNode | string;
    action?: React.ReactNode;
    formik?: any;
}

export default function TransitionDialog({ open, handleClose, title, children, action, formik, ...other } : InferProps<TransitionDialogInterface>) {
  const elements = (
    <>
      <DialogContent>
          {children ? typeof children === 'string' ? (<DialogContentText id="alert-dialog-slide-description">{children}</DialogContentText>) : children : <></>}
      </DialogContent>
      {action && (<DialogActions>
          {action}
      </DialogActions>)}
    </>
  )

  return (
    <Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        {...other}
      >
        {title && (<DialogTitle>{title}</DialogTitle>)}
        {formik !== undefined ? <form onSubmit={formik.handleSubmit}>{elements}</form>:elements}
      </Dialog>
    </Fragment>
  );
};

TransitionDialog.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.node || PropTypes.string,
    action: PropTypes.node,
};
