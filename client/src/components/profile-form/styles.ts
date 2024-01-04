import { styled } from '@mui/material/styles';
import { Badge } from '@mui/material';
import background from '../../static/icons/edit.svg'

export const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: `${theme.palette.primary.dark}`,
      color: `${theme.palette.primary.dark}`,
      boxShadow: `0 0 0 5px ${theme.palette.background.paper}`,
      width: '35px',
      height: '35px',
      borderRadius: '50%',
      backgroundImage: `url(${background})`,
      backgroundSize: '20px',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      cursor: 'pointer',
      '&:hover::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '2px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
}));