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
import { materials } from '../../_mocks/materials'
import { User, users } from '../../_mocks/users'
import UsersFilter from '../users-filter/users-filter'

const USERS_PER_PAGE = 18

interface ListProps {
    materialId: string
}

function UserList({ materialId }: Readonly<ListProps>) {
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
            }else{
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
        const getUserByUsername = (username: string) =>
            users.find((user) => user.username === username)
        const getUsersWhoPurchasedMyMaterial = async () => {
            const myMaterial = materials.find(
                (material) =>
                    material.id === materialId &&
                    material.author === authUser.user?.username
            )

            if (myMaterial) {
                const usersWhoPurchasedMyMaterial = await Promise.all(
                    myMaterial.purchasers.map(async (username) => {
                        const user = getUserByUsername(username)
                        return user
                    })
                )
                setMaterialPurchases(
                    usersWhoPurchasedMyMaterial.filter(
                        (user) => user !== undefined
                    ) as User[]
                )
                setError('')
            } else {
                setError('You have not purchased any material yet')
            }
        }

        getUsersWhoPurchasedMyMaterial()
    }, [authUser, materialId])

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

    if (error) {
        return <div>{error}</div>
    }
    return (
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
                            {/*TODO: MODIFICAR LINK */}
                            <ListItem
                                component={RouterLink}
                                href="/me"
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
                                {' '}
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
    )
}

export default UserList
