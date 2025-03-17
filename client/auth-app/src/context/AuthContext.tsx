import {
  createContext,
  useReducer,
  ReactNode,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import {
  AuthContextType,
  LoginCredentials,
  SignupCredentials,
  ResetPasswordCredentials,
} from '../types/auth';
import { authReducer, initialState } from './authReducer';
import { authService } from '../services/auth/authService';
import {
  useLoginMutation,
  useRegisterMutation,
} from '../graphql/generated/auth';
import { apolloClient } from '../services/apolloClient';
// We'll use this import again when we implement client-side hashing
// import { hashPassword } from '../utils/crypto';

// Create context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [authState, dispatch] = useReducer(authReducer, initialState);
  const initialCheckDone = useRef(false);

  // Check if user is already logged in by making a query to the server
  useEffect(() => {
    // Only run this effect once to prevent infinite loops
    if (!initialCheckDone.current) {
      const checkAuthStatus = async () => {
        try {
          // Use a direct query to check if the user is authenticated
          const { data } = await apolloClient.query({
            query: authService.ME_QUERY,
            fetchPolicy: 'network-only', // Don't use cache for this critical auth check
          });

          if (data?.me) {
            // If we get a valid user response, the user is authenticated
            dispatch({ type: 'LOGIN_SUCCESS', payload: data.me });
          }
        } catch (error) {
          // If there's an error, the user is not authenticated
          console.error('Authentication check failed:', error);
        }
      };

      checkAuthStatus();
      initialCheckDone.current = true;
    }
  }, []);

  // Login function - memoized with useCallback
  const login = useCallback(
    async (credentials: LoginCredentials) => {
      dispatch({ type: 'LOGIN_REQUEST' });
      try {
        // We'll implement client-side hashing in a future update
        // const hashedPassword = await hashPassword(credentials.password);

        const response = await loginMutation({
          variables: {
            input: {
              email: credentials.email,
              password: credentials.password, // Send the original password for now
            },
          },
        });

        if (response.data?.login) {
          const { user } = response.data.login;

          // Create a user object that matches our User type
          const authUser = {
            id: user.id,
            email: user.email,
            username: user.username,
            avatarUrl: user.avatarUrl,
            isActive: user.isActive,
            isVerified: user.isVerified,
            lastLogin: user.lastLogin,
            lastPasswordChange: null, // Set a default value
          };

          // We no longer store the token in localStorage
          // The token is now stored in an HTTP-only cookie by the server
          dispatch({ type: 'LOGIN_SUCCESS', payload: authUser });
        } else {
          throw new Error('Login failed');
        }
      } catch (error) {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload:
            error instanceof Error
              ? error.message
              : 'An unknown error occurred',
        });
      }
    },
    [loginMutation]
  );

  // Signup function - memoized with useCallback
  const signup = useCallback(
    async (credentials: SignupCredentials) => {
      dispatch({ type: 'SIGNUP_REQUEST' });
      try {
        // We'll implement client-side hashing in a future update
        // const hashedPassword = await hashPassword(credentials.password);

        const response = await registerMutation({
          variables: {
            input: {
              email: credentials.email,
              username: credentials.username,
              password: credentials.password, // Send the original password for now
            },
          },
        });

        if (response.data?.register) {
          // Registration successful, now login
          await login({
            email: credentials.email,
            password: credentials.password,
          });
        } else {
          throw new Error('Registration failed');
        }
      } catch (error) {
        dispatch({
          type: 'SIGNUP_FAILURE',
          payload:
            error instanceof Error
              ? error.message
              : 'An unknown error occurred',
        });
      }
    },
    [registerMutation, login]
  );

  // Logout function - memoized with useCallback
  const logout = useCallback(async () => {
    try {
      // Call the logout mutation to clear the HTTP-only cookie
      await apolloClient.mutate({
        mutation: authService.LOGOUT_MUTATION,
      });
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Logout failed:', error);
      // Still clear the local state even if the server request fails
      dispatch({ type: 'LOGOUT' });
    }
  }, []);

  // Reset password function - memoized with useCallback
  const resetPassword = useCallback(
    async (credentials: ResetPasswordCredentials) => {
      dispatch({ type: 'RESET_PASSWORD_REQUEST' });
      try {
        await authService.resetPassword(credentials);
        dispatch({ type: 'RESET_PASSWORD_SUCCESS' });
      } catch (error) {
        dispatch({
          type: 'RESET_PASSWORD_FAILURE',
          payload:
            error instanceof Error
              ? error.message
              : 'Failed to reset password. Please try again.',
        });
      }
    },
    []
  );

  // Clear error function - memoized with useCallback
  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      authState,
      login,
      signup,
      logout,
      resetPassword,
      clearError,
    }),
    [authState, login, signup, logout, resetPassword, clearError]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
