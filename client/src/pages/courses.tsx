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
import React from 'react'
import { useClassesApi } from '../api/useClassesApi'
import { useMaterialsApi } from '../api/useMaterialsApi'

interface Class {
    id: string
    title: string
    description: string
    order: number
    file: string
    course: string
}

export default function CoursesPage() {
    const [editCourseOpen, setEditCourseOpen] = useState(false);
    const [newCourseOpen, setNewCourseOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorData, setErrorData] = useState('');

    const { getAllClasses } = useClassesApi()
    const { getAllMaterials } = useMaterialsApi()
        
    const [courseMaterials, setCourseMaterials] = useState([] as Material[])
    const [courseClasses, setCourseClasses] = useState([] as Class[])
    const [courses, setCourses] = useState([] as any[])
    const [selectedClass, setSelectedClass] = useState<Class | null>()
    const [selectedCourse, setSelectedCourse] = useState<any | null>()

    const { getCourses } = useCoursesApi();
    const { deleteCourse } = useCoursesApi();

    const COURSE_ID = '1'
    const { authUser } = useAuth()

    const updateCourseList = () => {
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
    }

    const handleDeleteCourse = async (course_: any) => {
        await deleteCourse(course_._id);
        updateCourseList();
    }

    const handleEditCourseOpen = (course_: any) => {
        setEditCourseOpen(course_);
    }

    const handleEditCourseClose = () => {
        setEditCourseOpen(false);
        updateCourseList();
    }

    const handleNewCourseOpen = () => {
        setNewCourseOpen(true); 
    }

    const handleNewCourseClose = () => {
        setNewCourseOpen(false);
        updateCourseList();
    }

    const handleSelectedClass = (class_: Class) => {
        setSelectedClass(class_)
    }

    const handleSelectedCourse = (course: any) => {
        setSelectedCourse(course)
    }
    
    const handleOpenSnackbar = (error?: string) => {
        setOpenSnackbar(true);
        setErrorData(error || 'There was an error retrieving the courses. Please try later.');
    }

    useEffect(() => {
        const getMaterials = async () => {
            try {
                const response = await getAllMaterials();
        
                if (response.ok) {
                    const allMaterials: Material[] = await response.json();
                    const getUserMaterials = allMaterials.filter(
                        (material) => material.courses.includes(COURSE_ID)
                    );
                    setCourseMaterials(getUserMaterials);
                } else {
                    console.error('Error fetching materials:', response.status, response.statusText); //TODO: A MODIFICAR POR EL MICROSERVICIO DE CURSOS
                }
            } catch (error) {
                console.error('An error occurred while fetching materials:', error); //TODO: A MODIFICAR POR EL MICROSERVICIO DE CURSOS
            }
        };
        const getClasses = async () => {
            try {
                const response = await getAllClasses();
        
                if (response.ok) {
                    const allClasses: Class[] = await response.json();
                    const getUserClasses = allClasses.filter(
                        (class_) => class_.course === COURSE_ID //TODO: A MODIFICAR POR EL MICROSERVICIO DE CURSOS
                    );
                    setCourseClasses(getUserClasses);
                } else {
                    console.error('Error fetching classes:', response.status, response.statusText); //TODO: PONER UN ERROR POR PANTALLA A LO MEJOR
                }
            } catch (error) {

                console.error('An error occurred while fetching classes:', error); //TODO: PONER UN ERROR POR PANTALLA A LO MEJOR
            }
        };

        getMaterials()
        getClasses()
        updateCourseList()
    }, [authUser, getAllClasses, getAllMaterials])

    const isSmallScreen = useResponsive('down', 'md')

    const resetSelection = (): void => {
        setSelectedClass(null)
        setSelectedCourse(null)
    }

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

    return (
        <>
            <Helmet>
                <title> Courses | FIS G4 </title>
            </Helmet>
            <TransitionModal open={newCourseOpen} handleClose={handleNewCourseClose} sx={{ maxWidth: 500, width: '100%' }}>
                <NewCourseView 
                handleNewCourseClose={handleNewCourseClose} 
                course={null}
                />
            </TransitionModal>
            <TransitionModal open={editCourseOpen} handleClose={handleEditCourseClose} sx={{ maxWidth: 500, width: '100%' }}>
                <NewCourseView 
                handleNewCourseClose={handleEditCourseClose} 
                course={editCourseOpen}
                />
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
                        Your courses
                    </Typography>
                    <Grid container spacing={0}>
                        <Grid item xs={isSmallScreen ? 12 : 12}>
                            <CourseList
                                courses={courses.filter((obj) => accessToCourse(obj))}
                                authUser={authUser}
                                handleSelectedCourse={handleSelectedCourse}
                                handleEditCourseOpen={handleEditCourseOpen}
                                handleDeleteCourse={handleDeleteCourse}
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
