import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MessagesBox, { MessagesColumn } from '../messages-box/messages-box';
import { fToNow } from '../../utils/format-time';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: Readonly<TabPanelProps>) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MailboxTabs({ usersList, refresh, setRefresh } : { usersList: {username:string, profilePicture:string}[], refresh: boolean, setRefresh: React.Dispatch<React.SetStateAction<boolean>>}) {
  const [value, setValue] = useState(0);

  const senderColumns: MessagesColumn[] = [
    { id: 'sender', label: 'Sender', minWidth: 170 },
    { id: 'subject', label: 'Subject', minWidth: 100, bold: true },
    {
      id: 'date',
      label: 'Date',
      minWidth: 170,
      format: (value: string) => fToNow(value),
      bold: true
    },
  ];

  const receiversColumns: MessagesColumn[] = [
    { id: 'receivers', label: 'Receivers', minWidth: 170 },
    { id: 'subject', label: 'Subject', minWidth: 100, bold: true },
    {
      id: 'date',
      label: 'Date',
      minWidth: 170,
      format: (value: string) => fToNow(value),
      bold: true
    },
  ];

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Inbox" {...a11yProps(0)} />
            <Tab label="Received" {...a11yProps(1)} />
            <Tab label="Sent" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <MessagesBox columns={senderColumns} filter='UNREAD' usersList={usersList} refresh={refresh} setRefresh={setRefresh} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MessagesBox columns={senderColumns} filter='RECEIVED' usersList={usersList} refresh={refresh} setRefresh={setRefresh} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <MessagesBox columns={receiversColumns} filter='SENT' usersList={usersList} refresh={refresh} setRefresh={setRefresh} />
      </CustomTabPanel>
    </Box>
  );
}
