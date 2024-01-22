import { useEffect, useState } from 'react'
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Grid,
    Box,
    useTheme,
    alpha,
    Typography,
} from '@mui/material'
import UserListPagination from './pagination'
import { useResponsive } from '../../hooks/useResponsive'
import RouterLink from '../../routes/components/router-link'
import { useAuth } from '../../hooks/useAuth'
import UsersFilter from '../users-filter/users-filter'
import { useMaterialsApi } from '../../api/useMaterialsApi'

const USERS_PER_PAGE = 18

interface ListProps {
    materialId: string
}

// TODO: CHECK THIS
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

function UserList({ materialId }: Readonly<ListProps>) {
    const { getMaterialPurchasers } = useMaterialsApi()

    const [page, setPage] = useState(1)
    const [materialPurchases, setMaterialPurchases] = useState([] as User[])
    const [error, setError] = useState('')
    const { authUser } = useAuth()

    const [filteredUsers, setFilteredUsers] = useState([] as User[])
    const [userFilter, setUserFilter] = useState({
        name: '',
        surname: '',
        username: '',
        email: '',
        plan: '',
    })

    const handleUserFilterChange = (newFilter: any) => {
        setUserFilter(newFilter)
    }

    useEffect(() => {
        const filtered = materialPurchases.filter((user) => {
            const nameMatch = user.firstName
                .toLowerCase()
                .includes(userFilter.name.toLowerCase())
            const surnameMatch = user.lastName
                .toLowerCase()
                .includes(userFilter.surname.toLowerCase())
            const usernameMatch = user.username
                .toLowerCase()
                .includes(userFilter.username.toLowerCase())
            const emailMatch = user.email
                .toLowerCase()
                .includes(userFilter.email.toLowerCase())
            let planMatch
            if (userFilter.plan === 'all') {
                planMatch = true
            } else {
                planMatch = user.plan
                    .toLowerCase()
                    .includes(userFilter.plan.toLowerCase())
            }
            return (
                nameMatch &&
                surnameMatch &&
                usernameMatch &&
                emailMatch &&
                planMatch
            )
        })

        setFilteredUsers(filtered)
    }, [materialPurchases, userFilter])

    useEffect(() => {
        const getUsersWhoPurchasedMyMaterial = async () => {
            try {
                const response = await getMaterialPurchasers(materialId);
                if (response.ok) {
                    const usersWhoPurchasedMyMaterial = await response.json();
                    setMaterialPurchases(usersWhoPurchasedMyMaterial);
                    setError('');
                } else {
                    const errorResponse = await response.json();
                    if (errorResponse && errorResponse.error) {
                        setError(`${response.status}: ${errorResponse.error}`);
                    } else {
                        setError(`${response.status}: Error fetching material purchasers`);
                    }
                }
            } catch (error) {
                setError('An error occurred while fetching material purchasers');
            }
        }
    
        getUsersWhoPurchasedMyMaterial();
    }, [authUser, materialId, getMaterialPurchasers]);

    const pageCount = Math.ceil(filteredUsers.length / USERS_PER_PAGE)

    const pageUsers = filteredUsers.slice(
        (page - 1) * USERS_PER_PAGE,
        page * USERS_PER_PAGE
    )

    const handleChangePage = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value)
    }

    const isSmall = useResponsive('down', 'md')
    const theme = useTheme()

    return (
        <div>
            {error && (
                <div>
                    <Typography variant="h6" color="error">
                        Error: {error}
                    </Typography>
                </div>
            )}
    
            {!error && (
                <div>
                    <Grid
                        container
                        spacing={2}
                        justifyContent={isSmall ? 'center' : 'flex-start'}
                    >
                        <UsersFilter onFilter={handleUserFilterChange} />
                        {pageUsers.map((user) => (
                            <Grid item xs={isSmall ? 12 : 6} key={user.id}>
                                <List>
                                    <ListItem
                                        sx={{
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            borderRadius: 3,
                                            backgroundColor: alpha(
                                                theme.palette.grey[500],
                                                0.16
                                            ),
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar src={user.photoUrl} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                isSmall ? (
                                                    <Typography noWrap>
                                                        {user.username}
                                                    </Typography>
                                                ) : (
                                                    <Box
                                                        display="flex"
                                                        alignItems="center"
                                                    >
                                                        <Typography
                                                            noWrap
                                                            sx={{ marginRight: 1 }}
                                                        >
                                                            {user.firstName}{' '}
                                                        </Typography>
                                                        <Typography
                                                            noWrap
                                                            sx={{ marginRight: 0.5 }}
                                                        >
                                                            {user.lastName} |{' '}
                                                        </Typography>
                                                        <Typography
                                                            noWrap
                                                            sx={{ marginRight: 1 }}
                                                        >
                                                            {user.username}{' '}
                                                        </Typography>
                                                    </Box>
                                                )
                                            }
                                            secondary={`Plan: ${user.plan} | Email: ${user.email}`}
                                        />
                                    </ListItem>
                                </List>
                            </Grid>
                        ))}
                    </Grid>
                    <Box display="flex" justifyContent="center" mt={4}>
                        <UserListPagination
                            count={pageCount}
                            page={page}
                            onChange={handleChangePage}
                        />
                    </Box>
                </div>
            )}
        </div>
    )
}
    

export default UserList
