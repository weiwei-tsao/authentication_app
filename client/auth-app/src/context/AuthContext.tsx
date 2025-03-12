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

// Create context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);
  const initialCheckDone = useRef(false);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    // Only run this effect once to prevent infinite loops
    if (!initialCheckDone.current) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        } catch {
          // If there's an error parsing the stored user, remove it
          localStorage.removeItem('user');
        }
      }
      initialCheckDone.current = true;
    }
  }, []);

  // Login function - memoized with useCallback
  const login = useCallback(async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const user = await authService.login(credentials);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload:
          error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  }, []);

  // Signup function - memoized with useCallback
  const signup = useCallback(async (credentials: SignupCredentials) => {
    dispatch({ type: 'SIGNUP_REQUEST' });
    try {
      const user = await authService.signup(credentials);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'SIGNUP_SUCCESS', payload: user });
    } catch (error) {
      dispatch({
        type: 'SIGNUP_FAILURE',
        payload:
          error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  }, []);

  // Logout function - memoized with useCallback
  const logout = useCallback(() => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
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
