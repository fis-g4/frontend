import {
    Box,
    Typography,
    Grid,
    useTheme,
    alpha,
} from '@mui/material'
import CourseCard from './course-card'

// Definición del tipo de datos para los cursos
type Course = {
    instructor: string
    title: string
    description: string
    image: string
    rating: number
    length: string
    videoCount: string
    // Agrega aquí más propiedades si es necesario
}

export default function LandingPopularCourses() {
    const theme = useTheme()

    const courses: Course[] = [
        {
            instructor: 'Pro. Andrew Ng',
            title: 'Cloud Computing Mastery',
            description:
                'Cloud computing is a transformative paradigm in the world of information.',
            image: '/assets/prueba.jpg',
            rating: 4.8,
            length: '15hr 30m',
            videoCount: '60+ Video',
        },
        {
            instructor: 'Pro. Jeff Dean',
            title: 'Matering Data Analysis',
            description:
                'Cloud computing is a transformative paradigm in the world of information.',
            image: 'https://www.isixsigma.com/wp-content/uploads/2018/11/shutterstock_1503919103-scaled.jpg',
            rating: 5.0,
            length: '15hr 30m',
            videoCount: '60+ Video',
        },
        {
            instructor: 'D. Aaron Courville',
            title: 'Public Speaking for Students',
            description:
                'Cloud computing is a transformative paradigm in the world of information.',
            image: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*_j0jMB4y1yc9ZDl_RtvXhw.jpeg',
            rating: 4.8,
            length: '15hr 30m',
            videoCount: '60+ Video',
        },
        {
            instructor: 'Pro. Melanie Mitchell',
            title: 'Programming with Python',
            description:
                'Cloud computing is a transformative paradigm in the world of information.',
            image: 'https://miro.medium.com/v2/resize:fit:1380/format:webp/1*jsgLaIkhgF7SzQS1FWIPug.jpeg',
            rating: 4.9,
            length: '15hr 30m',
            videoCount: '60+ Video',
        },
        {
            instructor: 'D. Daphne Koller',
            title: 'Mastering In Cibersecurity',
            description:
                'Cloud computing is a transformative paradigm in the world of information.',
            image: 'https://digitalhealth.org.au/wp-content/uploads/2022/03/technology-security-concept-safety-digital-protection-system-980x653.jpg',
            rating: 4.8,
            length: '15hr 30m',
            videoCount: '60+ Video',
        },
        {
            instructor: 'Dr. Michael Patel',
            title: 'Cloud Computing Mastery',
            description:
                'Cloud computing is a transformative paradigm in the world of information.',
            image: 'https://www.inesdi.com/sites/default/files/2022-05/4%20tipos%20de%20cloud%20computing.jpg',
            rating: 4.5,
            length: '15hr 30m',
            videoCount: '60+ Video',
        },
        // ... otros cursos
    ]

    return (
        <Box sx={{ marginBottom: '100px' }}>
            <Typography
                textAlign="center"
                mt={4}
                mb={2}
                sx={{
                    color: theme.palette.primary.main,
                    fontFamily: 'Verdana',
                }}
            >
                POPULAR COURSE CATEGORY
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
                Nurturing Tech Talents
            </Typography>
            <Box display="flex" justifyContent="center">
                <Grid
                    container
                    spacing={4}
                    justifyContent="center"
                    maxWidth="60%"
                >
                    {courses.map((course, index) => (
                        <Grid item key={index} width="100%" maxWidth="500px">
                            <CourseCard {...course} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box display="flex" justifyContent="center">
                <Box
                    width="8vw"
                    height="2.5vw"
                    borderRadius="25px 25px 25px 0"
                    bgcolor={theme.palette.primary.main}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    marginTop={5}
                    sx={{
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.8),
                        },
                    }}
                >
                    <Typography
                        sx={{
                            color: theme.palette.common.white,
                            fontWeight: 400,
                            fontSize: '0.9vw',
                            fontFamily: "Verdana",
                        }}
                    >
                        View More
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}
