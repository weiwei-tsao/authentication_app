import {
  AuthResponse,
  LoginInput,
  RegisterInput,
} from '../graphql/types/auth.graphql.types';
import { User as GraphQLUser } from '../graphql/types/user.graphql.types';
import UserModel from '../models/user';
import { generateJWTToken, verifyPassword } from '../utils/auth';
import { createUser } from './user.service';
import { Response } from 'express';

// Cookie options for JWT token
const COOKIE_OPTIONS = {
  httpOnly: true, // Prevents JavaScript from accessing the cookie
  secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
  sameSite: 'strict' as const, // Prevents CSRF attacks
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
};

/**
 * Register a new user
 * @param input Registration input data
 * @returns The newly created user
 */
export const register = async (input: RegisterInput): Promise<GraphQLUser> => {
  // Convert RegisterInput to UserInput
  return await createUser({
    email: input.email,
    username: input.username,
    password: input.password,
    roles: ['USER'],
  });
};

/**
 * Login a user
 * @param input Login credentials
 * @param res Express response object to set cookies
 * @returns Auth response with user (token is set in HTTP-only cookie)
 */
export const login = async (
  input: LoginInput,
  res: Response
): Promise<AuthResponse> => {
  // Find user by email
  const user = await UserModel.findOne({ email: input.email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check if account is locked
  if (user.isAccountLocked()) {
    throw new Error(
      'Account is locked. Please try again later or reset your password.'
    );
  }

  // Verify password
  const isPasswordValid = verifyPassword(
    input.password,
    user.passwordHash,
    user.salt
  );

  if (!isPasswordValid) {
    // Increment failed login attempts
    await user.incrementalFailedLoginAttempts();
    throw new Error('Invalid email or password');
  }

  // Reset failed login attempts if successful
  await user.resetFailedLoginAttempts();

  // Update last login time
  await user.updateLastLogin();

  // Generate JWT token
  const token = generateJWTToken(user._id?.toString() || '', user.email);

  // Set the token in an HTTP-only cookie
  res.cookie('auth_token', token, COOKIE_OPTIONS);

  // Convert to GraphQL User type
  const userJson = user.toCustomJSON();
  const graphqlUser = {
    id: userJson.id,
    email: userJson.email,
    username: userJson.username,
    isVerified: userJson.isVerified,
    isActive: userJson.isActive,
    avatarUrl: userJson.avatarUrl,
    roles: userJson.roles as any[],
    twoFactorEnabled: userJson.twoFactorEnabled,
    lastPasswordChange: userJson.lastPasswordChange,
    failedLoginAttempts: 0,
    accountLockedUntil: null,
    lastLogin: userJson.lastLogin || new Date(),
    createdAt: userJson.createdAt,
    updatedAt: userJson.updatedAt,
  };

  return {
    token: '', // We don't need to return the token anymore as it's in the cookie
    user: graphqlUser,
  };
};

/**
 * Logout a user by clearing the auth cookie
 * @param res Express response object to clear cookies
 * @returns Success message
 */
export const logout = async (
  res: Response
): Promise<{ success: boolean; message: string }> => {
  // Clear the auth cookie
  res.clearCookie('auth_token');

  return {
    success: true,
    message: 'Logged out successfully',
  };
};

/**
 * Get the current user from the token in the cookie
 * @param userId User ID from the token
 * @returns The user or null if not found
 */
export const getCurrentUser = async (
  userId: string
): Promise<GraphQLUser | null> => {
  if (!userId) return null;

  const user = await UserModel.findById(userId);
  if (!user) return null;

  // Convert to GraphQL User type
  const userJson = user.toCustomJSON();
  return {
    id: userJson.id,
    email: userJson.email,
    username: userJson.username,
    isVerified: userJson.isVerified,
    isActive: userJson.isActive,
    avatarUrl: userJson.avatarUrl,
    roles: userJson.roles as any[],
    twoFactorEnabled: userJson.twoFactorEnabled,
    lastPasswordChange: userJson.lastPasswordChange,
    failedLoginAttempts: 0,
    accountLockedUntil: null,
    lastLogin: userJson.lastLogin || new Date(),
    createdAt: userJson.createdAt,
    updatedAt: userJson.updatedAt,
  };
};
