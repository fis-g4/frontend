import { Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import MailboxTabs from '../components/mailbox-tabs/mailbox-tabs';
import MessageNew from '../components/message-new/message-new';

export default function MailboxPage() {
  return (
    <>
      <Helmet>
        <title> Mailbox | FIS G4 </title>
      </Helmet>

      <Typography variant="h3" sx={{ marginLeft: '25px', marginTop: '10px' }}> Check your messages </Typography>
      <MailboxTabs />
      <MessageNew />
    </>
  );
}
