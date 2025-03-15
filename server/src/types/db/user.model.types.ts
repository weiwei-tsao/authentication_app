import { Document, Model, Types } from 'mongoose';

// Base interface for User attributes
export interface IUser {
  _id: Types.ObjectId;
  email: string;
  username: string;
  passwordHash: string;
  salt: string;
  isVerified: boolean;
  isActive: boolean;
  avatarUrl: string;
  roles: string[];
  twoFactorEnabled: boolean;
  lastPasswordChange: Date;
  failedLoginAttempts: number;
  accountLockedUntil: Date | null;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for User methods
export interface IUserMethods {
  toCustomJSON(): Omit<
    IUser,
    'passwordHash' | 'salt' | 'failedLoginAttempts' | 'accountLockedUntil'
  > & { id: string };
  isAccountLocked(): boolean;
  incrementalFailedLoginAttempts(): Promise<void>;
  resetFailedLoginAttempts(): Promise<void>;
  updateLastLogin(): Promise<void>;
}

// Interface that combines properties and methods
export interface IUserDocument
  extends Omit<IUser, '_id'>,
    IUserMethods,
    Document {
  // Virtual fields
  profile: Types.ObjectId;
}

// // Interface for User model statics
// export interface IUserModel extends Model<IUserDocument> {
//   // Add static methods if any
// }
