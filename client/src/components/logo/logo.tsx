import PropTypes, { InferProps } from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import RouterLink from '../../routes/components/router-link';


type LogoProps = {
  disabledLink?: boolean;
  sx?: object;
};

const Logo = forwardRef(({ disabledLink = false, sx, ...other }: InferProps<LogoProps>, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  const logo = (
    <Box
      component="img"
      src="./logo.svg"
      sx={{ width: 150, height: 150, cursor: 'pointer', alignSelf: 'center', margin: '0 !important', ...sx }}
    />
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
