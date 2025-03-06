import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ marginBottom: 4 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 'bold' }}
          >
            User Management System
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;