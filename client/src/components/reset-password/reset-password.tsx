import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from '../../theme/css';
import Logo from '../logo/logo';
import { useFormik } from 'formik';
import { useUsersApi } from '../../api/useUsersApi';
import TransitionSnackbar from '../transition-snackbar/transition-snackbar';
import { Link } from '@mui/material';
import { resetPasswordValidationSchema } from '../../utils/schemas';

export default function ResetPasswordView({ handleResetPasswordClose, handleLoginOpen } : { handleResetPasswordClose: () => void, handleLoginOpen: () => void }) {
    const theme = useTheme();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorData, setErrorData] = useState('');

    const { resetPassword } = useUsersApi();

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }

    const handleReturnLogin = () => {
        handleResetPasswordClose();
        handleLoginOpen();
    }

    const formik = useFormik({
        initialValues: {
            username: '',
        },
        validationSchema: resetPasswordValidationSchema,
        onSubmit: (values) => {
            const params = new URLSearchParams({ username: values.username });
            resetPassword(params).then((response: any) => {
                if(response.ok) {
                    handleResetPasswordClose();
                } else {
                    response.json().then((responseData: any) => {
                        setErrorData(responseData.error);
                        setOpenSnackbar(true);
                    }).catch((_error: any) => {
                        setErrorData('There was an error resetting your password. Please try later.');
                        setOpenSnackbar(true);
                    });
                }
            }).catch((_error: any) => {
                setErrorData('There was an error resetting your password. Please try later.');
                setOpenSnackbar(true);
            });
        }
    });
    
    const renderForm = (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2} direction="column">
                <TextField
                    name="username"
                    label="Username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                    onBlur={formik.handleBlur}
                    required 
                />
                <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="inherit"
                    disabled={!formik.isValid}
                >
                    Reset password
                </Button>
                <Box textAlign='center'>
                    <Link variant="subtitle2" underline="hover" sx={{ cursor: 'pointer' }} onClick={handleReturnLogin}>
                        {"<- Return to login"}
                    </Link>
                </Box>
            </Stack>
      </form>
    )

  return(    
    <>
        <Box
        sx={{
            ...bgGradient({
            color: alpha(theme.palette.background.default, 0.9),
            imgUrl: '/assets/backgrounds/overlay_4.jpg',
            }),
            height: 1,
            background: 'transparent !important',
        }}
        >
        <Logo
            sx={{
            position: 'fixed',
            top: { xs: 16, md: 24 },
            left: { xs: 16, md: 24 },
            }}
        />

        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
            <Card
            sx={{
                p: 5,
                width: 1,
                maxWidth: 420,
            }}
            >
                <Stack direction="column" spacing={3}>
                    <Typography variant="h4">
                        Forgot your password?
                    </Typography>
                    <Typography variant="body2">
                        Please enter the username associated with your account and we will email you a link with a new password.
                    </Typography>

                    {renderForm}
                </Stack>
            </Card>
        </Stack>     
        </Box>
        <TransitionSnackbar open={openSnackbar} onClose={handleCloseSnackbar} message={errorData} autoHideDuration={6000} />
    </>
  )
}
