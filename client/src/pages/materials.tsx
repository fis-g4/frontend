import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Box, IconButton, Pagination, Typography } from '@mui/material'
import MaterialsFiles from '../components/materials-files/materials-files'
import TransitionModal from '../components/transition-modal/transition-modal'
import MaterialView from '../components/materials-form/materials-form'
import { Material, materials } from '../_mocks/materials'
import { useAuth } from '../hooks/useAuth'
import usePagination from '../components/pagination/pagination'
import MaterialFilter from '../components/materials-filter/materials-filter'
import UserList from '../components/users-list/user-list'
import CloseIcon from '@mui/icons-material/Close'
import { useMaterialsApi } from '../api/useMaterialsApi'
import LoadingView from '../sections/loading/loading'
import TransitionSnackbar from '../components/transition-snackbar/transition-snackbar'
import UsersFilter from '../components/users-filter/users-filter'

interface User {
    id: string
    photoUrl: string
    firstName: string
    lastName: string
    username: string
    email: string
    plan: planEnum
    coins: number
}

type planEnum = 'BASIC' | 'ADVANCED' | 'PRO'

export default function MaterialsPage() {
    const { getMaterialsMe } = useMaterialsApi()
    const [refreshKey, setRefreshKey] = useState(true)
    const [loading, setLoading] = useState(true)

    const [material, setMaterial] = useState({} as Material)
    const [userMaterials, setUserMaterials] = useState([] as Material[])

    const [materialDetails, setMaterialDetails] = useState(['', ''] as string[])

    const handleMaterial = (id: string, title: string) =>
        setMaterialDetails([id, title])

    const [error, setError] = useState('')
    const [errorData, setErrorData] = useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false)

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false)
    }

    const handleOpenSnackbar = (errorData: string) => {
        setErrorData(errorData)
        setOpenSnackbar(true)
    }

    const { authUser } = useAuth()

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
    const [materialFilter, setMaterialFilter] = useState({
        title: '',
        lowerPrice: 0,
        upperPrice: 100,
    })

    const handleMaterialFilterChange = (newFilter: any) => {
        setMaterialFilter(newFilter)
        setRefreshKey(true)
    }

    useEffect(() => {
        const getMyMaterials = async () => {
            try {
                const response = await getMaterialsMe()
                if (response.ok) {
                    const myMaterials = await response.json()
                    setUserMaterials(myMaterials)
                    setError('')
                } else {
                    setError('Error fetching your materials')
                }
            } catch (error) {
                setError('An error occurred while fetching your materials')
            } finally {
                setLoading(false)
            }
        }
        if (authUser.user && refreshKey) {
            getMyMaterials()
            setRefreshKey(false)
        }
    }, [authUser.user, getMaterialsMe, refreshKey])

    useEffect(() => {
        const filtered = userMaterials.filter((material) => {
            const titleMatch = material.title
                .toLowerCase()
                .includes(materialFilter.title.toLowerCase())
            if (materialFilter.lowerPrice && !materialFilter.upperPrice) {
                const priceMatch = material.price >= materialFilter.lowerPrice
                return titleMatch && priceMatch
            } else if (
                !materialFilter.lowerPrice &&
                materialFilter.upperPrice
            ) {
                const priceMatch = material.price <= materialFilter.upperPrice
                return titleMatch && priceMatch
            } else if (
                !materialFilter.lowerPrice &&
                !materialFilter.upperPrice
            ) {
                return titleMatch
            } else {
                const priceMatch =
                    material.price >= materialFilter.lowerPrice &&
                    material.price <= materialFilter.upperPrice
                return titleMatch && priceMatch
            }
        })

        setFilteredMaterials(filtered)
    }, [userMaterials, materialFilter])

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

    const handleRefresh = () => {
        setRefreshKey(true)
    }

    if (loading) {
        return <LoadingView />
    }

    return (
        <>
            <Helmet>
                <title> Materials | FIS G4 </title>
            </Helmet>
            <Box>
                {materialDetails[0] === '' ? (
                    <Typography
                        variant="h3"
                        sx={{ marginLeft: '25px', marginTop: '10px' }}
                    >
                        My Materials {loading && 'Loading...'}
                    </Typography>
                ) : (
                    <Box display={'flex'} flexDirection={'column'}>
                        <Box display={'flex'} flexDirection={'row'}>
                            <Typography
                                variant="h3"
                                sx={{ marginLeft: '25px', marginTop: '10px' }}
                            >
                                {materialDetails[1]}
                            </Typography>
                        </Box>
                        <Box display={'flex'} flexDirection={'row'}>
                            <Typography
                                variant="h5"
                                sx={{ marginLeft: '25px', marginTop: '10px' }}
                            >
                                Users that have access to this material
                            </Typography>

                            <IconButton
                                sx={{
                                    marginLeft: 'auto',
                                }}
                                onClick={() => handleMaterial('', '')}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                )}
            </Box>
            {materialDetails[0] === '' ? (
                <>
                    <MaterialFilter onFilter={handleMaterialFilterChange} />
                    <MaterialsFiles
                        materials={_DATA.currentData()}
                        setUserMaterials={setUserMaterials}
                        handleNewMaterialOpen={handleNewMaterialOpen}
                        handleUpdateMaterialOpen={handleUpdateMaterialOpen}
                        handleMaterial={handleMaterial}
                        handleRefresh={handleRefresh}
                    />
                    <TransitionModal
                        open={newMaterialOpen}
                        handleClose={handleNewMaterialClose}
                        sx={{ maxWidth: 500, width: '100%' }}
                    >
                        <MaterialView
                            operation="create"
                            handleRefresh={handleRefresh}
                            handleNewMaterialClose={handleNewMaterialClose}
                            handleFullyOpenSnackbar={handleOpenSnackbar}
                        />
                    </TransitionModal>
                    <TransitionModal
                        open={updateMaterialOpen}
                        handleClose={handleUpdateMaterialClose}
                        sx={{ maxWidth: 500, width: '100%' }}
                    >
                        <MaterialView
                            material={material}
                            operation="update"
                            handleRefresh={handleRefresh}
                            handleUpdateMaterialClose={
                                handleUpdateMaterialClose
                            }
                            handleFullyOpenSnackbar={handleOpenSnackbar}
                        />
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
            ) : (
                <UserList materialId={materialDetails[0]} />
            )}
            <TransitionSnackbar
                open={openSnackbar}
                onClose={handleCloseSnackbar}
                message={errorData}
                autoHideDuration={6000}
            />
        </>
    )
}
