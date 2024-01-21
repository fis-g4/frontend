import { useEffect, useState } from 'react'
import { Grid, Typography, IconButton, Button } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { Helmet } from 'react-helmet-async'
import VideoComponent from '../components/course-lesson-details/course-lesson-details'
import { useResponsive } from '../hooks/useResponsive'
import { Material, materials } from '../_mocks/materials'
import CourseClassesMaterials from '../components/course-classes-materials/course-classes-materials'
import CourseList from '../components/course-classes-materials/course-course-list'
import { useAuth } from '../hooks/useAuth'
//import { Class, classes } from '../_mocks/classes'
import { Course, courses } from '../_mocks/courses'
import { useClassesApi } from '../api/useClassesApi'
import { useMaterialsApi } from '../api/useMaterialsApi'
import TransitionModal from '../components/transition-modal/transition-modal'
import ClassView from '../components/classes-form/classes-form'
import { text } from 'stream/consumers'

interface Class {
    id: string
    title: string
    description: string
    order: number
    file: string
    course: string
    creator: string
}

export default function CoursesPage() {

    const { getAllClasses } = useClassesApi()
    const { getAllMaterials } = useMaterialsApi()
    const [refreshKey, setRefreshKey] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [class_, setClass] = useState<Class | null>(null)
    const [courseMaterials, setCourseMaterials] = useState([] as Material[])
    const [courseClasses, setCourseClasses] = useState([] as Class[])
    const [_courses, setCourses] = useState([] as Course[])
    const [selectedClass, setSelectedClass] = useState<Class | null>()
    const [selectedCourse, setSelectedCourse] = useState<Course | null>()

    const [newClassOpen, setNewClassOpen] = useState(false)
    const [updateClassOpen, setUpdateClassOpen] = useState(false)
    const handleNewClassOpen = () => setNewClassOpen(true)
    const handleNewClassClose = () => setNewClassOpen(false)
    const handleUpdateClassOpen = (_class: Class) => {
        setClass(_class)
        setUpdateClassOpen(true)
    }
    const handleUpdateClassClose = () => setUpdateClassOpen(false)
    const COURSE_ID = '1'
    const { authUser } = useAuth()

    const handleSelectedClass = (class_: Class) => {
        setSelectedClass(class_)
    }

    const handleSelectedCourse = (course: Course) => {
        setSelectedCourse(course)
    }

    const [error, setError] = useState('')
    const [errorData, setErrorData] = useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false)

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false)
    }

    const handleOpenSnackbar = (errorData: string) => {
        setErrorData(errorData)
        setOpenSnackbar(true)
    }

    const handleRefresh = () => {
        setRefreshKey(true)
    }

    const CourseId = "615e2f3b1d9f9b2b4c9e9b1a"

    //TODO: AÑADIR FUNCIÓN PARA OBTENER UN CURSO (MICROSERVICIO DE CURSOS)
    /*TODO: AÑADIR CHECK DE SI EL USUARIO ES EL INSTRUCTOR DEL CURSO*/
    /*
    if(authUser.user?.username === course.instructor){
        setModalVisible(true)
    }
    */


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
                    //console.error('Error fetching materials:', response.status, response.statusText); //TODO: A MODIFICAR POR EL MICROSERVICIO DE CURSOS
                }
            } catch (error) {
                //console.error('An error occurred while fetching materials:', error); //TODO: A MODIFICAR POR EL MICROSERVICIO DE CURSOS
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

        const getCourses = async () => {
            const getAllCourses = courses
            setCourses(getAllCourses)
        }
        if (authUser.user && refreshKey) {
            getMaterials()
            getClasses()
            getCourses()
            setRefreshKey(false)
        }
    }, [authUser, getAllClasses, getAllMaterials, refreshKey])

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
                            <Button
                                color= "primary"
                                variant="contained"
                                type="submit"
                                onClick={() => handleNewClassOpen()}
                            >
                                Add new class
                            </Button>
                            <TransitionModal
                                open={newClassOpen}
                                handleClose={handleNewClassClose}
                                sx={{ maxWidth: 500, width: '100%' }}
                                > 
                            
                            <ClassView
                            operation="create"
                            course={CourseId}
                            creator= {authUser.user?.username ?? ''}
                            handleRefresh={handleRefresh}
                            handleNewClassClose={handleNewClassClose}
                            handleFullyOpenSnackbar={handleOpenSnackbar}
                            />
                            </TransitionModal>
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
