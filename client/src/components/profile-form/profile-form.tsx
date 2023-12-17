import { styled } from '@mui/material/styles';
import { Typography, Badge, Stack, Box, Button, TextField, alpha, InputAdornment, IconButton } from "@mui/material"
import background from '../../static/icons/edit.svg'
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useRef, useState } from 'react';
import Iconify from '../iconify/iconify';
import { useFormik } from 'formik';
import { updateUserValidationSchema } from '../../utils/schemas';
import TransitionSnackbar from '../transition-snackbar/transition-snackbar';

export default function ProfileForm() {
    const { authUser } = useAuth();
    
    const fileInput = useRef<HTMLInputElement>(null);

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const [profilePic, setProfilePic] = useState(authUser.user?.photoURL || 'assets/images/broken-avatar.svg');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorData, setErrorData] = useState('');

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          backgroundColor: `${theme.palette.primary.dark}`,
          color: `${theme.palette.primary.dark}`,
          boxShadow: `0 0 0 5px ${theme.palette.background.paper}`,
          width: '35px',
          height: '35px',
          borderRadius: '50%',
          backgroundImage: `url(${background})`,
          backgroundSize: '20px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          cursor: 'pointer',
          '&:hover::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '2px solid currentColor',
            content: '""',
          },
        },
        '@keyframes ripple': {
          '0%': {
            transform: 'scale(.8)',
            opacity: 1,
          },
          '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
          },
        },
    }));

    const formik = useFormik({
        initialValues: {
          firstName: authUser.user?.firstName,
          lastName: authUser.user?.lastName,
          email: authUser.user?.email,
          photoURL: authUser.user?.photoURL,
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        },
        validationSchema: updateUserValidationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
        onReset: () => {
            formik.setFieldValue('photoURL', authUser.user?.photoURL);
            setProfilePic(authUser.user?.photoURL || 'assets/images/broken-avatar.svg');
            if (fileInput.current) {
                fileInput.current.value = '';
            }
        }
    });

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }

    const handleOpenSnackbar = (error: string) => {
        setOpenSnackbar(true);
        setErrorData(error);
    }

    useEffect(()=>{
        if (formik.errors.photoURL){
            formik.setFieldValue('photoURL', authUser.user?.photoURL);
            setProfilePic(authUser.user?.photoURL || 'assets/images/broken-avatar.svg');
            if (fileInput.current) {
                fileInput.current.value = '';
            }
            handleOpenSnackbar(formik.errors.photoURL);
        }
    }, [formik.errors.photoURL])

    return (
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset} style={{ justifySelf: 'center', alignSelf: 'center', width: '100%', paddingLeft: '10%', paddingRight: '10%', marginTop: '50px' }}>
            <Stack direction="column" spacing={5} alignItems="center" justifyContent="center" width='100%'>
                <Stack direction="row" spacing={5} alignSelf='flex-start'>
                    <label htmlFor="contained-button-file">
                        <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                            <Box component="img" src={profilePic} width="200px" borderRadius={50}/>
                        </StyledBadge>
                    </label>
                    <input 
                        type="file"
                        id="contained-button-file"
                        name='photoURL'
                        style={{ display: 'none' }}
                        accept='image/*'
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]){
                                console.log('Entra')
                                let file = e.target.files[0];
                                let blob = file.slice(0, file.size, file.type);
                                let newFile = new File([blob], file.name, {type: file.type});
                                setProfilePic(URL.createObjectURL(newFile));
                                formik.setFieldValue('photoURL', newFile);
                            }
                          }}
                        ref={fileInput}
                        hidden
                    />
                    <TransitionSnackbar open={openSnackbar} onClose={handleCloseSnackbar} message={errorData} autoHideDuration={6000} />
                    <Stack direction="column" spacing={1} justifyContent="center" alignItems="center">
                        <Box
                            sx={{
                                my: 3,
                                mx: 2.5,
                                py: 2,
                                px: 2.5,
                                display: 'flex',
                                borderRadius: 1.5,
                                alignItems: 'center',
                                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                            }}
                            >
                            <Box sx={{ ml: 2 }}>
                                <Typography variant="h4">{authUser.user?.firstName} {authUser.user?.lastName}</Typography>
                                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                                    @{authUser.user?.username}
                                </Typography>
                                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                                    {authUser.user?.plan} account | {authUser.user?.coins} coins
                                </Typography>
                            </Box>
                        </Box>
                    </Stack>
                </Stack>
                <Stack direction="row" spacing={5} width='100%'>
                    <TextField
                        name='firstName'
                        label="First Name"
                        fullWidth
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                        onBlur={formik.handleBlur}
                        required
                    />
                    <TextField
                        name='lastName'
                        label="Last Name"
                        fullWidth
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                        onBlur={formik.handleBlur}
                        required
                    />
                </Stack>
                <Stack direction="row" spacing={5} width='100%'>
                    <TextField
                        name='email'
                        label="Email"
                        fullWidth
                        type='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        onBlur={formik.handleBlur}
                        required
                    />
                    <TextField
                        name="currentPassword"
                        label="Current password"
                        fullWidth
                        type={showCurrentPassword ? 'text' : 'password'}
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton onClick={() => setShowCurrentPassword(!showCurrentPassword)} edge="end">
                                <Iconify icon={showCurrentPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                            </IconButton>
                            </InputAdornment>
                        ),
                        }}
                        onChange={formik.handleChange}
                        value={formik.values.currentPassword}
                        error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                        helperText={formik.touched.currentPassword && formik.errors.currentPassword}
                        onBlur={formik.handleBlur}
                    />
                </Stack>
                <Stack direction="row" spacing={5} width='100%'>
                    <TextField
                        name="newPassword"
                        label="New password"
                        fullWidth
                        type={showNewPassword ? 'text' : 'password'}
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                                <Iconify icon={showNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                            </IconButton>
                            </InputAdornment>
                        ),
                        }}
                        onChange={formik.handleChange}
                        value={formik.values.newPassword}
                        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                        helperText={formik.touched.newPassword && formik.errors.newPassword}
                        onBlur={formik.handleBlur}
                    />
                    <TextField
                        name="confirmNewPassword"
                        label="Confirm new password"
                        fullWidth
                        type={showConfirmNewPassword ? 'text' : 'password'}
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)} edge="end">
                                <Iconify icon={showConfirmNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                            </IconButton>
                            </InputAdornment>
                        ),
                        }}
                        onChange={formik.handleChange}
                        value={formik.values.confirmNewPassword}
                        error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
                        helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
                        onBlur={formik.handleBlur}
                    />
                </Stack>
                <Stack direction="row" spacing={5} width='100%' >
                    <Button 
                        fullWidth
                        size="large"
                        color="error"
                        variant="contained"
                        type="reset"
                    > Clear changes </Button>
                    <Button 
                        fullWidth
                        size="large"
                        color="primary"
                        variant="contained"
                        type="submit"
                        disabled={!formik.isValid}
                    > Save changes </Button>
                </Stack>
            </Stack>
        </form>
    );
}