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
import { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import { uploadMaterialValidationSchema } from '../../utils/schemas'
import TransitionSnackbar from '../transition-snackbar/transition-snackbar'
import { useResponsive } from '../../hooks/useResponsive'
import { bgGradient } from '../../theme/css'
import { useTheme } from '@mui/material/styles'
import { CloudUpload } from '@mui/icons-material'
import { Material } from '../../_mocks/materials'
import { useMaterialsApi } from '../../api/useMaterialsApi'

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

interface UpdateMaterialViewProps {
    material?: Material
    operation: 'create' | 'update'
    handleRefresh: () => void
    handleNewMaterialClose?: () => void
    handleUpdateMaterialClose?: () => void
    handleFullyOpenSnackbar: (error: string) => void
}

export default function MaterialView({
    material,
    operation,
    handleRefresh,
    handleNewMaterialClose,
    handleUpdateMaterialClose,
    handleFullyOpenSnackbar,
}: Readonly<UpdateMaterialViewProps>) {
    let fileName: string = ''
    if (material) {
        fileName = material.file?.split('/').pop() ?? ''
    }

    const theme = useTheme()
    const smUp = useResponsive('up', 'sm')

    const { uploadMaterial, updateMaterial } = useMaterialsApi()

    const fileInput = useRef<HTMLInputElement>(null)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [errorData, setErrorData] = useState('')
    const [fileUploaded, setFileUploaded] = useState('')
    const [fileUploadedName, setFileUploadedName] = useState(fileName)
    const responsiveDirection = smUp ? 'row' : 'column'

    const uploadButtonColor = fileUploadedName !== '' ? 'secondary' : 'primary'
    const uploadButtonText =
        fileUploaded !== '' ? fileUploadedName : 'Upload file'

    const updateButtonText =
        fileUploadedName !== '' ? 'Change file' : 'Upload file'

    const formik = useFormik({
        initialValues: {
            title: material?.title ?? '',
            description: material?.description ?? '',
            price: material?.price ?? '',
            currency: material?.currency ?? '',
            file: material?.file ?? '',
            type: material?.type ?? '',
        },
        validationSchema: uploadMaterialValidationSchema,
        onSubmit: (values: any) => {
            let materialValues = {
                title: values.title,
                description: values.description,
                price: values.price,
                currency: values.currency,
                file: values.file,
                type: values.type,
            }
            if (noChanges(materialValues)) {
                setErrorData('You have not made any changes.')
                setOpenSnackbar(true)
            } else {
                if (operation === 'create') {
                    uploadMaterial(
                        materialValues.title,
                        materialValues.description,
                        materialValues.price,
                        materialValues.currency,
                        materialValues.file,
                        materialValues.type
                    )
                        .then((response) => {
                            if (response.ok) {
                                handleNewMaterialClose?.()
                                handleFullyOpenSnackbar(
                                    'Material uploaded successfully.'
                                )
                                handleRefresh()
                            } else {
                                setErrorData('Error uploading material.')
                                setOpenSnackbar(true)
                            }
                        })
                        .catch((error) => {
                            setErrorData('Error uploading material.')
                            setOpenSnackbar(true)
                        })
                } else if (operation === 'update') {
                    if (material?.id === undefined) {
                        setErrorData('Error updating material.')
                        setOpenSnackbar(true)
                        return
                    }
                    updateMaterial(materialValues, material.id)
                        .then((response) => {
                            if (response.ok) {
                                handleUpdateMaterialClose?.()
                                handleFullyOpenSnackbar(
                                    'Material updated successfully.'
                                )
                                handleRefresh()
                            } else {
                                setErrorData('Error updating material.')
                                setOpenSnackbar(true)
                            }
                        })
                        .catch((error) => {
                            setErrorData('Error updating material.')
                            setOpenSnackbar(true)
                        })
                }
            }
        },
        onReset: () => {
            formik.setFieldValue('file', material?.file ?? '')
            setFileUploaded(material?.file ?? '')
            setFileUploadedName(fileName)
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

    function noChanges(materialUpdated: any) {
        return (
            materialUpdated.title === material?.title &&
            materialUpdated.description === material?.description &&
            materialUpdated.price === material?.price &&
            materialUpdated.currency === material?.currency &&
            materialUpdated.type === material?.type &&
            materialUpdated.file === material?.file
        )
    }

    useEffect(() => {
        if (formik.errors.file) {
            formik.setFieldValue('file', '')
            setFileUploaded('')
            setFileUploadedName('')
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
                            {operation === 'create'
                                ? uploadButtonText
                                : updateButtonText}
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
                                setFileUploaded(URL.createObjectURL(newFile))
                                setFileUploadedName(newFile.name)
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
                            ? 'Upload new material'
                            : 'Update material'}
                    </Typography>
                    {renderForm}
                </Card>
            </Stack>
        </Box>
    )
}
