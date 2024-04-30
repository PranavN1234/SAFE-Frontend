import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import { Button, TextField, Typography, Container, Box, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../theme'; // Ensure the correct path to your theme tokens

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); // Access color tokens based on the theme mode

  const handleLogin = async (e) => {
    e.preventDefault();  // Prevent form from causing a page reload
    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        login({ username: data.username, customer_id: data.customer_id, fullname: data.fullname, is_admin: data.is_admin });
        navigate('/dashboard'); // Navigate to dashboard on success
      } else {
        setError(data.error); // Set error if not successful
      }
    } catch (err) {
      setError('Failed to connect to the server.'); // Handle server connection errors
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          backgroundColor: theme.palette.background.default, // Use themed background
        }}
      >
        <Typography component="h1" variant="h5" style={{ color: colors.blueAccent[500] }}>
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3, mb: 2,
              backgroundColor: colors.primary[500], // Use primary color from tokens
              '&:hover': {
                backgroundColor: colors.primary[700], // Darken button on hover
              }
            }}
          >
            Sign In
          </Button>
          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default LoginPage;
