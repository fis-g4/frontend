import { useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from '../../routes/hooks/usePathname';

import { NAV } from './config-layout';
import navConfig from './config-navigation';
import RouterLink from '../../routes/components/router-link';
import Logo from '../../components/logo/logo';
import { useResponsive } from '../../hooks/useResponsive';
import Scrollbar from '../../components/scrollbar/scrollbar';
import { useAuth } from '../../hooks/useAuth';

export default function Nav({ openNav, onCloseNav } : { openNav: boolean; onCloseNav: () => void }) {
  const pathname = usePathname();

  const upLg = useResponsive('up', 'lg');

  const { authUser } = useAuth();

  useEffect(() => {
    {console.log(authUser.user?.profilePicture)}
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={authUser.user?.profilePicture || 'assets/images/broken-avatar.svg'} alt="profilePicture" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{authUser.user?.firstName} {authUser.user?.lastName}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {authUser.user?.plan} account
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {authUser.user?.coinsAmount} coins
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const renderUpgrade = (
    authUser.user?.plan.toLowerCase().trim() !== 'premium' && (
    <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
      <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
        <Box
          component="img"
          src="/assets/illustrations/illustration_avatar.png"
          sx={{ width: 100, position: 'absolute', top: -50 }}
        />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6">Want more?</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            From only {authUser.user?.plan.toLowerCase().trim() === 'free' ? '$4.99/month' : '$29.99/month'}
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="inherit"
          href='/plans'
          component={RouterLink}
        >
          Upgrade to {authUser.user?.plan.toLowerCase().trim() === 'free' ? 'Pro' : 'Premium'}
        </Button>
      </Stack>
    </Box>
  ));

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4 }} />

      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />

      {renderUpgrade}
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};


function NavItem({ item } : { item: { path: string; icon: any; title: string }}) {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
