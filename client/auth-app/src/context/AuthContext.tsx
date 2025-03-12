import { createContext, useReducer, ReactNode, useEffect } from 'react';
import {
  AuthState,
  AuthContextType,
  LoginCredentials,
  SignupCredentials,
  ResetPasswordCredentials,
  User,
} from '../types/auth';

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Create context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Action types
type AuthAction =
  | { type: 'LOGIN_REQUEST' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'SIGNUP_REQUEST' }
  | { type: 'SIGNUP_SUCCESS'; payload: User }
  | { type: 'SIGNUP_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'RESET_PASSWORD_REQUEST' }
  | { type: 'RESET_PASSWORD_SUCCESS' }
  | { type: 'RESET_PASSWORD_FAILURE'; payload: string }
  | { type: 'CLEAR_ERROR' };

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'SIGNUP_REQUEST':
    case 'RESET_PASSWORD_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case 'LOGIN_FAILURE':
    case 'SIGNUP_FAILURE':
    case 'RESET_PASSWORD_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    case 'RESET_PASSWORD_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (_error) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      // This would be replaced with an actual API call
      // For now, we'll simulate a successful login with a fake user
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

      if (
        credentials.email === 'test@example.com' &&
        credentials.password === 'password'
      ) {
        const user: User = {
          id: '1',
          email: credentials.email,
          name: 'Test User',
        };

        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload:
          error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  };

  // Signup function
  const signup = async (credentials: SignupCredentials) => {
    dispatch({ type: 'SIGNUP_REQUEST' });
    try {
      // This would be replaced with an actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

      if (credentials.password !== credentials.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Simulate successful signup
      const user: User = {
        id: '1',
        email: credentials.email,
        name: credentials.name,
      };

      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'SIGNUP_SUCCESS', payload: user });
    } catch (error) {
      dispatch({
        type: 'SIGNUP_FAILURE',
        payload:
          error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  // Reset password function
  const resetPassword = async (credentials: ResetPasswordCredentials) => {
    dispatch({ type: 'RESET_PASSWORD_REQUEST' });
    try {
      // This would be replaced with an actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

      // Simulate successful password reset request
      dispatch({ type: 'RESET_PASSWORD_SUCCESS' });
    } catch (_error) {
      dispatch({
        type: 'RESET_PASSWORD_FAILURE',
        payload: 'Failed to reset password. Please try again.',
      });
    }
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        signup,
        logout,
        resetPassword,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
