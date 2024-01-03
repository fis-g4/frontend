import { Button, Stack, TextField, Typography } from "@mui/material";
import TransitionDialog from "../transition-dialog/transition-dialog";
import { useState } from "react";
import { useFormik } from "formik";
import { useAuth } from "../../hooks/useAuth";
import { useUsersApi } from "../../api/useUsersApi";
import TransitionSnackbar from "../transition-snackbar/transition-snackbar";
import { deleteAccount } from "../../utils/schemas";

export default function SettingsAccount() {
    const { authUser, logout } = useAuth();
    const { deleteUser } = useUsersApi();

    const [openDialog, setOpenDialog] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [error, setError] = useState('');

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCancelDialog = () => setOpenDialog(false);
    const handleCloseSnackbar = () => setOpenSnackbar(false);

    const formik = useFormik({
        initialValues: {
            username: '',
        },
        validationSchema: deleteAccount(authUser.user?.username || ''),
        onSubmit: (_values) => {
            deleteUser().then((response) => {
                if(response.ok) {
                    handleCancelDialog();
                    logout();
                } else {
                    response.json().then((responseData) => {
                        setError(responseData.error);
                        setOpenSnackbar(true);
                    }).catch((_error) => {
                        setError('There was an error deleting your account. Please try later.');
                        setOpenSnackbar(true);
                    });
                }
            }).catch((_error) => {
                setError('There was an error deleting your account. Please try later.');
                setOpenSnackbar(true);
            });
        }
    });

    const actionDialog = (
        <>
            <Button onClick={handleCancelDialog}>Cancel</Button>
            <Button
                type="submit"
                disabled={!formik.isValid}
            >Delete</Button>
        </>
    );

    const children = (
        <Stack spacing={2} sx={{ width: 500 }} direction="column" alignContent="center">
            <Typography variant="body1" sx={{ marginLeft: '25px', marginTop: '10px' }}> Are you sure you want to delete your account? </Typography>
            <Typography variant="body1" sx={{ marginLeft: '25px', marginTop: '10px' }}> This action cannot be undone. </Typography>
            <TextField
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                label="Enter your username"
                placeholder={authUser.user?.username || undefined}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
            />
        </Stack>
    );

    return(
        <>
            <Stack spacing={2} sx={{ marginLeft: '25px', marginTop: '50px' }} direction="column" alignContent="center">
                <Typography variant="h6" sx={{ marginLeft: '25px', marginTop: '10px' }}> Delete your account </Typography>
                <Typography variant="body1" sx={{ marginLeft: '25px', marginTop: '10px' }}> If you delete your account, you will lose all your data. This action cannot be undone. </Typography>
                <Button variant="outlined" color="error" sx={{ marginLeft: '25px', marginTop: '10px', maxWidth: "200px" }} onClick={handleOpenDialog}> Delete your account </Button>
            </Stack>
            <TransitionDialog 
                open={openDialog}
                handleClose={handleCancelDialog}
                title='Delete your account'
                children={children}
                action={actionDialog}
                formik={formik}
            />
            <TransitionSnackbar open={openSnackbar} handleClose={handleCloseSnackbar} message={error} />
        </>
    )
}