import {
    Stack,
    Button,
    TextField,
    Box,
    alpha,
    Card,
    Typography,
    MenuItem,
} from '@mui/material'
import { useAuth } from '../../hooks/useAuth'
import { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import { uploadMaterialValidationSchema } from '../../utils/schemas'
import TransitionSnackbar from '../transition-snackbar/transition-snackbar'
import { useResponsive } from '../../hooks/useResponsive'
import { bgGradient } from '../../theme/css'
import { useTheme } from '@mui/material/styles'
import { CloudUpload } from '@mui/icons-material'

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
]

const fileTypes = [
    {
        value: 'book',
        label: 'Book',
    },
    {
        value: 'article',
        label: 'Article',
    },
    {
        value: 'presentation',
        label: 'Presentation',
    },
    {
        value: 'exercises',
        label: 'Exercises',
    },
]

export default function NewMaterialView() {
    const theme = useTheme()
    const { authUser } = useAuth()
    const smUp = useResponsive('up', 'sm')

    const fileInput = useRef<HTMLInputElement>(null)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [errorData, setErrorData] = useState('')
    const [fileUploaded, setFileUploaded] = useState('')
    const responsiveDirection = smUp ? 'row' : 'column'

    const uploadButtonColor = fileUploaded !== '' ? 'secondary' : 'primary'
    const uploadButtonText = fileUploaded !== '' ? fileUploaded : 'Upload file'

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: 0,
            currency: '',
            author: authUser.user?.username,
            file: '',
            type: '',
        },
        validationSchema: uploadMaterialValidationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2))
        },
        onReset: () => {
            formik.setFieldValue('file', '')
            setFileUploaded('')
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
                        type="number"
                        name="price"
                        label="Price"
                        fullWidth
                        onChange={formik.handleChange}
                        value={formik.values.price}
                        error={
                            formik.touched.price && Boolean(formik.errors.price)
                        }
                        helperText={formik.touched.price && formik.errors.price}
                        onBlur={formik.handleBlur}
                        required
                    />
                    <TextField
                        select
                        name="currency"
                        label="Currency"
                        defaultValue="EUR"
                        fullWidth
                        onChange={formik.handleChange}
                        value={formik.values.currency}
                        error={
                            formik.touched.currency &&
                            Boolean(formik.errors.currency)
                        }
                        helperText={
                            formik.touched.currency && formik.errors.currency
                        }
                        onBlur={formik.handleBlur}
                        required
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Stack>
                <Stack direction={responsiveDirection} spacing={5} width="100%">
                    <TextField
                        select
                        name="type"
                        label="Type"
                        defaultValue="presentation"
                        fullWidth
                        onChange={formik.handleChange}
                        value={formik.values.type}
                        error={
                            formik.touched.type && Boolean(formik.errors.type)
                        }
                        helperText={formik.touched.type && formik.errors.type}
                        onBlur={formik.handleBlur}
                        required
                    >
                        {fileTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
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
                        accept="application/pdf"
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
                        {' '}
                        Upload material{' '}
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
                        Upload new material
                    </Typography>
                    {renderForm}
                </Card>
            </Stack>
        </Box>
    )
}
