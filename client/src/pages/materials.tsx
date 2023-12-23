import { Helmet } from 'react-helmet-async';
import { Typography } from '@mui/material';
import MaterialsFiles from '../components/materials-files/materials-files';


export default function MaterialsPage() {

  return (
    <>
      <Helmet>
        <title> Courses | FIS G4 </title>
      </Helmet>

      <Typography variant="h3" sx={{ marginLeft: '25px', marginTop: '10px' }}> My materials </Typography>
      <MaterialsFiles />
    </>
  );
}
