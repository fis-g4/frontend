import { Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import VideoComponent from '../components/course-lesson-details/course-lesson-details';
import { courses } from '../_mocks/courses';
import { useResponsive } from "../hooks/useResponsive";


export default function CoursesPage() {
  const isSmallScreen = useResponsive('down', 'sm');

  return (
    <>
      <Helmet>
        <title> Courses | FIS G4 </title>
      </Helmet>
      <Grid container>
      <Grid item xs={isSmallScreen ? 12 : 8}>
          <VideoComponent playlistTitle={courses[0].title} videoTitle={courses[0].title2} videoUrl={courses[0].videoUrl} description={courses[0].description} videoImage={courses[0].image} />
        </Grid>
        <Grid item xs={isSmallScreen ? 12 : 4}>
          {/* Contenido de la columna derecha */}
        </Grid>
      </Grid>      
    </>
  )
}
