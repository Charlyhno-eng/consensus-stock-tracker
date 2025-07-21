"use client";

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isAmerique = pathname === '/amerique';
  const isEurope = pathname === '/';

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <Link href="/" passHref>
          <Button
            variant={isEurope ? 'contained' : 'outlined'}
            color="primary"
            sx={{ mr: 2 }}
          >
            Marché européen
          </Button>
        </Link>
        <Link href="/amerique" passHref>
          <Button
            variant={isAmerique ? 'contained' : 'outlined'}
            color="primary"
          >
            Marché américain
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
