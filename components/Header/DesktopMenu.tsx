import React from 'react';
import Button from '@mui/material/Button';
import Link from 'next/link';

type DesktopMenuProps = {
  isEurope: boolean;
  isAmerique: boolean;
}

export default function DesktopMenu({ isEurope, isAmerique }: DesktopMenuProps) {
  return (
    <>
      <Link href="/" passHref>
        <Button
          variant={isEurope ? 'contained' : 'outlined'}
          sx={{
            mr: 2,
            borderColor: '#6c5ce7',
            color: 'white',
            backgroundColor: isEurope ? '#6c5ce7' : 'transparent',
            '&:hover': {
              backgroundColor: '#6c5ce7'
            },
            textTransform: 'none'
          }}
        >
          Marché européen
        </Button>
      </Link>
      <Link href="/amerique" passHref>
        <Button
          variant={isAmerique ? 'contained' : 'outlined'}
          sx={{
            borderColor: '#6c5ce7',
            color: 'white',
            backgroundColor: isAmerique ? '#6c5ce7' : 'transparent',
            '&:hover': {
              backgroundColor: '#6c5ce7'
            },
            textTransform: 'none'
          }}
        >
          Marché américain
        </Button>
      </Link>
    </>
  );
}
