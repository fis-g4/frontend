import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { useFormik } from 'formik';
import Logo from '../components/logo/logo';
import { bgGradient } from '../theme/css';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Chip, Icon, InputAdornment, ListSubheader, MenuItem, SelectChangeEvent, Theme, setRef } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { createMessageValidationSchema } from '../utils/schemas';
import { useMessagesApi } from '../api/useMessagesApi';
import TransitionSnackbar from '../components/transition-snackbar/transition-snackbar';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  autoFocus: false,
};

function getStyles(name: string, receivers: readonly string[], theme: Theme) {
  return {
    fontWeight:
      receivers.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MessageNewForm({ usersList, messageId, receiversValue, subjectValue, messagesValue, handleClose, setRefresh }: Readonly<{ usersList: {username:string, profilePicture:string}[], messageId?: string, receiversValue?: string[], subjectValue?: string, messagesValue?: string, handleClose: () => void, setRefresh: ()=>void }>) {
  const theme = useTheme();
  const { authUser } = useAuth();
  const [receivers, setReceivers] = useState<string[]>(receiversValue || []);
  const [messageReal, setMessageReal] = useState<string>(messagesValue || '');
  const [searchText, setSearchText] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorData, setErrorData] = useState('');
  const { createMessage, updateMessage } = useMessagesApi();

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  const handleOpenSnackbar = (error?: string) => {
    setOpenSnackbar(true);
    setErrorData(error || 'There was an error creating the message. Please try later.');
  }
  
  const containsText = (text: string, searchText: string) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

  const displayedOptions = useMemo(
    () => usersList.filter((option) => containsText(option.username, searchText)),
    [searchText]
  );

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setReceivers(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleSelectDelete = (value: string) => {
    setReceivers((receivers) => receivers.filter((receiver) => receiver !== value));
  };

  useEffect(() => { formik.setFieldValue('receivers', receivers); }, [receivers]);

  const formik = useFormik({
    initialValues: {
      receivers: receiversValue || [],
      sender: authUser.user?.username,
      subject: subjectValue || '',
      message: messagesValue || '',
    },
    validationSchema: createMessageValidationSchema(authUser.user?.username || '', subjectValue, messagesValue, messageReal),
    onSubmit: (values) => {
        if (messageId){
          updateMessage(messageId, values.subject, values.message).then((response) => {
            if(!response.ok) {
              response.json().then((responseData) => {
                handleOpenSnackbar(responseData.error);
              }).catch((_error) => {
                handleOpenSnackbar('There was an error updating the message. Please try later.');
              });
            } else{
              response.json().then((responseData) => {
                handleClose();
                setRefresh();
              }).catch((_error) => {
                handleOpenSnackbar('There was an error updating the message. Please try later.');
              });
            }
          }).catch((_error) => {
            handleOpenSnackbar('There was an error updating the message. Please try later.');
          });
        } else {
          const messageData = {
            sender: values.sender,
            receivers: values.receivers,
            subject: values.subject,
            message: values.message,
          }
          createMessage(messageData).then((response) => {
            if(response.status !== 201) {
              response.json().then((responseData) => {
                handleOpenSnackbar(responseData.error);
              }).catch((_error) => {
                handleOpenSnackbar();
              });
            } else{
              response.json().then((responseData) => {
                handleClose();
                setRefresh();
              }).catch((_error) => {
                handleOpenSnackbar();
              });
            }
          }).catch((_error) => {
            handleOpenSnackbar();
          });
        }
    },
  });

  useEffect(() => { setMessageReal(formik.values.message) }, [formik.values.message]);

  function getProfilePic(username: string) {
    return usersList.find((user) => user.username === username)?.profilePicture;
  }

  const renderForm = (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          name="receivers"
          label="Receivers"
          select
          required
          error={formik.touched.receivers && Boolean(formik.errors.receivers)}
          helperText={formik.touched.receivers && formik.errors.receivers}
          onBlur={formik.handleBlur}
          SelectProps={{
            multiple: true,
            value: receivers,
            onChange: (event: SelectChangeEvent<unknown>) => handleSelectChange(event as SelectChangeEvent<string[]>),
            onClose: () => setSearchText(""),
            readOnly: Boolean(receiversValue),
            renderValue: (selected: any) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                  {selected.map((value: any) => (
                    <Chip key={value} label={value} variant={Boolean(receiversValue)?'outlined':'filled'} avatar={<Avatar src={getProfilePic(value)} alt={value} />} onDelete={Boolean(receiversValue) ? undefined : ()=>handleSelectDelete(value)}  onMouseDown={(event) => {
                        event.stopPropagation();
                      }} />
                  ))}
                </Box>
              ),
            MenuProps: MenuProps,
          }}
        >
        {
            <ListSubheader>
                <TextField
                size="small"
                autoFocus
                placeholder="Type to search..."
                fullWidth
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                    )
                }}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key !== "Escape") {
                        e.stopPropagation();
                    }
                }}
                />
            </ListSubheader>
        }
        {displayedOptions.map((option, i) => (
            <MenuItem key={i} value={option.username} style={getStyles(option.username, receivers, theme)}>
                {option.username}
            </MenuItem>
        ))}
        </TextField>
        <TextField 
          name="subject"
          label="Subject"
          value={formik.values.subject}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.subject && Boolean(formik.errors.subject)}
          helperText={formik.touched.subject && formik.errors.subject}
          required
        />
        <TextField
          name="message"
          label="Message"
          multiline
          type='textArea'
          minRows={6}
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.message && Boolean(formik.errors.message)}
          helperText={formik.touched.message && formik.errors.message}
          required
        />

        <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }} />
      </Stack>

      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        disabled={!formik.isValid}
        endIcon={<Icon aria-label='send' fontSize='small'><SendIcon sx={{ display: 'flex'  }} fontSize='inherit'/></Icon>}
      > Send </Button>
    </form>
  );

  return (
    <>
      <Box
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0.9),
            imgUrl: '/assets/backgrounds/overlay_4.jpg',
          }),
          height: 1,
          background: 'transparent !important',
        }}
      >
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, md: 24 },
            left: { xs: 16, md: 24 },
          }}
        />

        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <Card
            sx={{
              p: 5,
              width: 1,
              maxWidth: 420,
            }}
          >
            <Typography variant="h4" sx={{marginBottom: 3}}>Send a message</Typography>

            {renderForm}
          </Card>
        </Stack>
      </Box>
      <TransitionSnackbar open={openSnackbar} onClose={handleCloseSnackbar} message={errorData} autoHideDuration={6000} />
    </>
  );
}