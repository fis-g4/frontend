import { Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import MailboxTabs from '../components/mailbox-tabs/mailbox-tabs';
import MessageNew from '../components/message-new/message-new';
import TransitionSnackbar from '../components/transition-snackbar/transition-snackbar';
import { useEffect, useState } from 'react';
import { useUsersApi } from '../api/useUsersApi';

export default function MailboxPage() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorData, setErrorData] = useState('');
  const [usersList, setUsersList] = useState<{username:string, profilePicture:string}[]>([]);
  const [refresh, setRefresh] = useState(false);
  const { getAllUsers } = useUsersApi();

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  const handleOpenSnackbar = (error?: string) => {
    setOpenSnackbar(true);
    setErrorData(error || 'There was an error retrieving the users. Please try later.');
  }

  useEffect(() => {
    getAllUsers().then((response) => {
      if(response.ok) {
        response.json().then((responseData) => {
          setUsersList(responseData.data);
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
  }, []);

  return (
    <>
      <Helmet>
        <title> Mailbox | FIS G4 </title>
      </Helmet>

      <Typography variant="h3" sx={{ marginLeft: '25px', marginTop: '10px' }}> Check your messages </Typography>
      <MailboxTabs usersList={usersList} refresh={refresh} setRefresh={setRefresh} />
      <MessageNew usersList={usersList} setRefresh={()=>setRefresh(!refresh)}/>
      <TransitionSnackbar open={openSnackbar} handleClose={handleCloseSnackbar} message={errorData} />
    </>
  );
}
