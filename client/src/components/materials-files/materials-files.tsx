import React from 'react'
import { useResponsive } from '../../hooks/useResponsive'
import { Box, Grid, Button } from '@mui/material'
import MaterialCard from './material-card'
import { Material } from '../../_mocks/materials'
import { UploadFile } from '@mui/icons-material'

export default function MaterialsFiles({
    materials,
    setUserMaterials,
    handleNewMaterialOpen,
    handleUpdateMaterialOpen,
    handleMaterial,
}: Readonly<{
    materials: Material[]
    setUserMaterials: (materials: Material[]) => void
    handleNewMaterialOpen: () => void
    handleUpdateMaterialOpen: (material: Material) => void
    handleMaterial: (id: string, title: string) => void
}>) {
    const smUp = useResponsive('up', 'sm')

    const responsiveAlignItems = smUp ? 'flex-end' : 'center'

    const handleEdit = (id: string) => {
        const material = materials.find((material) => material.id === id)
        if (!material) return //TODO: REVIEW
        handleUpdateMaterialOpen(material)
        console.log('Edit material')
    }

    const handleDelete = (id: string) => {
        const newMaterials = materials.filter((material) => material.id !== id)
        setUserMaterials(newMaterials)
        console.log('Delete material')
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
                    {materials.map((material, index) => (
                        <Grid item key={index} width="100%" maxWidth="750px">
                            <MaterialCard
                                {...material}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                smUp={smUp}
                                handleMaterial={handleMaterial}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}
