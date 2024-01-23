import { useEffect, useState } from 'react'
import {
    Box,
    Typography,
    Grid,
    useTheme,
    alpha,
    Chip,
} from '@mui/material'
import CourseCard from './course-card'

import { useCoursesApi } from '../../api/useCoursesApi'

export default function LandingPopularCourses({ handleRegisterOpen } : { handleRegisterOpen: () => void}) {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorData, setErrorData] = useState('');
    const theme = useTheme()
    const [courses, setCourses] = useState<any[]>([]);

    const { getBestCourses } = useCoursesApi();
    
    const handleOpenSnackbar = (error?: string) => {
        setOpenSnackbar(true);
        setErrorData(error || 'There was an error retrieving the courses. Please try later.');
    }

    useEffect(() => {
        getBestCourses().then((response) => {
            if(response.ok) {
                response.json().then((responseData) => {
                    setCourses(responseData);
                }).catch((_error) => {
                    handleOpenSnackbar();
                });
                } else {
                response.json().then((responseData) => {
                    handleOpenSnackbar(responseData.error);
                }).catch((_error) => {
                    handleOpenSnackbar();
                });
                }
        }).catch((_error) => {
            handleOpenSnackbar();
        });
    }, [])


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
