import {
    Box,
    Chip,
    IconButton,
    ListItemIcon,
    Rating,
    Typography,
    alpha,
    useTheme,
} from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import { Delete, Edit, RemoveRedEye, ShoppingCart } from '@mui/icons-material'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { usePaymentApi } from '../../api/usePaymentApi'
import { AuthUserContext } from '../../hooks/useAuth'
import { longWordInTheText } from '../../utils/format-text'
import ReviewCoursesOpen from '../review/reviews-courses'
import TransitionModal from '../transition-modal/transition-modal'
interface CoursesProps {
    courses: any[]
    authUser: AuthUserContext
    handleSelectedCourse: (class_: any) => void
    handleEditCourseOpen: (course_: any) => void
    handleDeleteCourse: (course_: any) => void
}

export default function CourseList({
    courses,
    authUser,
    handleSelectedCourse,
    handleEditCourseOpen,
    handleDeleteCourse,
}: Readonly<CoursesProps>) {
    const [reviewOpenMap, setReviewOpenMap] = useState<{
        [key: string]: boolean
    }>({})
    const handleReviewOpen = (courseId: string) => {
        setReviewOpenMap((prevMap) => ({
            ...prevMap,
            [courseId]: true,
        }))
    }

    const handleReviewClose = (courseId: string) => {
        setReviewOpenMap((prevMap) => ({
            ...prevMap,
            [courseId]: false,
        }))
    }

    const accessToCourse = (course: any) => {
        if (
            course.price === 0 ||
            course.access.includes(authUser.user?.username as string) ||
            course.creator === (authUser.user?.username as string)
        ) {
            return true
        }
        return false
    }

    const courseCreator = (course: any) => {
        if (course.creator === (authUser.user?.username as string)) {
            return true
        }
        return false
    }

    const theme = useTheme()

    const categoriesLine = (course: any) => {
        return course.categories.map((category: string, index: number) => (
            <Chip
                key={index}
                label={category}
                size="small"
                style={{ marginRight: '5px' }}
            />
        ))
    }

    const { createPaymentCourse } = usePaymentApi()

    return (
        <Box sx={{ height: '70vh', overflowY: 'auto' }}>
            {courses.map((course) => (
                <Card
                    key={course._id}
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
                                {longWordInTheText(course.name, 20)}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {longWordInTheText(course.description, 20)}
                            </Typography>
                            <Typography variant="body2" color="textPrimary">
                                {categoriesLine(course)}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Language:{' '}
                                {longWordInTheText(course.language, 20)}
                            </Typography>
                            <div>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    sx={{ marginRight: '10px' }}
                                    onClick={() => handleReviewOpen(course._id)}
                                >
                                    Reviews
                                </Button>
                                <TransitionModal
                                    key={course._id}
                                    open={reviewOpenMap[course._id] || false}
                                    handleClose={() =>
                                        handleReviewClose(course._id)
                                    }
                                    sx={{ maxWidth: 500, width: '100%' }}
                                >
                                    <ReviewCoursesOpen
                                        handleReviewClose={() =>
                                            handleReviewClose(course._id)
                                        }
                                        id={course._id}
                                    />
                                </TransitionModal>
                            </div>
                            <Rating
                                name="read-only"
                                value={course.score}
                                readOnly
                                precision={0.1}
                            />
                        </Box>
                        <ListItemIcon>
                            <Typography
                                variant="body2"
                                color="secondary"
                                style={{
                                    fontSize: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                {course.price + '€'}
                            </Typography>
                            {courseCreator(course) && (
                                <IconButton
                                    color="primary"
                                    onClick={() => handleEditCourseOpen(course)}
                                >
                                    <Edit />
                                </IconButton>
                            )}
                            {courseCreator(course) && (
                                <IconButton
                                    color="primary"
                                    onClick={() => handleDeleteCourse(course)}
                                >
                                    <Delete />
                                </IconButton>
                            )}
                            {accessToCourse(course) ? (
                                <IconButton
                                    color="primary"
                                    onClick={() => handleSelectedCourse(course)}
                                >
                                    <RemoveRedEye />
                                </IconButton>
                            ) : (
                                <IconButton
                                    onClick={() =>
                                        createPaymentCourse(course._id).then(
                                            (response) => {
                                                if (response.url)
                                                    window.location.href =
                                                        response.url
                                            }
                                        )
                                    }
                                >
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
