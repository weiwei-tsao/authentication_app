import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
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
} from '@mui/material';
import { FiMail } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import { ResetPasswordCredentials } from '../types/auth';

const ForgotPassword = () => {
  const { authState, resetPassword, clearError } = useAuth();
  const { isLoading, error } = authState;
  const [resetSent, setResetSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordCredentials>();

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      if (error) {
        clearError();
      }
    };
  }, []);

  const onSubmit: SubmitHandler<ResetPasswordCredentials> = async (data) => {
    try {
      await resetPassword(data);
      setResetSent(true);
    } catch {
      // Error is handled by the auth context
    }
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
            Reset Password
          </Typography>

          {error && (
            <Alert severity='error' sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {resetSent ? (
            <Box sx={{ mt: 2 }}>
              <Alert severity='success' sx={{ mb: 2 }}>
                Password reset instructions have been sent to your email.
              </Alert>
              <Link to='/login' style={{ textDecoration: 'none' }}>
                <Button fullWidth variant='contained' sx={{ mt: 2, mb: 2 }}>
                  Back to Login
                </Button>
              </Link>
            </Box>
          ) : (
            <Box
              component='form'
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <Typography variant='body2' color='text.secondary' paragraph>
                Enter your email address and we'll send you instructions to
                reset your password.
              </Typography>

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

              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2, py: 1.2 }}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Reset Password'}
              </Button>

              <Grid container justifyContent='center'>
                <Grid item>
                  <Link to='/login' style={{ textDecoration: 'none' }}>
                    <Typography variant='body2' color='primary'>
                      Remember your password? Sign in
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
