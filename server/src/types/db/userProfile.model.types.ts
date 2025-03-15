import { Document, Model, Types } from 'mongoose';

export interface IUserProfile {
  userId: Types.ObjectId;
  firstName?: string;
  lastName?: string;
  bio?: string;
  preference: Map<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserProfileDocument extends IUserProfile, Document {}

export interface IUserProfileModel extends Model<IUserProfileDocument> {
  findByUserId(userId: Types.ObjectId): Promise<IUserProfileDocument | null>;
}
