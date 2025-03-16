import {
  AuthResponse,
  LoginInput,
  RegisterInput,
} from '../graphql/types/auth.graphql.types';
import { User as GraphQLUser } from '../graphql/types/user.graphql.types';
import UserModel from '../models/user';
import { generateJWTToken, verifyPassword } from '../utils/auth';
import { createUser } from './user.service';

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
 * @returns Auth response with token and user
 */
export const login = async (input: LoginInput): Promise<AuthResponse> => {
  // Find user by email
  console.log('input', input);
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
    token,
    user: graphqlUser,
  };
};
