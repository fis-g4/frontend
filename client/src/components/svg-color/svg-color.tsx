import PropTypes, { InferProps } from 'prop-types';
import { forwardRef, ReactNode } from 'react';

import Box, { BoxProps } from '@mui/material/Box';


type SvgColorProps = {
  src?: string;
  sx?: BoxProps['sx'];
  children?: ReactNode;
};

const SvgColor = forwardRef<HTMLSpanElement, SvgColorProps>(
  ({ src, sx, ...other }, ref) => (
    <Box
      component="span"
      className="svg-color"
      ref={ref}
      sx={{
        width: 24,
        height: 24,
        display: 'inline-block',
        bgcolor: 'currentColor',
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
      {...other}
    />
  )
);

SvgColor.propTypes = {
  src: PropTypes.string,
  sx: PropTypes.object,
} as InferProps<SvgColorProps>;

export default SvgColor;
