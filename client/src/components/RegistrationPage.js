import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Paper, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../theme'; // Ensure the correct path to your theme tokens

function RegistrationPage() {
  const [registrationData, setRegistrationData] = useState({
    cfname: '',
    clname: '',
    cstreet: '',
    ccity: '',
    czip: '',
    cstate: '',
    username: '',
    password: ''
  });
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRegistration = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/login');
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Failed to register. Please try again later.');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={6} sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 3,
        backgroundColor: theme.palette.background.default
      }}>
        <Typography component="h1" variant="h5" sx={{ color: colors.blueAccent[500] }}>
          Register
        </Typography>
        <Box component="form" onSubmit={(e) => {
          e.preventDefault();
          handleRegistration();
        }} sx={{ mt: 1, width: '100%' }}>
          {Object.keys(registrationData).map(key => (
            <TextField
              key={key}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              name={key}
              value={registrationData[key]}
              onChange={handleInputChange}
              type={key === 'password' ? 'password' : 'text'}
              autoComplete="off"
              sx={{ borderColor: colors.gray[300] }}
            />
          ))}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, bgcolor: theme.palette.primary.main }}
          >
            Submit
          </Button>
        </Box>
        <Typography variant="body2">
          Already registered? 
          <Link href="/login" color="secondary">
            Login Here
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default RegistrationPage;
