import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { authState } = useAuth();
  const { isAuthenticated, isLoading } = authState;

  // If still loading, you might want to show a loading spinner
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  // If authenticated, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
