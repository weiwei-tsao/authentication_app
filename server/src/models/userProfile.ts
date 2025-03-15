import mongoose, { Schema } from 'mongoose';
import {
  IUserProfileDocument,
  IUserProfileModel,
} from '../types/db/userProfile.model.types';

const userProfileSchema = new Schema<IUserProfileDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      trim: true,
      maxLength: 50,
    },
    lastName: {
      type: String,
      trim: true,
      maxLength: 50,
    },
    bio: {
      type: String,
      trim: true,
      maxLength: 50,
    },
    preference: {
      type: Map,
      of: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Indexing
userProfileSchema.index({ userId: 1 }, { unique: true });

// Defining hooks to cascade delete if user is deleted
userProfileSchema.statics.findByUserId = function (
  userId: mongoose.Types.ObjectId
): Promise<IUserProfileDocument | null> {
  return this.findOne({ userId });
};

const UserProfile = mongoose.model<IUserProfileDocument, IUserProfileModel>(
  'UserProfile',
  userProfileSchema
);

export default UserProfile;
