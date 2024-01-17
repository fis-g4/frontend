import {
    Box,
    Typography,
    Grid,
    useTheme,
} from '@mui/material'
import CategoryCard from './category-card'
import { categories } from '../../_mocks/categories'

export default function CategorySection() {
    const theme = useTheme()

    return (
        <Box sx={{marginBottom: "100px"}}>
            <Typography
                textAlign="center"
                mt={4}
                mb={2}
                sx={{
                    color: theme.palette.primary.main,
                    fontSize: 'clamp(20px, 1vw, 25px)',
                    fontFamily: 'Verdana',
                }}
            >
                TRENDING CATEGORIES
            </Typography>
            <Typography
                textAlign="center"
                mt={2}
                mb={4}
                sx={{
                    color: theme.palette.grey[700],
                    fontSize: 'clamp(25px, 2vw, 40px)',
                    fontWeight: 900,
                    fontFamily: 'Verdana',
                }}
            >
                Our Leading Categories
            </Typography>
            <Box
                display="flex"
                justifyContent="center"
            >
                <Grid
                    container
                    spacing={4}
                    justifyContent="center"
                    maxWidth="75%"
                >
                    {categories.map((category, index) => (
                        <Grid item key={index} width="100%" maxWidth="500px">
                            <CategoryCard {...category} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}
