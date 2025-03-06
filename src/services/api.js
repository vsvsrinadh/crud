import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Initialize localStorage with data from JSONPlaceholder
const initializeLocalStorage = async () => {
  if (!localStorage.getItem('users')) {
    try {
      const response = await axios.get(`${BASE_URL}/users`);
      localStorage.setItem('users', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error initializing data:', error);
      localStorage.setItem('users', JSON.stringify([]));
    }
  }
};

const api = {
  getUsers: async () => {
    await initializeLocalStorage();
    return JSON.parse(localStorage.getItem('users') || '[]');
  },

  createUser: async (userData) => {
    try {
      // Simulate API call
      const response = await axios.post(`${BASE_URL}/users`, userData);
      
      // Update localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const newUser = {
        ...userData,
        id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1
      };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  updateUser: async (id, userData) => {
    try {
      // Simulate API call
      await axios.put(`${BASE_URL}/users/${id}`, userData);
      
      // Update localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const index = users.findIndex(user => user.id === id);
      if (index !== -1) {
        users[index] = { ...users[index], ...userData };
        localStorage.setItem('users', JSON.stringify(users));
      }
      return users[index];
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      // Simulate API call
      await axios.delete(`${BASE_URL}/users/${id}`);
      
      // Update localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const filteredUsers = users.filter(user => user.id !== id);
      localStorage.setItem('users', JSON.stringify(filteredUsers));
      
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
};

export default api;