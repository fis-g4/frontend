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


export default function ReviewUsersFromOpen({ user }: {user: string}) {
    const theme = useTheme();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorData, setErrorData] = useState('');
    const [selectedReviewIndex, setSelectedReviewIndex] = useState(0);
    const [creatorReviews, setCreatorReviews] = useState([] as Review[]);
    const api = useReviewsApi();
    const { authUser, login } = useAuth();
    const handleNextReview = () => {
        setSelectedReviewIndex((prevIndex) => (prevIndex + 1) % creatorReviews.length);
    };

    const handlePreviousReview = () => {
        setSelectedReviewIndex((prevIndex) => (prevIndex - 1 + creatorReviews.length) % creatorReviews.length);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    function setError(errorMessage: string) {
        setErrorData(errorMessage);
      }

    useEffect(() => {
        const getReviewByCreator = async () => {
            try {
                const response = await api.getReviewByCreator(authUser.user?.username || '')
                if (response.ok) {
                    const reviews = await response.json()
                    setCreatorReviews(reviews)
                    setError('')
                } else {
                    setError('Error fetching the reviews')
                }
            } catch (error) {
                setError('An error occurred while fetching the reviews')
            }
        }

        getReviewByCreator()
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
                {creatorReviews.length > 0 ? (
                    <>
                        <Typography variant="h6">{creatorReviews[selectedReviewIndex].title}</Typography>
                        <Typography variant="body1">{creatorReviews[selectedReviewIndex].description}</Typography>
                        <Typography variant="body2">Rating: {creatorReviews[selectedReviewIndex].rating}</Typography>
                        <Divider />

                        {creatorReviews.length > 1 && (
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
                    <Typography variant="body1">You haven't written any reviews</Typography>
                )}
            </Card>

            <TransitionSnackbar open={openSnackbar} onClose={handleCloseSnackbar} message={errorData} autoHideDuration={6000} />
        </>
    );
}
