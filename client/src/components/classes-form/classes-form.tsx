import {
    Stack,
    Button,
    TextField,
    Box,
    alpha,
    Card,
    Typography,
} 
from '@mui/material'
import { useAuth } from '../../hooks/useAuth'
import { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import { uploadMaterialValidationSchema } from '../../utils/schemas'
import TransitionSnackbar from '../transition-snackbar/transition-snackbar'
import { useResponsive } from '../../hooks/useResponsive'
import { bgGradient } from '../../theme/css'
import { useTheme } from '@mui/material/styles'
import { CloudUpload } from '@mui/icons-material'
import { Class } from '../../_mocks/classes'

interface UpdateClassViewProps {
    _class?: Class
    operation: 'create' | 'update'
}

export default function ClassView({
    _class,
    operation,
}: Readonly<UpdateClassViewProps>) {
    let fileName: string = ''
    if (_class) {
        fileName = _class.file?.split('/').pop() ?? ''
    }

    const theme = useTheme()
    const { authUser } = useAuth()
    const smUp = useResponsive('up', 'sm')

    const fileInput = useRef<HTMLInputElement>(null)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [errorData, setErrorData] = useState('')
    const [fileUploaded, setFileUploaded] = useState(fileName)
    const responsiveDirection = smUp ? 'row' : 'column'

    const uploadButtonColor = fileUploaded !== '' ? 'secondary' : 'primary'
    const uploadButtonText = fileUploaded !== '' ? fileUploaded : 'Upload file'

    const formik = useFormik({
        initialValues: {
            title: _class?.title ?? '',
            order: _class?.order ?? '',
            description: _class?.description ?? '',
            creator: authUser.user?.username,
            course: _class?.course ?? '',
            file: _class?.file ?? '',
        },
        validationSchema: uploadMaterialValidationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2))
        },
        onReset: () => {
            formik.setFieldValue('file', _class?.file ?? '')
            setFileUploaded(fileName)
            if (fileInput.current) {
                fileInput.current.value = ''
            }
        },
    })

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false)
    }

    const handleOpenSnackbar = (error: string) => {
        setOpenSnackbar(true)
        setErrorData(error)
    }

    useEffect(() => {
        if (formik.errors.file) {
            formik.setFieldValue('file', '')
            setFileUploaded('')
            if (fileInput.current) {
                fileInput.current.value = ''
            }
            handleOpenSnackbar(formik.errors.file)
        }
    }, [formik.errors.file])

    const renderForm = (
        <form
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
            style={{
                justifySelf: 'center',
                alignSelf: 'center',
                width: '100%',
                paddingLeft: '2%',
                paddingRight: '2%',
            }}
        >
            <Stack
                direction="column"
                spacing={4}
                alignItems="center"
                justifyContent="center"
                width="100%"
            >
                <Stack direction={responsiveDirection} spacing={5} width="100%">
                    <TextField
                        name="title"
                        label="Title"
                        fullWidth
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        error={
                            formik.touched.title && Boolean(formik.errors.title)
                        }
                        helperText={formik.touched.title && formik.errors.title}
                        onBlur={formik.handleBlur}
                        required
                    />
                </Stack>
                <Stack direction={responsiveDirection} spacing={5} width="100%">
                    <TextField
                        name="description"
                        label="Description"
                        fullWidth
                        multiline
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        error={
                            formik.touched.description &&
                            Boolean(formik.errors.description)
                        }
                        helperText={
                            formik.touched.description &&
                            formik.errors.description
                        }
                        onBlur={formik.handleBlur}
                        required
                    />
                </Stack>
                <Stack direction={responsiveDirection} spacing={5} width="100%">
                    <TextField
                        name="order"
                        label="Order"
                        fullWidth
                        onChange={formik.handleChange}
                        value={formik.values.order}
                        error={
                            formik.touched.order && Boolean(formik.errors.order)
                        }
                        helperText={formik.touched.order && formik.errors.order}
                        onBlur={formik.handleBlur}
                        required
                    />

                </Stack>
                <Stack
                    direction={responsiveDirection}
                    spacing={5}
                    width="100%"
                    justifyContent="center"
                >
                    <label
                        htmlFor="contained-button-file"
                        style={{ alignSelf: 'center' }}
                    >
                        <Button
                            variant="contained"
                            color={uploadButtonColor}
                            component="span"
                            startIcon={<CloudUpload />}
                        >
                            {uploadButtonText}
                        </Button>
                    </label>
                    <input
                        type="file"
                        id="contained-button-file"
                        name="file"
                        style={{ display: 'none' }}
                        accept="application/mp4"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                let file = e.target.files[0]
                                let blob = file.slice(0, file.size, file.type)
                                let newFile = new File([blob], file.name, {
                                    type: file.type,
                                })
                                setFileUploaded(newFile.name)
                                formik.setFieldValue('file', newFile)
                            }
                        }}
                        ref={fileInput}
                        hidden
                    />
                    <TransitionSnackbar
                        open={openSnackbar}
                        onClose={handleCloseSnackbar}
                        message={errorData}
                        autoHideDuration={6000}
                    />
                </Stack>
                <Stack direction={responsiveDirection} spacing={5} width="100%">
                    <Button
                        fullWidth
                        size="large"
                        color="error"
                        variant="contained"
                        type="reset"
                    >
                        {' '}
                        Clear changes{' '}
                    </Button>
                    <Button
                        fullWidth
                        size="large"
                        color="success"
                        variant="contained"
                        type="submit"
                        disabled={!formik.isValid}
                    >
                        {operation === 'create'
                            ? 'Upload material'
                            : 'Update material'}
                    </Button>
                </Stack>
            </Stack>
        </form>
    )

    return (
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
            <Stack
                alignItems="center"
                justifyContent="center"
                sx={{ height: 1 }}
            >
                <Card
                    sx={{
                        p: 5,
                        width: 1,
                        maxWidth: 500,
                    }}
                >
                    <Typography variant="h4" mb={3}>
                        {operation === 'create'
                            ? 'Upload new class'
                            : 'Update class'}
                    </Typography>
                    {renderForm}
                </Card>
            </Stack>
        </Box>
    )
}
