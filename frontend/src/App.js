import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Components
import ChatInterface from './components/ChatInterface';
import Login from './pages/Login';
import Register from './pages/Register';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import FAQManagement from './pages/FAQManagement';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Chat
          </Button>
          <Button color="inherit" component={Link} to="/manage">
            Manage FAQs
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<ChatInterface />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/manage" element={<FAQManagement />} />2
      </Routes>
    </Router>
  );
}

export default App;
