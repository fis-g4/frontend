import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { MessagesRow } from '../messages-row/messages-row';
import { useMessagesApi } from '../../api/useMessagesApi';
import TransitionSnackbar from '../transition-snackbar/transition-snackbar';

export interface MessagesColumn {
  id: 'sender' | 'receivers' | 'subject' | 'date';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: string) => string;
  bold?: boolean;
}

export interface MessagesRowInterface {
  _id: string;
  sender: string;
  receivers: string[];
  subject: string;
  message: string;
  date: string;
  has_been_opened: boolean[];
  deleted_by_sender: boolean;
  deleted_by_receiver: boolean[];
}

export default function MessagesBox({ columns, filter, usersList, refresh, setRefresh } : { columns: MessagesColumn[], filter: 'UNREAD' | 'SENT' | 'RECEIVED', usersList: {username: string, profilePicture: string}[], refresh: boolean, setRefresh: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [messagesList, setMessagesList] = useState<MessagesRowInterface[]>([]);
  const [total, setTotal] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorData, setErrorData] = useState('');
  const { getMessagesMe } = useMessagesApi();

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  const handleOpenSnackbar = (error?: string) => {
    setOpenSnackbar(true);
    setErrorData(error || 'There was an error retrieving the messages. Please try later.');
  }

  useEffect(() => {
    const queryParams = new URLSearchParams({
      offset: (page*rowsPerPage).toString(),
      limit: rowsPerPage.toString(),
      filter: filter,
      sort: 'DESC'
    });
    getMessagesMe(queryParams).then((response) => {
      if(response.ok) {
        response.json().then((dataResponse) => {
          setTotal(dataResponse.data.total);
          setMessagesList(dataResponse.data.messages);
        }).catch((_error) => {
          handleOpenSnackbar();
        });
      } else{
        response.json().then((responseData: any) => {
          handleOpenSnackbar(responseData.error);
        }).catch((_error) => {
          handleOpenSnackbar();
        });
      }
    }).catch((error) => {
      handleOpenSnackbar();
    });
  }, [rowsPerPage, page, filter, refresh]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold', backgroundColor: '#ECECEC' }}/>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{ color: 'text.secondary', fontWeight: 'bold', backgroundColor: '#ECECEC' }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold', backgroundColor: '#ECECEC' }}/>
            </TableRow>
          </TableHead>
          <TableBody>
            {messagesList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <MessagesRow key={i} columns={columns} row={row} usersList={usersList} setRefresh={()=> setRefresh(!refresh)} />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <TransitionSnackbar open={openSnackbar} onClose={handleCloseSnackbar} message={errorData} autoHideDuration={6000} />
    </Paper>
  );
}
