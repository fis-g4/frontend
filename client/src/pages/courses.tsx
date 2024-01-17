import { useEffect, useState } from 'react'
import { Grid, Typography, IconButton } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { Helmet } from 'react-helmet-async'
import VideoComponent from '../components/course-lesson-details/course-lesson-details'
import { useResponsive } from '../hooks/useResponsive'
import { Material, materials } from '../_mocks/materials'
import CourseClassesMaterials from '../components/course-classes-materials/course-classes-materials'
import CourseList from '../components/course-classes-materials/course-course-list'
import { useAuth } from '../hooks/useAuth'
import { Class, classes } from '../_mocks/classes'
import { Course, courses } from '../_mocks/courses'
import React from 'react'


export default function CoursesPage() {
    const [courseMaterials, setCourseMaterials] = useState([] as Material[])
    const [courseClasses, setCourseClasses] = useState([] as Class[])
    const [_courses, setCourses] = useState([] as Course[])
    const [selectedClass, setSelectedClass] = useState<Class | null>()
    const [selectedCourse, setSelectedCourse] = useState<Course | null>()

    const COURSE_ID = '1'
    const { authUser } = useAuth()

    const handleSelectedClass = (class_: Class) => {
        setSelectedClass(class_)
    }

    const handleSelectedCourse = (course: Course) => {
        setSelectedCourse(course)
    }

    useEffect(() => {
        const getMaterials = async () => {
            const getUserMaterials = materials.filter((material) =>
                material.courses.includes(COURSE_ID)
            )
            setCourseMaterials(getUserMaterials)
        }
        const getClasses = async () => {
            const getUserClasses = classes.filter(
                (class_) => class_.course === COURSE_ID
            )
            setCourseClasses(getUserClasses)
        }
        const getCourses = async () => {
            const getAllCourses = courses
            setCourses(getAllCourses)
        }
        getMaterials()
        getClasses()
        getCourses()
    }, [authUser])

    const isSmallScreen = useResponsive('down', 'md')

    const resetSelection = (): void => {
        setSelectedClass(null)
        setSelectedCourse(null)
    }

    return (
        <>
            <Helmet>
                <title> Courses | FIS G4 </title>
            </Helmet>
            {!selectedCourse?.id ? (
                <div>
                    <Typography variant="h4" align="center">
                        Select a course to start
                    </Typography>
                    <Grid container spacing={0}>
                        <Grid item xs={isSmallScreen ? 12 : 12}>
                            <CourseList
                                courses={courses}
                                authUser={authUser}
                                handleSelectedCourse={handleSelectedCourse}
                            />
                        </Grid>
                    </Grid>
                </div>
            ) : (
                <div>
                    <IconButton
                        color="primary"
                        onClick={() => resetSelection()}
                    >
                        <ArrowBack />
                    </IconButton>
                    <Grid container spacing={2}>
                        <Grid item xs={isSmallScreen ? 12 : 7}>
                            {selectedClass?.file ? (
                                <VideoComponent
                                    playlistTitle={selectedCourse?.title ??  'Loading...'}
                                    videoTitle={selectedClass?.title ?? 'Loading...'}
                                    videoUrl={selectedClass?.file ?? ''}
                                    description={
                                        selectedClass?.description ?? 'Loading...'
                                    }
                                    videoImage={'./assets/images/video-thumbnail.png '}
                                />
                            ) : (
                                <Typography variant="h4" align="center">
                                    Select a class to start
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={isSmallScreen ? 12 : 5}>
                            <CourseClassesMaterials
                                classes={courseClasses}
                                materials={courseMaterials}
                                authUser={authUser}
                                handleSelectedClass={handleSelectedClass}
                            />
                        </Grid>
                    </Grid>
                </div>
            )}
        </>
    )
}
