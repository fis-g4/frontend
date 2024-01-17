import { useState } from 'react'
import { TextField, Button, Grid, MenuItem, useTheme, alpha } from '@mui/material'

const plans = [
    { value: 'all', label: 'All' },
    { value: 'free', label: 'Free' },
    { value: 'premium', label: 'Premium' },
    { value: 'pro', label: 'Pro' },
]

const UsersFilter = ({ onFilter }: any) => {
    const [nameFilter, setNameFilter] = useState('')
    const [surnameFilter, setSurnameFilter] = useState('')
    const [usernameFilter, setUsernameFilter] = useState('')
    const [emailFilter, setEmailFilter] = useState('')
    const [planFilter, setPlanFilter] = useState('')
    const theme = useTheme()

    const handleFilter = () => {
        onFilter({
            name: nameFilter,
            surname: surnameFilter,
            username: usernameFilter,
            email: emailFilter,
            plan: planFilter,
        })
    }

    const handleClear = () => {
        setNameFilter('')
        setSurnameFilter('')
        setUsernameFilter('')
        setEmailFilter('')
        setPlanFilter('')
        onFilter({
            name: '',
            surname: '',
            username: '',
            email: '',
            plan: '',
        })
    }

    return (
        <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{
                marginBottom: '20px',
                marginTop: '20px',
                padding: '20px',
            }}
        >
            <Grid item xs={12} md={4}>
                <TextField
                    label="Name Filter"
                    variant="outlined"
                    fullWidth
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextField
                    label="Surname filter"
                    variant="outlined"
                    fullWidth
                    value={surnameFilter}
                    onChange={(e) => setSurnameFilter(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={3}>
                <TextField
                    label="Username Filter"
                    variant="outlined"
                    fullWidth
                    value={usernameFilter}
                    onChange={(e) => setUsernameFilter(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextField
                    label="Email Filter"
                    variant="outlined"
                    fullWidth
                    value={emailFilter}
                    onChange={(e) => setEmailFilter(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <TextField
                    label="Plan Filter"
                    variant="outlined"
                    fullWidth
                    select
                    value={planFilter}
                    onChange={(e) => setPlanFilter(e.target.value)}
                >
                    {plans.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>

            <Grid item xs={12} md={12} textAlign="center">
            <Button
                    variant="contained"
                    size="large"
                    sx={{
                        bgcolor: alpha(theme.palette.error.light, 0.9),
                        '&:hover': {
                            bgcolor: alpha(theme.palette.error.main, 0.9),
                        },
                        marginRight: 2,
                    }}
                    onClick={handleClear}
                >
                    Clear filter
                </Button>
                <Button
                    variant="contained"
                    size="large"
                    color="success"
                    onClick={handleFilter}
                >
                    Filter
                </Button>
            </Grid>
        </Grid>
    )
}

export default UsersFilter
