import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import api from '../services/api';

const UserForm = ({ editUser, setRefresh, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: ''
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (editUser) {
      setFormData(editUser);
    }
  }, [editUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editUser) {
        await api.updateUser(editUser.id, formData);
        setAlert({ open: true, message: 'User updated successfully!', severity: 'success' });
      } else {
        await api.createUser(formData);
        setAlert({ open: true, message: 'User created successfully!', severity: 'success' });
      }
      setFormData({ name: '', email: '', phone: '', website: '' });
      setRefresh(prev => !prev);
      setTimeout(() => {
        if (onClose) onClose();
      }, 1000);
    } catch (error) {
      setAlert({ open: true, message: 'Operation failed!', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {editUser ? 'Edit User' : 'Add New User'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          margin="normal"
          required
          disabled={loading}
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          margin="normal"
          required
          disabled={loading}
        />
        <TextField
          fullWidth
          label="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          margin="normal"
          required
          disabled={loading}
        />
        <TextField
          fullWidth
          label="Website"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          margin="normal"
          disabled={loading}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            editUser ? 'Update User' : 'Add User'
          )}
        </Button>
      </Box>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default UserForm;