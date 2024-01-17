import { useState } from 'react'
import { TextField, Button, Grid, useTheme, alpha } from '@mui/material'

const MaterialFilter = ({ onFilter }: any) => {
    const [titleFilter, setTitleFilter] = useState('')
    const [lowerPriceFilter, setLowerPriceFilter] = useState(0)
    const [upperPriceFilter, setUpperPriceFilter] = useState(100)

    const handleFilter = () => {
        onFilter({
            title: titleFilter,
            lowerPrice: lowerPriceFilter,
            upperPrice: upperPriceFilter,
        })
    }

    const resetFilter = () => {
        setTitleFilter('')
        setLowerPriceFilter(0)
        setUpperPriceFilter(100)
        onFilter({
            title: '',
            lowerPrice: 0,
            upperPrice: 100,
        })
    }

    const theme = useTheme()

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
                    label="Title Filter"
                    variant="outlined"
                    fullWidth
                    value={titleFilter}
                    onChange={(e) => setTitleFilter(e.target.value)}
                />
            </Grid>
            <Grid item xs={6} md={4}>
                <TextField
                    label="Lower Price Filter"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={lowerPriceFilter}
                    onChange={(e) =>
                        setLowerPriceFilter(parseInt(e.target.value))
                    }
                />
            </Grid>
            <Grid item xs={6} md={4}>
                <TextField
                    label="Upper Price Filter"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={upperPriceFilter}
                    onChange={(e) =>
                        setUpperPriceFilter(parseInt(e.target.value))
                    }
                />
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
                    onClick={resetFilter}
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

export default MaterialFilter
