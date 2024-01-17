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
//import { Class, classes } from '../_mocks/classes'
import { Course, courses } from '../_mocks/courses'
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

    const { getAllClasses } = useClassesApi()
    const { getAllMaterials } = useMaterialsApi()
    
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

        const getCourses = async () => {
            const getAllCourses = courses
            setCourses(getAllCourses)
        }
        getMaterials()
        getClasses()
        getCourses()
    }, [authUser, getAllClasses, getAllMaterials])

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
