import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import TransitionSnackbar from '../transition-snackbar/transition-snackbar';
import { reviews } from '../../_mocks/reviews';

export default function ReviewCoursesOpen({ handleReviewClose, id }: { handleReviewClose: () => void; id: string }) {
    const theme = useTheme();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorData, setErrorData] = useState('');
    const [selectedReviewIndex, setSelectedReviewIndex] = useState(0);

    const handleNextReview = () => {
        setSelectedReviewIndex((prevIndex) => (prevIndex + 1) % courseReviews.length);
    };

    const handlePreviousReview = () => {
        setSelectedReviewIndex((prevIndex) => (prevIndex - 1 + courseReviews.length) % courseReviews.length);
    };

    const handleGetStarted = () => {
        handleReviewClose();
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleForgotPassword = () => {
        handleReviewClose();
    };

    const courseReviews = reviews.filter((review) => review.course.toString() === id);
    console.log(courseReviews.length);

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
                {courseReviews.length > 0 ? (
                    <>
                        <Typography variant="h6">{courseReviews[selectedReviewIndex].title}</Typography>
                        <Typography variant="body1">{courseReviews[selectedReviewIndex].description}</Typography>
                        <Typography variant="body2">Rating: {courseReviews[selectedReviewIndex].rating}</Typography>
                        <Divider />

                        {courseReviews.length > 1 && (
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
                    <Typography variant="body1">No hay reseñas disponibles para este curso.</Typography>
                )}
            </Card>

            <TransitionSnackbar open={openSnackbar} onClose={handleCloseSnackbar} message={errorData} autoHideDuration={6000} />
        </>
    );
}
