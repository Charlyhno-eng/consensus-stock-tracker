import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { Box, ClickAwayListener, Grow, Paper, Popper, MenuList, MenuItem } from '@mui/material';

type MobileMenuProps = {
  isEurope: boolean;
  isAmerique: boolean;
}

export default function MobileMenu({ isEurope, isAmerique }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) return;
    setOpen(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab' || event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
    }
  };

  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <Box>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        sx={{
          mr: 1,
          mb: 1,
          color: 'white',
          borderColor: '#6c5ce7',
          backgroundColor: 'transparent',
          '&:hover': { backgroundColor: '#6c5ce7' },
          textTransform: 'none',
        }}
        variant="outlined"
      >
        Marchés
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        style={{ zIndex: 1300 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom' }}
          >
            <Paper sx={{ bgcolor: '#2c2c54', color: 'white', minWidth: 180 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem
                    onClick={handleClose}
                    sx={{ '&:hover': { backgroundColor: '#6c5ce7', color: 'white' } }}
                  >
                    <Link href="/" passHref>
                      <Button
                        fullWidth
                        variant={isEurope ? 'contained' : 'text'}
                        sx={{ textAlign: 'left', color: isEurope ? 'white' : 'inherit', textTransform: 'none' }}
                      >
                        Marché européen
                      </Button>
                    </Link>
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    sx={{ '&:hover': { backgroundColor: '#6c5ce7', color: 'white' } }}
                  >
                    <Link href="/amerique" passHref>
                      <Button
                        fullWidth
                        variant={isAmerique ? 'contained' : 'text'}
                        sx={{ textAlign: 'left', color: isAmerique ? 'white' : 'inherit', textTransform: 'none' }}
                      >
                        Marché américain
                      </Button>
                    </Link>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}
