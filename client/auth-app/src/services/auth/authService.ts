import {
  LoginCredentials,
  SignupCredentials,
  ResetPasswordCredentials,
  User,
} from '../../types/auth';

// This would be replaced with actual API calls in a real application
const API_DELAY = 1000;

/**
 * Authentication service for handling API calls
 */
export const authService = {
  /**
   * Login user
   */
  login: async (credentials: LoginCredentials): Promise<User> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, API_DELAY));

    if (
      credentials.email === 'test@example.com' &&
      credentials.password === 'password'
    ) {
      const user: User = {
        id: '1',
        email: credentials.email,
        name: 'Test User',
      };
      return user;
    } else {
      throw new Error('Invalid email or password');
    }
  },

  /**
   * Sign up user
   */
  signup: async (credentials: SignupCredentials): Promise<User> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, API_DELAY));

    if (credentials.password !== credentials.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Simulate successful signup
    const user: User = {
      id: '1',
      email: credentials.email,
      name: credentials.name,
    };
    return user;
  },

  /**
   * Reset password
   */
  resetPassword: async (
    credentials: ResetPasswordCredentials
  ): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, API_DELAY));

    // Simulate successful password reset request
    console.log(`Password reset requested for email: ${credentials.email}`);
    return;
  },
};
