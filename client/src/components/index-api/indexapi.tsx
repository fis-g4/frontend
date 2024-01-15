import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import TransitionSnackbar from '../transition-snackbar/transition-snackbar';

export default function IndexApiOpen({ handleIndexApiClose }: { handleIndexApiClose: () => void; }) {
    const theme = useTheme();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorData, setErrorData] = useState('');
    const [selectedReviewIndex, setSelectedReviewIndex] = useState(0);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const openDocument = (documentType: string) => {
        switch (documentType) {
            case 'Review':
                window.open('url_del_documento_review.pdf', '_blank');
                break;
            case 'Course':
                window.open('url_del_documento_course.pdf', '_blank');
                break;
            case 'Material':
                window.open('url_del_documento_material.pdf', '_blank');
                break;
            case 'User':
                window.open('url_del_documento_user.pdf', '_blank');
                break;
            case 'Payment':
                window.open('url_del_documento_payment.pdf', '_blank');
                break;
            case 'Communication':
                window.open('url_del_documento_communication.pdf', '_blank');
                break;
            default:
                break;
        }
    };

    return (
        <>
            <Card
                sx={{
                    p: 4,
                    maxWidth: 1000,
                    margin: 'auto',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h5" component="div" sx={{ mb: 5 }}>
                    Select Documentation
                </Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gridGap: '10px',
                        justifyContent: 'center',
                        margin: '10px', // Ajusta este margen según tus necesidades
                    }}
                >
                    <Button
                        variant="outlined"
                        color="info"
                        onClick={() => openDocument('Review')}
                    >
                        Review's api
                    </Button>
                    <Button
                        variant="outlined"
                        color="info"
                        onClick={() => openDocument('Course')}
                    >
                        Course's api
                    </Button>
                    <Button
                        variant="outlined"
                        color="info"
                        onClick={() => openDocument('Material')}
                    >
                        Learning's api
                    </Button>
                    <Button
                        variant="outlined"
                        color="info"
                        onClick={() => openDocument('User')}
                    >
                        User's api
                    </Button>
                    <Button
                        variant="outlined"
                        color="info"
                        onClick={() => openDocument('Payment')}
                    >
                        Payment's api
                    </Button>
                    <Button
                        variant="outlined"
                        color="info"
                        onClick={() => openDocument('Payment')}
                    >
                        Communication's api
                    </Button>
                </Box>
            </Card>

            <TransitionSnackbar open={openSnackbar} onClose={handleCloseSnackbar} message={errorData} autoHideDuration={6000} />
        </>
    );
}
