import React from 'react'
import { useResponsive } from '../../hooks/useResponsive'
import { Box, Grid, Button } from '@mui/material'
import MaterialCard from './material-card'
import { materials } from '../../_mocks/materials'
import { UploadFile } from '@mui/icons-material'

export default function MaterialsFiles({
    handleNewMaterialOpen,
}: Readonly<{
    handleNewMaterialOpen: () => void
}>) {
    const smUp = useResponsive('up', 'sm')

    const responsiveAlignItems = smUp ? 'flex-end' : 'center'

    const handleEdit = () => {
        console.log('Edit material')
    }

    const handleDelete = () => {
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
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}
