import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { bgGradient } from '../../theme/css';
import Iconify from '../iconify/iconify';
import Logo from '../logo/logo';
import { useFormik } from 'formik';
import { useAuth } from '../../hooks/useAuth';
import { loginValidationSchema } from '../../utils/schemas';
import { useUsersApi } from '../../api/useUsersApi';
import TransitionSnackbar from '../transition-snackbar/transition-snackbar';

export default function LoginView({ handleLoginClose, handleRegisterOpen } : { handleLoginClose: () => void; handleRegisterOpen: () => void }) {
  const theme = useTheme();

  const { login } = useAuth();
  const { loginUser } = useUsersApi();

  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorData, setErrorData] = useState('');

  const handleGetStarted = () => {
    handleLoginClose();
    handleRegisterOpen();
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  const handleOpenSnackbar = (error?: string) => {
    setOpenSnackbar(true);
    setErrorData(error || 'There was an error logging in. Please try again.');
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      loginUser(values.username, values.password).then((response: any) => {
        if (response.status === 200) {
          response.json().then((responseData: any) => {
            login(responseData.data.user, responseData.data.token);
          }).catch((_error: any) => {
            setErrorData('There was an error logging in. Please try again.');
            setOpenSnackbar(true);
          });
        } else{
          response.json().then((responseData: any) => {
            handleOpenSnackbar(responseData.error);
          }).catch((_error: any) => {
            handleOpenSnackbar();
          });
        }
      }).catch((_error) => {
        handleOpenSnackbar();
      });
    },
  });

  const renderForm = (
    <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
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

          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            onBlur={formik.handleBlur}
            required
           />
           
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
          <Link variant="subtitle2" underline="hover" sx={{ cursor: 'pointer' }}>
            Forgot password?
          </Link>
        </Stack>

        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          disabled={!formik.isValid}
        >Iniciar sesión</Button>
      </form>
    )

  return (
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
            <Typography variant="h4">Sign in with your account</Typography>

            <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
              Don’t have an account?
              <Link variant="subtitle2" sx={{ ml: 0.5, cursor: 'pointer', }} onClick={handleGetStarted}>
                Get started
              </Link>
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button
                fullWidth
                size="large"
                color="inherit"
                variant="outlined"
                sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
              >
                <Iconify icon="eva:google-fill" color="#DF3E30" />
              </Button>

              <Button
                fullWidth
                size="large"
                color="inherit"
                variant="outlined"
                sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
              >
                <Iconify icon="eva:facebook-fill" color="#1877F2" />
              </Button>

              <Button
                fullWidth
                size="large"
                color="inherit"
                variant="outlined"
                sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
              >
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            {renderForm}
          </Card>
        </Stack>     
      </Box>
      <TransitionSnackbar open={openSnackbar} onClose={handleCloseSnackbar} message={errorData} autoHideDuration={6000} />
    </>
  );
}