import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import {
    Typography,
    ListItemIcon,
    IconButton,
    Box,
    useTheme,
    alpha,
} from '@mui/material'

import { Course } from '../../_mocks/courses'
import { Download, ShoppingCart, RemoveRedEye } from '@mui/icons-material'
import { AuthUserContext } from '../../hooks/useAuth'
import { longWordInTheText } from '../../utils/format-text'
import { formatCurrency } from '../../utils/format-currency'
import React, { useState } from 'react'
import ReviewOpen from '../review/reviews-courses'
import TransitionModal from '../transition-modal/transition-modal'
import Button from '@mui/material/Button'
import { reviews } from '../../_mocks/reviews'
interface CoursesProps {
    courses: Course[]
    authUser: AuthUserContext
    handleSelectedCourse: (class_: Course) => void
}

export default function CourseList({
    courses,
    authUser,
    handleSelectedCourse,
}: Readonly<CoursesProps>) {
    const [reviewOpenMap, setReviewOpenMap] = useState<{ [key: string]: boolean }>({});

    const handleReviewOpen = (courseId: string) => {
    setReviewOpenMap((prevMap) => ({
        ...prevMap,
        [courseId]: true,
    }));
    };

    const handleReviewClose = (courseId: string) => {
    setReviewOpenMap((prevMap) => ({
        ...prevMap,
        [courseId]: false,
    }));
    };

    const accessToCourse = (course: Course) => {
        if (
            course.price === 0 ||
            course.purchasers.includes(authUser.user?.username as string)
        ) {
            return true
        }
        return false
    }
   
    const theme = useTheme()

    return (
        <Box sx={{ height: '70vh', overflowY: 'auto' }}>
            {courses.map((course) => (
                <Card
                    key={course.id}
                    sx={{
                        my: 1,
                        border: '1px solid',
                        backgroundColor: alpha(
                            theme.palette.primary.light,
                            0.05
                        ),
                    }}
                >
                    <CardContent
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box>
                            <Typography variant="body1">
                                {longWordInTheText(course.title, 20)}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {longWordInTheText(course.description, 20)}
                            </Typography>
                            <Typography variant="body2" color="primary">
                                Price: {formatCurrency(course.currency)}{' '}
                                {course.price}
                            </Typography>
                            <Button
                                variant="outlined"
                                color="secondary"
                                sx={{ marginRight: '10px' }}
                                onClick={() => handleReviewOpen(course.id)}
                                >
                                Reviews
                                </Button>
                                <TransitionModal
                                key={course.id}
                                open={reviewOpenMap[course.id] || false}
                                handleClose={() => handleReviewClose(course.id)}
                                sx={{ maxWidth: 500, width: '100%' }}
                                >
                                <ReviewOpen handleReviewClose={() => handleReviewClose(course.id)} id={course.id} />
                                </TransitionModal>
                        </Box>
                        <ListItemIcon>
                            {accessToCourse(course) ? (
                                <IconButton
                                    color="primary"
                                    onClick={() => handleSelectedCourse(course)}
                                >
                                    <RemoveRedEye />
                                </IconButton>
                            ) : (
                                <IconButton>
                                    <ShoppingCart />
                                </IconButton>
                            )}
                        </ListItemIcon>
                    </CardContent>
                </Card>
            ))}
        </Box>
    )
}