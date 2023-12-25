import { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import VideoComponent from '../components/course-lesson-details/course-lesson-details'
import { courses } from '../_mocks/courses'
import { useResponsive } from '../hooks/useResponsive'
import { Material, materials } from '../_mocks/materials'
import CourseClassesMaterials from '../components/course-classes-materials/course-classes-materials'
import { useAuth } from '../hooks/useAuth'
import { Class, classes } from '../_mocks/classes'

export default function CoursesPage() {
    const [courseMaterials, setCourseMaterials] = useState([] as Material[])
    const [courseClasses, setCourseClasses] = useState([] as Class[])
    const [selectedClass, setSelectedClass] = useState<Class | null>()

    const COURSE_ID = '1'
    const { authUser } = useAuth()

    const handleSelectedClass = (class_: Class) => {
        setSelectedClass(class_)
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
        getMaterials()
        getClasses()
    }, [authUser])

    const isSmallScreen = useResponsive('down', 'md')

    return (
        <>
            <Helmet>
                <title> Courses | FIS G4 </title>
            </Helmet>
            <Grid container spacing={2}>
                <Grid item xs={isSmallScreen ? 12 : 7}>
                    {selectedClass?.file ? (
                        <VideoComponent
                            playlistTitle={courses[0].title}
                            videoTitle={selectedClass?.title ?? 'Loading...'}
                            videoUrl={selectedClass?.file ?? ''}
                            description={
                                selectedClass?.description ?? 'Loading...'
                            }
                            videoImage={
                                'https://d33v4339jhl8k0.cloudfront.net/docs/assets/591c8a010428634b4a33375c/images/5ab4866b2c7d3a56d8873f4c/file-MrylO8jADD.png'
                            }
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
        </>
    )
}
