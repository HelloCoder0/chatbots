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

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // const response = await api.post('/auth/register', {
      //   name: formData.name,
      //   email: formData.email,
      //   password: formData.password
      // });
      // localStorage.setItem('token', response.data.token);
      
      // Temporary mock registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Registration successful!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      toast.error('Registration failed');
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
          Register
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />

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
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
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
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
          </Button>
        </form>

        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Already have an account?{' '}
          <Link
            component="button"
            onClick={() => navigate('/login')}
            sx={{ cursor: 'pointer' }}
          >
            Login here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;