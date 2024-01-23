import { useEffect, useState } from 'react'
import {
    Box,
    Typography,
    Grid,
    useTheme,
} from '@mui/material'
import CategoryCard from './category-card'

import { useCoursesApi } from '../../api/useCoursesApi'

export default function CategorySection() {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorData, setErrorData] = useState('');
    const theme = useTheme()

    const [categories, setCategories] = useState<any[]>([]);

    const { getCategories } = useCoursesApi();
    
    const handleOpenSnackbar = (error?: string) => {
        setOpenSnackbar(true);
        setErrorData(error || 'There was an error retrieving the courses. Please try later.');
    }

    useEffect(() => {
        getCategories().then((response) => {
            if(response.ok) {
                response.json().then((responseData) => {
                    setCategories(responseData);
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
                    {Object.keys(categories).map((category:string, index:number) => (
                        <Grid item key={index} width="100%" maxWidth="500px">
                            <CategoryCard title={category} coursesCount={Object.values(categories)[index]} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}
