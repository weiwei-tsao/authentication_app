import User from '../models/user';
import { User as GraphQLUser } from '../graphql/types/user.graphql.types';
import { UserInput } from '../graphql/types/user.graphql.types';
import { generateSalt, hashPassword } from '../utils/auth';

/**
 * User repository
 */

// Get user by id
export const findById = async (id: string): Promise<GraphQLUser> => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }

  const userJson = user.toCustomJSON();

  // Map to GraphQL User type
  return {
    id: userJson.id,
    email: userJson.email,
    username: userJson.username,
    isVerified: userJson.isVerified,
    isActive: userJson.isActive,
    avatarUrl: userJson.avatarUrl,
    roles: userJson.roles as any[], // Cast to expected type
    twoFactorEnabled: userJson.twoFactorEnabled,
    lastPasswordChange: userJson.lastPasswordChange,
    failedLoginAttempts: 0, // Default value since it's removed in toCustomJSON
    accountLockedUntil: null, // Default value since it's removed in toCustomJSON
    lastLogin: userJson.lastLogin || new Date(), // Provide default if null
    createdAt: userJson.createdAt,
    updatedAt: userJson.updatedAt,
  };
};

// Create a new user
export const save = async (input: UserInput): Promise<GraphQLUser> => {
  // Check if user with email already exists
  const existingUserByEmail = await User.findOne({ email: input.email });
  if (existingUserByEmail) {
    throw new Error('User with this email already exists');
  }

  // Check if user with username already exists
  const existingUserByUsername = await User.findOne({
    username: input.username,
  });
  if (existingUserByUsername) {
    throw new Error('User with this username already exists');
  }

  // Generate salt and hash password
  const salt = generateSalt();
  // If the password is already pre-hashed by the client, use it directly
  // Otherwise, hash the raw password
  const passwordHash = input.isPreHashed
    ? hashPassword(input.password, salt)
    : hashPassword(input.password, salt);

  // Create new user
  const newUser = new User({
    email: input.email,
    username: input.username,
    passwordHash,
    salt,
    roles: input.roles || ['USER'],
    lastLogin: new Date(),
  });

  // Save user to database
  await newUser.save();

  // Return user in GraphQL format
  const userJson = newUser.toCustomJSON();

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
