"use client";

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { usePathname } from 'next/navigation';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';

export default function Header() {
  const pathname = usePathname();
  const isAmerique = pathname === '/amerique';
  const isEurope = pathname === '/';

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar
      position="static"
      elevation={4}
      sx={{ background: 'linear-gradient(145deg, #1e1e2f, #2c2c54)', borderBottom: '1px solid #6c5ce7' }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
        <Typography variant="h5" component="div" sx={{ color: 'white', fontWeight: 700 }}>
          Consensus Stock Tracker
        </Typography>

        <Box>
          {isMobile ? (
            <MobileMenu isEurope={isEurope} isAmerique={isAmerique} />
          ) : (
            <DesktopMenu isEurope={isEurope} isAmerique={isAmerique} />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
