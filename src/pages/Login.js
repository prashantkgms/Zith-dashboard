import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginFormSuccess } from '../redux/authSlice';  // Import the loginFormSuccess thunk action
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Grid, Paper } from '@mui/material';
import { getUsers } from '../api/authApi';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validate email
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  // Validate password
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let valid = true;
    let errorMessages = { email: '', password: '' };
    const filteredUser = users.find(user => user.email === email)

    // Validate email
    if (!email || !validateEmail(email)) {
      valid = false;
      errorMessages.email = 'Please enter a valid email address.';
    }

    // Validate password
    if (!password || !validatePassword(password)) {
      valid = false;
      errorMessages.password = 'Password must be at least 6 characters long.';
    }
    if (filteredUser && email && password && filteredUser.password !== password)
    {
      valid = false;
      errorMessages.password = 'Invalid password, please try again';
    }

    // If invalid, set error messages
    if (!valid) {
      setErrors(errorMessages);
    } else {
      // Clear error messages if the form is valid
        setErrors({ email: '', password: '' });
        
        if (filteredUser) {
            console.log("if situtauion")
            dispatch(loginFormSuccess(filteredUser))
            sessionStorage.setItem('token', filteredUser.token);
            console.log("hitting")
            navigate('/dashboard')
        }
        else
        {
            console.error('Error during login:', error);
            setErrors({ email: '', password: 'Invalid email or password.' });
        }
    }
      
  };


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers();
        setUsers(userData);
      } catch (err) {
        setError('Error fetching posts');
      } finally {
        console.log("Users fetched.");
      }
    };

    fetchUsers();
  }, []);
  console.log(users, "users")
  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            Welcome to Zith
          </Typography>
          
          <Typography variant="h6" component="h3" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={3}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Box>

            <Box mb={3}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Box>

            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
              sx={{ padding: '12px' }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
