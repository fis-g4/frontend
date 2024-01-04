import { Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import SettingsAccount from '../components/settings-account/settings-account';


export default function SettingsPage() {
  return (
    <>
      <Helmet>
        <title> Settings | FIS G4 </title>
      </Helmet>

      <Typography variant="h3" sx={{ marginLeft: '25px', marginTop: '10px' }}> Manage the settings </Typography>
      <SettingsAccount />    
    </>
  );
}
