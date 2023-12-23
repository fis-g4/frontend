import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Typography } from '@mui/material'
import MaterialsFiles from '../components/materials-files/materials-files'
import TransitionModal from '../components/transition-modal/transition-modal'
import NewMaterialView from '../components/materials-form/materials-form'

export default function MaterialsPage() {
    const [newMaterialOpen, setNewMaterialOpen] = useState(false)
    const handleNewMaterialOpen = () => setNewMaterialOpen(true)
    const handleNewMaterialClose = () => setNewMaterialOpen(false)

    return (
        <>
            <Helmet>
                <title> Courses | FIS G4 </title>
            </Helmet>

            <Typography
                variant="h3"
                sx={{ marginLeft: '25px', marginTop: '10px' }}
            >
                {' '}
                My materials{' '}
            </Typography>
            <MaterialsFiles handleNewMaterialOpen={handleNewMaterialOpen} />
            <TransitionModal
                open={newMaterialOpen}
                handleClose={handleNewMaterialClose}
                sx={{ maxWidth: 500, width: '100%' }}
            >
                <NewMaterialView />
            </TransitionModal>
        </>
    )
}
