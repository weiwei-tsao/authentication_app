import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Avatar,
} from '@mui/material';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { authState, logout } = useAuth();
  const { isAuthenticated, user } = authState;
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated || !user) {
    return null; // Will redirect via the useEffect
  }

  return (
    <Container component='main' maxWidth='md'>
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
              <FiUser />
            </Avatar>
            <Typography component='h1' variant='h4'>
              Welcome, {user.username || user.email}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              variant='outlined'
              color='primary'
              startIcon={<FiLogOut />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>

          <Typography variant='body1' paragraph>
            You are now logged in to your account. This is a protected dashboard
            page.
          </Typography>

          <Typography variant='body1' paragraph>
            Your email: <strong>{user.email}</strong>
          </Typography>

          <Typography variant='body2' color='text.secondary' sx={{ mt: 4 }}>
            This is a simple dashboard. In a real application, you would see
            your user data and application features here.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard;
