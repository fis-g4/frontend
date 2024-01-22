import { useEffect, useState } from 'react'
import { Grid, Typography, IconButton } from '@mui/material'
import { ArrowBack, Add } from '@mui/icons-material'
import { Helmet } from 'react-helmet-async'
import VideoComponent from '../components/course-lesson-details/course-lesson-details'
import { useResponsive } from '../hooks/useResponsive'

import TransitionModal from '../components/transition-modal/transition-modal'
import NewCourseView from '../components/course-classes-materials/course-form'
import { useCoursesApi } from '../api/useCoursesApi'

import { Material, materials } from '../_mocks/materials'
import CourseClassesMaterials from '../components/course-classes-materials/course-classes-materials'
import CourseList from '../components/course-classes-materials/course-course-list'
import { useAuth } from '../hooks/useAuth'
import { Class, classes } from '../_mocks/classes'
import { Course } from '../_mocks/courses'
import React from 'react'

export default function CoursesPage() {
    const [newCourseOpen, setNewCourseOpen] = useState(false);
    const handleNewCourseOpen = () => setNewCourseOpen(true);
    const handleNewCourseClose = () => setNewCourseOpen(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorData, setErrorData] = useState('');
    const [courseMaterials, setCourseMaterials] = useState([] as Material[])
    const [courseClasses, setCourseClasses] = useState([] as Class[])
    const [courses, setCourses] = useState([] as Course[])
    const [selectedClass, setSelectedClass] = useState<Class | null>()
    const [selectedCourse, setSelectedCourse] = useState<Course | null>()

    const { getCourses } = useCoursesApi();

    const COURSE_ID = '1'
    const { authUser } = useAuth()

    const handleSelectedClass = (class_: Class) => {
        setSelectedClass(class_)
    }

    const handleSelectedCourse = (course: Course) => {
        console.log(selectedCourse)
        setSelectedCourse(course)
    }
    
    const handleOpenSnackbar = (error?: string) => {
        setOpenSnackbar(true);
        setErrorData(error || 'There was an error retrieving the courses. Please try later.');
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

        getCourses().then((response) => {
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
        getMaterials()
        getClasses()
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
            <TransitionModal open={newCourseOpen} handleClose={handleNewCourseClose} sx={{ maxWidth: 500, width: '100%' }}>
                <NewCourseView handleNewCourseClose={handleNewCourseClose} />
            </TransitionModal>
            {!selectedCourse ? (
                <div>
                    <IconButton
                        color="primary"
                        onClick={() => handleNewCourseOpen()}
                    >
                        <Add />
                    </IconButton>
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
                                    playlistTitle={selectedCourse?.name ??  'Loading...'}
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
                                course= {selectedCourse}
                                handleSelectedClass={handleSelectedClass}
                            />
                        </Grid>
                    </Grid>
                </div>
            )}
        </>
    )
}
