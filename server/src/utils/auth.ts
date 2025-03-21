import config from '../config';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

/**
 * Generate a random salt for password hashing
 * @returns {string} A random salt string
 */
export const generateSalt = (): string => {
  return crypto.randomBytes(16).toString('hex');
};

/**
 * Hash a password with the given salt
 * @param {string} password - The plain text password
 * @param {string} salt - The salt to use for hashing
 * @returns {string} The hashed password
 */
export const hashPassword = (password: string, salt: string): string => {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
};

/**
 * Verify a password against a hash and salt
 * @param {string} password - The plain text password to verify
 * @param {string} storedHash - The stored hash
 * @param {string} salt - The salt used for hashing
 * @returns {boolean} True if the password matches, false otherwise
 */
export const verifyPassword = (
  password: string,
  storedHash: string,
  salt: string
): boolean => {
  // Hash the password with our salt
  const passwordHash = hashPassword(password, salt);
  return passwordHash === storedHash;
};

/**
 * Generate a random token for email verification, password reset, etc.
 * @returns {string} A random token
 */
export const generateToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Generate a JWT token
 * @param {string} userId - The user id
 * @param {string} email - The user email
 * @returns {string} The JWT token
 */
export const generateJWTToken = (userId: string, email: string): string => {
  return jwt.sign({ userId, email }, config.jwtSecret as jwt.Secret, {
    expiresIn: Number(config.jwtExpiry) * 60 * 1000, // Convert minutes to milliseconds
  });
};

/**
 * Verify a JWT token
 * @param {string} token - The JWT token to verify
 * @returns {object | null} The decoded token payload or null if invalid
 */
export const verifyJWTToken = (
  token: string
): { userId: string; email: string } | null => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret as jwt.Secret) as {
      userId: string;
      email: string;
    };
    return decoded;
  } catch (error) {
    return null;
  }
};
