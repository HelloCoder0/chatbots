import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  Link,
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: Replace with actual API call
      // const response = await api.post('/auth/login', formData);
      // localStorage.setItem('token', response.data.token);
      
      // Temporary mock login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{ mb: 2, py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </form>

        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link
            component="button"
            onClick={() => navigate('/register')}
            sx={{ cursor: 'pointer' }}
          >
            Register here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;