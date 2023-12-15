import {
    Box,
    Typography,
    Grid,
    useTheme,
} from '@mui/material'
import MobileIcon from '@mui/icons-material/Smartphone' // Ejemplo de íconos, reemplaza con los adecuados
import DataIcon from '@mui/icons-material/BarChart'
import AiIcon from '@mui/icons-material/Adb'
import SoftwareIcon from '@mui/icons-material/Code'
import NetworkIcon from '@mui/icons-material/DeviceHub'
import SecurityIcon from '@mui/icons-material/Security'
import CategoryCard from './category-card'

// Definición de la estructura de datos de la categoría
interface Category {
    title: string
    coursesCount: number
    Icon: typeof MobileIcon // Utiliza el tipo de tus íconos aquí
}

export default function CategorySection() {
    const theme = useTheme()

    // Datos de ejemplo para las categorías, reemplaza con tus datos reales
    const categories: Category[] = [
        {
            title: 'Mobile App Development',
            coursesCount: 242,
            Icon: MobileIcon,
        },
        {
            title: 'Data Science & Analytics',
            coursesCount: 242,
            Icon: DataIcon,
        },
        {
            title: 'AI & Machine Learning',
            coursesCount: 242,
            Icon: AiIcon,
        },
        {
            title: 'Software Engineering',
            coursesCount: 242,
            Icon: SoftwareIcon,
        },
        {
            title: 'Network Administration',
            coursesCount: 242,
            Icon: NetworkIcon,
        },
        {
            title: 'Cybersecurity Essentials',
            coursesCount: 242,
            Icon: SecurityIcon,
        },
    ]

    return (
        <Box sx={{marginBottom: "100px"}}>
            <Typography
                textAlign="center"
                mt={4}
                mb={2}
                sx={{
                    color: theme.palette.primary.main,
                    fontFamily: 'Verdana',
                }}
            >
                TRENDING COURSE CATEGORY
            </Typography>
            <Typography
                textAlign="center"
                mt={2}
                mb={4}
                sx={{
                    color: theme.palette.grey[700],
                    fontSize: '2vw',
                    fontWeight: 900,
                    fontFamily: 'Verdana',
                }}
            >
                Our Leading Category
            </Typography>
            <Box
                display="flex"
                justifyContent="center"
            >
                <Grid
                    container
                    spacing={4}
                    justifyContent="center"
                    maxWidth="60%"
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
