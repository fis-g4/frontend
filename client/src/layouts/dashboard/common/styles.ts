import { styled } from '@mui/material/styles';
import { bgBlur } from '../../../theme/css';

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

export const StyledSearchbar = styled('div')(({ theme }) => ({
    ...bgBlur({
      color: theme.palette.background.default,
    }),
    top: 0,
    left: 0,
    zIndex: 99,
    width: '100%',
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    height: HEADER_MOBILE,
    padding: theme.spacing(0, 3),
    boxShadow: theme.shadows[10],
    [theme.breakpoints.up('md')]: {
      height: HEADER_DESKTOP,
      padding: theme.spacing(0, 5),
    },
  }));