import { AppBar, Badge, Box, Button, IconButton, Stack, Toolbar, Typography, styled } from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
// components
import { IconBellRinging, IconMenu, IconLogout } from '@tabler/icons-react';
import Profile from './Profile';
import { useAuth } from '@/contexts/AuthContext';

interface ItemType {
  toggleMobileSidebar:  (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({toggleMobileSidebar}: ItemType) => {
  const { user, signOutUser } = useAuth();

  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>


        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
        >
          <Badge variant="dot" color="primary">
            <IconBellRinging size="21" stroke="1.5" />
          </Badge>

        </IconButton>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          {user ? (
            <>
              <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                Welcome, {user.displayName || user.email}
              </Typography>
              <IconButton
                onClick={handleSignOut}
                color="inherit"
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                  },
                }}
              >
                <IconLogout size="20" />
              </IconButton>
            </>
          ) : (
            <Button
              variant="contained"
              component={Link}
              href="/authentication/login"
              disableElevation
              sx={{
                backgroundColor: "#2c7873",
                color: "#fff",
                '&:hover': {
                  backgroundColor: "#256d63",
                },
              }}
            >
              Login
            </Button>
          )}
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
