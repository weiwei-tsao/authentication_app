import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FiMail, FiLock } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import { LoginCredentials } from '../types/auth';

const Login = () => {
  const { authState, login, clearError } = useAuth();
  const { isLoading, error, isAuthenticated } = authState;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const onSubmit: SubmitHandler<LoginCredentials> = async (data) => {
    await login(data);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 2,
          }}
        >
          <Typography component='h1' variant='h5' align='center' gutterBottom>
            Sign In
          </Typography>

          {error && (
            <Alert severity='error' sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              autoComplete='email'
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <FiMail />
                  </InputAdornment>
                ),
              }}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              margin='normal'
              required
              fullWidth
              label='Password'
              type={showPassword ? 'text' : 'password'}
              id='password'
              autoComplete='current-password'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <FiLock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={toggleShowPassword}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2, py: 1.2 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>

            <Grid container>
              <Grid item xs>
                <Link to='/forgot-password' style={{ textDecoration: 'none' }}>
                  <Typography variant='body2' color='primary'>
                    Forgot password?
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link to='/signup' style={{ textDecoration: 'none' }}>
                  <Typography variant='body2' color='primary'>
                    {"Don't have an account? Sign Up"}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
