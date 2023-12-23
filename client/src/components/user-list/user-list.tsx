import { useState } from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Grid, Box, useTheme, alpha, Typography } from '@mui/material';
import { users } from '../../_mocks/users';
import UserListPagination from './pagination';
import { useResponsive } from '../../hooks/useResponsive';
import RouterLink from '../../routes/components/router-link';

const USERS_PER_PAGE = 18;

function UserList() {
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(users.length / USERS_PER_PAGE);

  const pageUsers = users.slice((page - 1) * USERS_PER_PAGE, page * USERS_PER_PAGE);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const isSmall = useResponsive('down', 'md');
  const theme = useTheme();
  return (
    <div>
      <Grid container spacing={2} justifyContent={isSmall ? "center" : "flex-start"}>
          {pageUsers.map((user) => (
            <Grid item xs={isSmall ? 12: 6} key={user.id}>
              <List>
                <ListItem component={RouterLink} href="/me" sx={{textDecoration: 'none',color:'inherit',borderRadius:3,backgroundColor: alpha(theme.palette.grey[500],0.16)}}> {/*TODO: MODIFICAR LINK */}
                  <ListItemAvatar>
                    <Avatar src={user.photoUrl} />
                  </ListItemAvatar>
                  <ListItemText 
                  primary={isSmall ? <Typography noWrap>{user.username}</Typography> :
                    <Box display="flex" alignItems="center">
                        <Typography noWrap sx={{marginRight:1}}>{user.firstName} </Typography>
                        <Typography noWrap sx={{marginRight:0.5}}>{user.lastName} | </Typography>
                        <Typography noWrap sx={{marginRight:1}}>{user.username} </Typography>
                    </Box>} 
                  secondary={`Plan: ${user.plan} | Email: ${user.email}`}
                />
                </ListItem>
              </List>
            </Grid>
          ))}
        </Grid>
        <Box display="flex" justifyContent="center" mt={4}>
          <UserListPagination count={pageCount} page={page} onChange={handleChangePage} />
        </Box>
      </div>
    )
  }
  

export default UserList;
