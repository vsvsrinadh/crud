import React, { useState } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh(prev => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg">
        <UserForm setRefresh={triggerRefresh} />
        <UserList refresh={refresh} setRefresh={triggerRefresh} />
      </Container>
    </ThemeProvider>
  );
}

export default App;