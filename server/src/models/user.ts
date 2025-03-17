import mongoose, { Schema } from 'mongoose';
import { IUser, IUserDocument } from '../types/db/user.model.types';

const userSchema = new Schema<IUserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 3,
      maxLength: 30,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    roles: {
      type: [String],
      enum: ['ADMIN', 'USER'],
      default: ['USER'],
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    lastPasswordChange: {
      type: Date,
      default: Date.now,
    },
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    accountLockedUntil: {
      type: Date,
      default: null,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // automatically add createdAt and updatedAt
  }
);

// Virtual
// For Profile reference
userSchema.virtual('profile', {
  ref: 'UserProfile',
  localField: '_id',
  foreignField: 'userId',
  justOne: true,
});

// Instance methods
// To hide sensitive information when converting to JSON
userSchema.methods.toCustomJSON = function (this: IUserDocument) {
  const user = this.toObject();
  const result = {
    ...user,
    id: user._id.toString(),
  };
  delete result.passwordHash;
  delete result.salt;
  delete result.failedLoginAttempts;
  delete result.accountLockedUntil;
  return result;
};

// To check if account is locked
userSchema.methods.isAccountLocked = function (this: IUserDocument): boolean {
  return !!this.accountLockedUntil && this.accountLockedUntil > new Date();
};

// To increase failed attempts
userSchema.methods.incrementalFailedLoginAttempts = async function (
  this: IUserDocument
): Promise<void> {
  this.failedLoginAttempts += 1;

  // Lock account after 5 failed attempts
  if (this.failedLoginAttempts >= 5) {
    this.accountLockedUntil = new Date(Date.now() + 30 * 60 * 1000); // lock for 30 minutes
  }

  await this.save();
};

// To reset failed login attempts
userSchema.methods.resetFailedLoginAttempts = async function (
  this: IUserDocument
): Promise<void> {
  this.failedLoginAttempts = 0;
  this.accountLockedUntil = null;
  await this.save();
};

// update last login time
userSchema.methods.updateLastLogin = async function (
  this: IUserDocument
): Promise<void> {
  this.lastLogin = new Date();
  await this.save();
};

const User = mongoose.model<IUserDocument>('User', userSchema);

export default User;
