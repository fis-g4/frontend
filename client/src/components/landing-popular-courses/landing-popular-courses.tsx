import {
    Box,
    Typography,
    Grid,
    useTheme,
    alpha,
} from '@mui/material'
import CourseCard from './course-card'
import { courses } from '../../_mocks/courses'

export default function LandingPopularCourses({ handleRegisterOpen } : { handleRegisterOpen: () => void}) {
    const theme = useTheme()

    return (
        <Box sx={{ marginBottom: '100px' }}>
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
                POPULAR COURSES
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
                Nurturing Tech Talents
            </Typography>
            <Box display="flex" justifyContent="center">
                <Grid
                    container
                    spacing={4}
                    justifyContent="center"
                    maxWidth="75%"
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
                    minWidth={250}
                    height="2.5vw"
                    minHeight={50}
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
                    onClick={() => handleRegisterOpen()}
                >
                    <Typography
                        sx={{
                            color: theme.palette.common.white,
                            fontWeight: 400,
                            fontSize: 'clamp(20px, 0.9vw, 22px)',
                            
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
