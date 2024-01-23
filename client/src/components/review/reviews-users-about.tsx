import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import TransitionSnackbar from '../transition-snackbar/transition-snackbar';
import { Review, useReviewsApi } from '../../api/useReviewsApi';
import { useAuth } from '../../hooks/useAuth';


export default function ReviewUsersAboutOpen({  user}: { user: string}) {
    const theme = useTheme();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorData, setErrorData] = useState('');
    const [selectedReviewIndex, setSelectedReviewIndex] = useState(0);
    const [userReviews, setUserReviews] = useState([] as Review[]);
    const api = useReviewsApi();
    const { authUser, login } = useAuth();
    const handleNextReview = () => {
        setSelectedReviewIndex((prevIndex) => (prevIndex + 1) % userReviews.length);
    };

    const handlePreviousReview = () => {
        setSelectedReviewIndex((prevIndex) => (prevIndex - 1 + userReviews.length) % userReviews.length);
    };


    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    function setError(errorMessage: string) {
        setErrorData(errorMessage);
      }

        useEffect(() => {
            const getReviewByUser = async () => {
                try {
                    const response = await api.getReviewByUser(authUser.user?.username || '')
                    if (response.ok) {
                        const reviews = await response.json()
                        setUserReviews(reviews)
                        setError('')
                    } else {
                        setError('Error fetching the reviews')
                    }
                } catch (error) {
                    setError('An error occurred while fetching the reviews')
                }
            }
    
            getReviewByUser()
        })

    return (
        <>
            <Card
                sx={{
                    p: 4,
                    maxWidth: 400,
                    margin: 'auto', // Centrar la tarjeta
                    textAlign: 'center', // Alinear el contenido al centro
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {userReviews.length > 0 ? (
                    <>
                        <Typography variant="h6">{userReviews[selectedReviewIndex].title}</Typography>
                        <Typography variant="body1">{userReviews[selectedReviewIndex].description}</Typography>
                        <Typography variant="body2">Rating: {userReviews[selectedReviewIndex].rating}</Typography>
                        <Divider />

                        {userReviews.length > 1 && (
                            <div style={{ marginTop: '1rem' }}>
                                <Button variant="outlined" color="secondary" onClick={handlePreviousReview}>
                                    Anterior
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={handleNextReview} style={{ marginLeft: '0.5rem' }}>
                                    Siguiente
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <Typography variant="body1">No reviews have been made about you</Typography>
                )}
            </Card>

            <TransitionSnackbar open={openSnackbar} onClose={handleCloseSnackbar} message={errorData} autoHideDuration={6000} />
        </>
    );
}


