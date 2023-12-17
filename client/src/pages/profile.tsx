import { Helmet } from 'react-helmet-async';
import ProfileForm from '../components/profile-form/profile-form';
import { Typography } from '@mui/material';


export default function ProfilePage() {
  return (
    <>
      <Helmet>
        <title> Profile | FIS G4 </title>
      </Helmet>

      <Typography variant="h3" sx={{ marginLeft: '25px', marginTop: '10px' }}> Edit your profile </Typography>
      <ProfileForm />
    </>
  );
}
