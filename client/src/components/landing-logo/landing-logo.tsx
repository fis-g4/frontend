import PropTypes, { InferProps } from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import RouterLink from '../../routes/components/router-link';

type LandingLogoProps = {
  disabledLink?: boolean;
  sx?: object;
};

const LandingLogo = forwardRef(({ disabledLink = false, sx, ...other }: InferProps<LandingLogoProps>, ref) => {
  const logo = (
    <Box
      ref={ref}
      component="img"
      src="./assets/logoLanding.svg"
      sx={{ maxWidth: 150, height: 'inherit', cursor: 'pointer', alignSelf: 'center', margin: '0 !important', ...sx }}
      {...other}
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

LandingLogo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default LandingLogo;
