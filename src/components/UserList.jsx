import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  Box,
  Chip,
  CircularProgress
} from '@mui/material';
import { Delete, Edit, Language, Phone, Email } from '@mui/icons-material';
import api from '../services/api';
import UserForm from './UserForm';

const UserList = ({ refresh, setRefresh }) => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await api.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      await api.deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
      setRefresh(prev => !prev);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditUser(null);
    fetchUsers();
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" m={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {user.name}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    icon={<Email />}
                    label={user.email}
                    size="small"
                    sx={{ mb: 1, mr: 1 }}
                  />
                  {user.phone && (
                    <Chip
                      icon={<Phone />}
                      label={user.phone}
                      size="small"
                      sx={{ mb: 1, mr: 1 }}
                    />
                  )}
                  {user.website && (
                    <Chip
                      icon={<Language />}
                      label={user.website}
                      size="small"
                      sx={{ mb: 1 }}
                    />
                  )}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto' }}>
                  <IconButton
                    onClick={() => handleEdit(user)}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(user.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <UserForm
          editUser={editUser}
          setRefresh={setRefresh}
          onClose={handleCloseDialog}
        />
      </Dialog>
    </>
  );
};

export default UserList;