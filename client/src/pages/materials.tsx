import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Typography } from '@mui/material'
import MaterialsFiles from '../components/materials-files/materials-files'
import TransitionModal from '../components/transition-modal/transition-modal'
import MaterialView from '../components/materials-form/materials-form'
import { Material, materials } from '../_mocks/materials'
import { useAuth } from '../hooks/useAuth'

export default function MaterialsPage() {
    const [material, setMaterial] = useState({} as Material)
    const [userMaterials, setUserMaterials] = useState([] as Material[])

    const [newMaterialOpen, setNewMaterialOpen] = useState(false)
    const [updateMaterialOpen, setUpdateMaterialOpen] = useState(false)
    const handleNewMaterialOpen = () => setNewMaterialOpen(true)
    const handleNewMaterialClose = () => setNewMaterialOpen(false)
    const handleUpdateMaterialOpen = (material: Material) => {
        setMaterial(material)
        setUpdateMaterialOpen(true)
    }
    const handleUpdateMaterialClose = () => setUpdateMaterialOpen(false)

    const { authUser } = useAuth()

    useEffect(() => {
        const getMaterials = async () => {
            const getUserMaterials = materials.filter(
                (material) => material.author === authUser.user?.username
            )
            setUserMaterials(getUserMaterials)
        }
        getMaterials()
    }, [authUser.user?.username])

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
            <MaterialsFiles
                materials={userMaterials}
                setUserMaterials={setUserMaterials}
                handleNewMaterialOpen={handleNewMaterialOpen}
                handleUpdateMaterialOpen={handleUpdateMaterialOpen}
            />
            <TransitionModal
                open={newMaterialOpen}
                handleClose={handleNewMaterialClose}
                sx={{ maxWidth: 500, width: '100%' }}
            >
                <MaterialView operation="create" />
            </TransitionModal>
            <TransitionModal
                open={updateMaterialOpen}
                handleClose={handleUpdateMaterialClose}
                sx={{ maxWidth: 500, width: '100%' }}
            >
                <MaterialView material={material} operation="update" />
            </TransitionModal>
        </>
    )
}
