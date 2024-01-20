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

type planEnum = 'Free' | 'Pro' | 'Premium'

export default function MaterialsPage() {
    const [material, setMaterial] = useState({} as Material)
    const [userMaterials, setUserMaterials] = useState([] as Material[])

    const [materialDetails, setMaterialDetails] = useState(['', ''] as string[])

    const handleMaterial = (id: string, title: string) =>
        setMaterialDetails([id, title])

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
    }

    useEffect(() => {
        const filtered = userMaterials.filter((material) => {
            const titleMatch = material.title
                .toLowerCase()
                .includes(materialFilter.title.toLowerCase())
            if (materialFilter.lowerPrice && !materialFilter.upperPrice) {
                const priceMatch = material.price >= materialFilter.lowerPrice
                return titleMatch && priceMatch
            } else if (!materialFilter.lowerPrice && materialFilter.upperPrice) {
                const priceMatch = material.price <= materialFilter.upperPrice
                return titleMatch && priceMatch
            } else if (!materialFilter.lowerPrice && !materialFilter.upperPrice) {
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
            <Box>
                {materialDetails[0] === '' ? (
                    <Typography
                        variant="h3"
                        sx={{ marginLeft: '25px', marginTop: '10px' }}
                    >
                        My Materials
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
            ) : (
                <UserList materialId={materialDetails[0]} />
            )}
        </>
    )
}
