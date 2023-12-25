import { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import VideoComponent from '../components/course-lesson-details/course-lesson-details'
import { courses } from '../_mocks/courses'
import { useResponsive } from '../hooks/useResponsive'
import { Material, materials } from '../_mocks/materials'
import { useAuth } from '../hooks/useAuth'
import CourseClassesMaterials from '../components/course-classes-materials/course-classes-materials'

export default function CoursesPage() {
    const [courseMaterials, setCourseMaterials] = useState([] as Material[])

    const COURSE_ID = '1'
    const { authUser } = useAuth()

    useEffect(() => {
        const getMaterials = async () => {
            const getUserMaterials = materials.filter((material) =>
                material.courses.includes(COURSE_ID)
            )
            setCourseMaterials(getUserMaterials)
        }
        getMaterials()
    }, [authUser])

    const isSmallScreen = useResponsive('down', 'sm')

    return (
        <>
            <Helmet>
                <title> Courses | FIS G4 </title>
            </Helmet>
            <Grid container spacing={2}>
                <Grid item xs={isSmallScreen ? 12 : 7}>
                    <VideoComponent
                        playlistTitle={courses[0].title}
                        videoTitle={courses[0].title2}
                        videoUrl={courses[0].videoUrl}
                        description={courses[0].description}
                        videoImage={courses[0].image}
                    />
                </Grid>
                <Grid item xs={isSmallScreen ? 12 : 5}>
                    <CourseClassesMaterials
                        materials={courseMaterials}
                        authUser={authUser}
                    />
                </Grid>
            </Grid>
        </>
    )
}
