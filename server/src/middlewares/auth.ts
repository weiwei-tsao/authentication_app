import { AuthChecker } from 'type-graphql';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

// Define the context type
export interface Context {
  req: Request;
  user?: any;
}

// Extract token from request
export const extractToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null;

  return parts[1];
};

// Verify JWT token
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
  } catch (error) {
    return null;
  }
};

// Auth checker for type-graphql
export const authChecker: AuthChecker<Context> = async ({ context }, roles) => {
  const { req } = context;

  // Extract token from request
  const token = extractToken(req);
  if (!token) return false;

  // Verify token
  const decoded = verifyToken(token);
  if (!decoded) return false;

  // Find user by id
  const user = await User.findById(decoded.userId);
  if (!user) return false;

  // Check if user is active
  if (!user.isActive) return false;

  // Set user in context
  context.user = user;

  // If no roles are required, just check if user is authenticated
  if (roles.length === 0) return true;

  // Check if user has required roles
  return roles.some((role) => user.roles.includes(role));
};
