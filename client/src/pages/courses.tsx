import { useEffect, useState } from 'react'
import { Grid, Typography, IconButton, Button } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { Helmet } from 'react-helmet-async'
import VideoComponent from '../components/course-lesson-details/course-lesson-details'
import { useResponsive } from '../hooks/useResponsive'
import { materials, materials as mockMaterialsData } from '../_mocks/materials';
import { Material } from '../_mocks/materials'
import CourseClassesMaterials from '../components/course-classes-materials/course-classes-materials'
import CourseList from '../components/course-classes-materials/course-course-list'
import { useAuth } from '../hooks/useAuth'
import { Class} from '../_mocks/classes'
import { Course, courses } from '../_mocks/courses'
import { useClassesApi } from '../api/useClassesApi'
import { useMaterialsApi } from '../api/useMaterialsApi'
import TransitionModal from '../components/transition-modal/transition-modal'
import ClassView from '../components/classes-form/classes-form'
import TransitionSnackbar from '../components/transition-snackbar/transition-snackbar'


export default function CoursesPage() {

    const { getCourseClasses } = useClassesApi()
    const { getCourseMaterials } = useMaterialsApi()
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


    useEffect(() => {
        const getMaterials = async () => {
            try {
                const response = await getCourseMaterials(CourseId);
        
                if (response.ok) {
                    const allMaterialsByApi: Material[] = await response.json();
                    const allMaterials2: Material[] = mockMaterialsData;
                    //concatenar los materiales de la base de datos con los mock
                    const allMaterials: Material[] = allMaterials2.concat(allMaterialsByApi);
                    setCourseMaterials(allMaterials);
                } else {
                    console.error('Error fetching materials:', response.status, response.statusText); //TODO: A MODIFICAR POR EL MICROSERVICIO DE CURSOS
                }
            } catch (error) {
                console.error('An error occurred while fetching materials:', error); //TODO: A MODIFICAR POR EL MICROSERVICIO DE CURSOS
            }
        };

        const getClasses = async () => {
            try {
                const response = await getCourseClasses(CourseId);
        
                if (response.ok) {
                    const allClasses: Class[] = await response.json();
                    setCourseClasses(allClasses);
                    console.log(allClasses)
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
            console.log("AAA")
            getMaterials()
            getClasses()
            getCourses()
            setRefreshKey(false)
        }
    }, [authUser, getCourseMaterials, getCourseClasses, refreshKey])

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
            ) : (<>
                    {class_ && <TransitionModal
                        open={updateClassOpen}
                        handleClose={handleUpdateClassClose}
                        sx={{ maxWidth: 500, width: '100%' }}
                    >
                        <ClassView
                            _class={class_}
                            operation="update"
                            creator = {authUser.user?.username ?? ''}
                            course={CourseId}
                            handleRefresh={handleRefresh}
                            handleUpdateClassClose={
                                handleUpdateClassClose
                            }
                            handleFullyOpenSnackbar={handleOpenSnackbar}
                        />
                    </TransitionModal>
                    } 
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
                        
                        <Grid item xs={isSmallScreen ? 12 : 5} >
                            <Button
                                color= "primary"
                                variant="contained"
                                type="submit"
                                onClick={() => handleNewClassOpen()}
                                sx={{ display: 'block', mx: 'auto', marginBottom: 2}}
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
                                handleUpdateClassOpen={handleUpdateClassOpen}
                                handleUpdateClassClose={handleUpdateClassClose}
                                handleRefresh={handleRefresh}
                                handleFullyOpenSnackbar={handleOpenSnackbar}
                            />
                        </Grid>
                    </Grid>
                </div>
                <TransitionSnackbar
                    open={openSnackbar}
                    onClose={handleCloseSnackbar}
                    message={errorData}
                    autoHideDuration={6000}
                />
                </>
            )}
        </>
    )
}
