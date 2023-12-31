import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { rows } from '../../_mocks/messages';
import { MessagesRow } from '../messages-row/messages-row';

export interface MessagesColumn {
  id: 'sender' | 'receivers' | 'subject' | 'date';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: string) => string;
  bold?: boolean;
}

export interface MessagesRowInterface {
  id: string;
  sender: string;
  receivers: string[];
  subject: string;
  message: string;
  date: string;
  has_been_opened: boolean[];
  deleted_by_sender: boolean;
  deleted_by_receiver: boolean[];
}

export default function MessagesBox({ columns } : { columns: MessagesColumn[] }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <MessagesRow columns={columns} row={row} />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
