import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import {
    Typography,
    ListItemIcon,
    IconButton,
    Box,
    useTheme,
    alpha,
    Chip,
    Rating,
} from '@mui/material'

import { Download, ShoppingCart, RemoveRedEye, Edit, Delete } from '@mui/icons-material'
import { AuthUserContext } from '../../hooks/useAuth'
import { longWordInTheText } from '../../utils/format-text'
import { formatCurrency } from '../../utils/format-currency'
import React, { useState } from 'react'
import TransitionModal from '../transition-modal/transition-modal'
import Button from '@mui/material/Button'
import ReviewCoursesOpen from '../review/reviews-courses'
import { useCoursesApi } from '../../api/useCoursesApi'
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

    const accessToCourse = (course: any) => {
        if (
            course.price === 0 ||
            course.access.includes(authUser.user?.username as string) ||
            course.creator === authUser.user?.username as string
        ) {
            return true
        }
        return false
    }

    const courseCreator = (course: any) => {
        if (
            course.creator === authUser.user?.username as string
        ) {
            return true
        }
        return false
    }
   
    const theme = useTheme()
    
    const categoriesLine = (course: any) => {
        return (
        course.categories.map((category:string, index:number) => (
        <Chip key={index} label={category} size="small" style={{ marginRight: '5px' }} />
      ))
      );
    }

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
                                Language: {longWordInTheText(course.language, 20)}
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
                                handleClose={() => handleReviewClose(course._id)}
                                sx={{ maxWidth: 500, width: '100%' }}
                                >
                                <ReviewCoursesOpen handleReviewClose={() => handleReviewClose(course._id)} id={course._id} />
                                </TransitionModal>
                            </div>
                            <Rating name="read-only" value={course.score} readOnly precision={0.1}/>
                        </Box>
                        <ListItemIcon>
                            <Typography variant="body2" color="secondary" style={{ fontSize: '24px', display: 'flex', alignItems: 'center' }}>
                                {course.price + "€"}
                            </Typography>
                            {courseCreator(course) && (
                                <IconButton
                                    color="primary"
                                    onClick={() => handleEditCourseOpen(course)}
                                >
                                    <Edit />
                                </IconButton>
                            ) }
                            {courseCreator(course) && (
                                <IconButton
                                    color="primary"
                                    onClick={() => handleDeleteCourse(course)}
                                >
                                    <Delete />
                                </IconButton>
                            ) }
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