import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Pagination, Typography } from '@mui/material'
import MaterialsFiles from '../components/materials-files/materials-files'
import TransitionModal from '../components/transition-modal/transition-modal'
import MaterialView from '../components/materials-form/materials-form'
import { Material, materials } from '../_mocks/materials'
import { useAuth } from '../hooks/useAuth'
import usePagination from '../components/pagintion/pagination'
import MaterialFilter from '../components/materials-filter/materials-filter'

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

    const [filteredMaterials, setFilteredMaterials] = useState([] as Material[])
    const [filter, setFilter] = useState({
        title: '',
        lowerPrice: 0,
        upperPrice: 100,
    })

    const handleFilterChange = (newFilter: any) => {
        setFilter(newFilter)
    }

    useEffect(() => {
        const filtered = userMaterials.filter((material) => {
            const titleMatch = material.title
                .toLowerCase()
                .includes(filter.title.toLowerCase())
            if (filter.lowerPrice && !filter.upperPrice) {
                const priceMatch = material.price >= filter.lowerPrice
                return titleMatch && priceMatch
            } else if (!filter.lowerPrice && filter.upperPrice) {
                const priceMatch = material.price <= filter.upperPrice
                return titleMatch && priceMatch
            } else if (!filter.lowerPrice && !filter.upperPrice) {
                return titleMatch
            } else {
                const priceMatch =
                    material.price >= filter.lowerPrice &&
                    material.price <= filter.upperPrice
                return titleMatch && priceMatch
            }
        })

        setFilteredMaterials(filtered)
    }, [userMaterials, filter])

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

    const [page, setPage] = useState(1)
    const PER_PAGE = 5

    const count = Math.ceil(filteredMaterials.length / PER_PAGE)
    const _DATA = usePagination(filteredMaterials, PER_PAGE)

    const handleChange = (e: any, p: number) => {
        setPage(p)
        _DATA.jump(p)
    }

    return (
        <>
            <Helmet>
                <title> Materials | FIS G4 </title>
            </Helmet>

            <Typography
                variant="h3"
                sx={{ marginLeft: '25px', marginTop: '10px' }}
            >
                {' '}
                My materials{' '}
            </Typography>
            <MaterialFilter onFilter={handleFilterChange} />
            <MaterialsFiles
                materials={_DATA.currentData()}
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
            {userMaterials.length > 0 && (
                <Pagination
                    count={count}
                    size="large"
                    page={page}
                    variant="outlined"
                    shape="rounded"
                    onChange={handleChange}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '20px',
                    }}
                />
            )}
        </>
    )
}
