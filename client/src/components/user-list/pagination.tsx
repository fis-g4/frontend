import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';

const UserListPagination = styled(Pagination)({
  position: 'fixed',
  bottom: 16,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 999,
})

export default UserListPagination;
