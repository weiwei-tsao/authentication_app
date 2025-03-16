import { ResetPasswordCredentials, User } from '../../types/auth';
import { gql } from '@apollo/client';

// GraphQL Queries and Mutations
const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      username
      avatarUrl
      isActive
      isVerified
      lastLogin
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      success
      message
    }
  }
`;

/**
 * Authentication service for handling API calls
 */
export const authService = {
  // GraphQL Queries and Mutations
  ME_QUERY,
  LOGOUT_MUTATION,

  /**
   * Login user
   */
  login: async (): Promise<User> => {
    // This is now handled by Apollo Client directly
    throw new Error('Use Apollo Client login mutation instead');
  },

  /**
   * Sign up user
   */
  signup: async (): Promise<User> => {
    // This is now handled by Apollo Client directly
    throw new Error('Use Apollo Client register mutation instead');
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

// This would be replaced with actual API calls in a real application
const API_DELAY = 1000;
