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
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import { SignupCredentials } from '../types/auth';

const Signup = () => {
  const { authState, signup, clearError } = useAuth();
  const { isLoading, error, isAuthenticated } = authState;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupCredentials>();

  const password = watch('password', '');

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

  const onSubmit: SubmitHandler<SignupCredentials> = async (data) => {
    await signup(data);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
            Create Account
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
              fullWidth
              id='name'
              label='Full Name (Optional)'
              autoComplete='name'
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <FiUser />
                  </InputAdornment>
                ),
              }}
              {...register('name')}
            />

            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              autoComplete='email'
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
              autoComplete='new-password'
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

            <TextField
              margin='normal'
              required
              fullWidth
              label='Confirm Password'
              type={showConfirmPassword ? 'text' : 'password'}
              id='confirmPassword'
              autoComplete='new-password'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <FiLock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle confirm password visibility'
                      onClick={toggleShowConfirmPassword}
                      edge='end'
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2, py: 1.2 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Sign Up'}
            </Button>

            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link to='/login' style={{ textDecoration: 'none' }}>
                  <Typography variant='body2' color='primary'>
                    Already have an account? Sign in
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

export default Signup;
