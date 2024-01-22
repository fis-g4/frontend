import { Avatar, AvatarGroup, Badge, Box, Button, Collapse, IconButton, TableCell, TableRow, Tooltip, Typography } from "@mui/material";
import { MessagesColumn, MessagesRowInterface } from "../messages-box/messages-box";
import { fDateTime } from "../../utils/format-time";
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from "../../hooks/useAuth";
import TransitionDialog from "../transition-dialog/transition-dialog";
import TransitionModal from "../transition-modal/transition-modal";
import MessageNewForm from "../../message-new-form/message-new-form";
import { useMessagesApi } from "../../api/useMessagesApi";
import TransitionSnackbar from "../transition-snackbar/transition-snackbar";

export function MessagesRow({ row, columns, usersList, setRefresh } : Readonly<{ row: MessagesRowInterface, columns: MessagesColumn[], usersList: {username: string, profilePicture: string}[], setRefresh: ()=>void }>) {

    const [open, setOpen] = useState(false);
    const { authUser } = useAuth();
    const [isNew, setIsNew] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorData, setErrorData] = useState('');
    const { openMessage, deleteMessage } = useMessagesApi();

    useEffect(() => {
        if (authUser.user === null) return;
        setIsNew(row.has_been_opened[row.receivers.indexOf(authUser.user.username)]===false);
        if (row.sender === authUser.user.username && !row.has_been_opened.includes(true) && !row.deleted_by_sender && !row.deleted_by_receiver.includes(true)){
            setIsEditable(true);
        }
    }, []);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }

    const handleOpenSnackbar = (error?: string) => {
        setOpenSnackbar(true);
        setErrorData(error || 'There was an error deleting the message. Please try later.');
    }

    const createAvatarGroup = (users: string[]) => {
        return (
            <AvatarGroup max={4} total={users.length} sx={{ justifyContent: 'start' }}>
                {users.map((user, i) => (
                    <Tooltip title={user} arrow>
                        <Avatar key={i} src={usersList.filter(u => u.username===user)[0].profilePicture} alt={user} />
                    </Tooltip>
                ))}
            </AvatarGroup>
        )
    };

    const createDate = (column: MessagesColumn, date: string) => {
        if (column.format === undefined) return  date;
        return(
            <Tooltip title={fDateTime(date, 'dd MMM yyyy p')} arrow>
                <Typography variant="body2" sx={isNew&&column.bold?{fontWeight: 'bold'}:{}} >{column.format(date)}</Typography>
            </Tooltip>
        )
    }

    const renderIcon = (
        <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleOpenMessage}
        >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
    )

    function handleOpenMessage() {
        if (!isNew){
            setOpen(!open);
        } else{
            openMessage(row._id).then((response) => {
                if(response.ok) {
                    setOpen(!open);
                    setIsNew(false);
                } else{
                    response.json().then((responseData: any) => {
                        handleOpenSnackbar(responseData.error);
                    }).catch((_error) => {
                        handleOpenSnackbar('There was an error opening the message. Please try later.');
                    });
                }
            }).catch((_error) => {
                handleOpenSnackbar('There was an error opening the message. Please try later.');
            });
        }
    }


    const handleOpenModal = () => setOpenModal(true);

    const handleCloseModal = () => setOpenModal(false);

    const handleDeleteMessage = () => {
        setOpenDialog(true);
    }

    const handleAcceptDialog = () => {
        deleteMessage(row._id).then((response) => {
            if(response.ok) {
                setOpenDialog(false);
                setRefresh();
            } else{
                response.json().then((responseData: any) => {
                    handleOpenSnackbar(responseData.error);
                }).catch((_error) => {
                    handleOpenSnackbar();
                });
            }
        }).catch((_error) => {
            handleOpenSnackbar();
        });
    }

    const handleCancelDialog = () => {
        setOpenDialog(false);
    }

    const actionDialog = (
        <>
            <Button onClick={handleCancelDialog}>Cancel</Button>
            <Button onClick={handleAcceptDialog}>Delete</Button>
        </>
    );

    return (
        <>
            <TableRow hover role="checkbox" tabIndex={-1} key={row._id} sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    {isNew?
                        <Badge color="primary" badgeContent="!">
                            {renderIcon}
                        </Badge>
                    :
                        renderIcon
                    }
                </TableCell>
                {columns.map((column) => {
                    const value = row[column.id];
                    return (
                    <TableCell key={column.id} align={column.align} sx={isNew&&column.bold?{fontWeight: 'bold'}:{}}>
                        {column.format && typeof value === 'string'
                        ? createDate(column, value)
                        : Array.isArray(value) ? createAvatarGroup(value) : value}
                    </TableCell>
                    );
                })}
                <TableCell>
                    {isEditable &&
                        <IconButton aria-label="edit" size="small" onClick={handleOpenModal}>
                            <EditIcon fontSize="inherit" />
                        </IconButton>
                    }
                    <IconButton aria-label="delete" size="small" onClick={handleDeleteMessage}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        {row.message.split("\n").map((line, i) => (<Typography key={`line-${i}`} variant="body2" gutterBottom>{line}</Typography>))}
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
            <TransitionDialog 
                open={openDialog}
                handleClose={handleCancelDialog}
                title='Delete this message'
                children='Are you sure you want to delete this message? This action cannot be undone.'
                action={actionDialog}
            />
            <TransitionModal open={openModal} handleClose={handleCloseModal} sx={{ maxWidth: 500, width: '100%' }}>
                <MessageNewForm messageId={row._id} receiversValue={row.receivers} subjectValue={row.subject} messagesValue={row.message} usersList={usersList} handleClose={handleCloseModal} setRefresh={setRefresh} />
            </TransitionModal>
            <TransitionSnackbar open={openSnackbar} onClose={handleCloseSnackbar} message={errorData} autoHideDuration={6000} />
        </>
    )
}