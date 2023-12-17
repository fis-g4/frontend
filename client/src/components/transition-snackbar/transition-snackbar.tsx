import { ComponentProps, Fragment, ReactNode, forwardRef } from 'react'
import { IconButton, Snackbar } from '@mui/material'
import Slide from '@mui/material/Slide'
import CloseIcon from '@mui/icons-material/Close';
import PropTypes, { InferProps } from 'prop-types'

type TransitionSnackbarProps = {
    open: boolean
    onClose: () => void
    message: string
    direction?: 'left' | 'right' | 'up' | 'down' | undefined
    action?: ReactNode
    [x: string]: any
}

const TransitionSnackbar = forwardRef(({open, onClose, message, direction='left', ...other}: InferProps<TransitionSnackbarProps>, ref) => {

    function TransitionLeft(props: ComponentProps<typeof Slide>) {
        return <Slide {...props} direction="left" />
    }
    function TransitionRight(props: ComponentProps<typeof Slide>) {
        return <Slide {...props} direction="right" />
    }
    function TransitionUp(props: ComponentProps<typeof Slide>) {
        return <Slide {...props} direction="up" />
    }
    function TransitionDown(props: ComponentProps<typeof Slide>) {
        return <Slide {...props} direction="down" />
    }

    const TransitionComponent = (direction: string|undefined) => {
        switch (direction) {
            case 'left':
                return TransitionLeft
            case 'right':
                return TransitionRight
            case 'up':
                return TransitionUp
            case 'down':
                return TransitionDown
            default:
                return undefined
        }
    }

    const defaultAction = (
        <Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={onClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </Fragment>
    );

    return (
        <Snackbar
            open={open}
            onClose={onClose}
            TransitionComponent={TransitionComponent(direction)}
            message={message}
            action={defaultAction}
            ref={ref}
            {...other}
        />
    )
});

TransitionSnackbar.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    message: PropTypes.string,
    direction: PropTypes.oneOf(['left', 'right', 'up', 'down', undefined]),
    action: PropTypes.node,
};

export default TransitionSnackbar