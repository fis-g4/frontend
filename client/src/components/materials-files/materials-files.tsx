import { useResponsive } from '../../hooks/useResponsive'
import { Box, Grid, Button, Typography } from '@mui/material'
import MaterialCard from './material-card'
import { Material } from '../../_mocks/materials'
import { UploadFile } from '@mui/icons-material'
import { useMaterialsApi } from '../../api/useMaterialsApi'
import { useState } from 'react'

export default function MaterialsFiles({
    materials,
    setUserMaterials,
    handleNewMaterialOpen,
    handleUpdateMaterialOpen,
    handleMaterial,
    handleRefresh,
}: Readonly<{
    materials: Material[]
    setUserMaterials: (materials: Material[]) => void
    handleNewMaterialOpen: () => void
    handleUpdateMaterialOpen: (material: Material) => void
    handleMaterial: (id: string, title: string) => void
    handleRefresh: () => void
}>) {
    const smUp = useResponsive('up', 'sm')

    const responsiveAlignItems = smUp ? 'flex-end' : 'center'
    const { deleteMaterial } = useMaterialsApi()
    const [errorData, setErrorData] = useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false)

    const handleEdit = (id: string) => {
        const material = materials.find((material) => material.id === id)
        if (!material) return //TODO: REVIEW
        handleUpdateMaterialOpen(material)
    }

    const handleDelete = (id: string) => {
        deleteMaterial(id)
            .then((response) => {
                if (response.ok) {
                    setErrorData('Material deleted successfully.')
                    setOpenSnackbar(true)
                    handleRefresh()
                } else {
                    setErrorData('Error deleting material.')
                    setOpenSnackbar(true)
                }
            })
            .catch((error) => {
                setErrorData('Error deleting material.')
                setOpenSnackbar(true)
            })
    }

    return (
        <Box mt={5} mb={2}>
            <Box display="flex" justifyContent="center">
                <Grid
                    container
                    spacing={4}
                    justifyContent="center"
                    maxWidth="75%"
                >
                    <Grid
                        item
                        width="100%"
                        maxWidth="750px"
                        sx={{
                            display: 'flex',
                            justifyContent: responsiveAlignItems,
                            alignContent: 'center',
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<UploadFile />}
                            onClick={handleNewMaterialOpen}
                        >
                            Upload new material
                        </Button>
                    </Grid>
                    {materials.length === 0 ? (
                        <Grid
                            item
                            container
                            justifyContent="center"
                            alignItems="center"
                            width="100%"
                            maxWidth="750px"
                        >
                            <Typography variant="h3" align="center">
                                No materials found
                            </Typography>
                        </Grid>
                    ) : (
                        materials.map((material, index) => (
                            <Grid
                                item
                                key={index}
                                width="100%"
                                maxWidth="750px"
                            >
                                <MaterialCard
                                    {...material}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    smUp={smUp}
                                    handleMaterial={handleMaterial}
                                />
                            </Grid>
                        ))
                    )}
                </Grid>
            </Box>
        </Box>
    )
}
