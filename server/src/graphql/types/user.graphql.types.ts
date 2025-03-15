import {
  Field,
  ID,
  Int,
  ObjectType,
  registerEnumType,
  InputType,
} from 'type-graphql';

// Enum for user roles
enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

// Register enum type
registerEnumType(UserRole, {
  name: 'UserRole',
});

// User type
@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  username: string;

  @Field(() => Boolean, { defaultValue: false })
  isVerified: boolean;

  @Field(() => Boolean, { defaultValue: true })
  isActive: boolean;

  @Field(() => String, { nullable: true })
  avatarUrl?: string;

  @Field(() => [UserRole], { defaultValue: [UserRole.USER] })
  roles: UserRole[];

  @Field(() => Boolean, { defaultValue: false })
  twoFactorEnabled: boolean;

  @Field(() => Date, { nullable: true })
  lastPasswordChange?: Date;

  @Field(() => Int, { defaultValue: 0 })
  failedLoginAttempts: number;

  @Field(() => Date, { nullable: true })
  accountLockedUntil?: Date;

  @Field(() => Date)
  lastLogin: Date;

  @Field(() => Date, { nullable: false })
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

// Input type for user creation
@InputType()
export class UserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

  @Field(() => [String], { defaultValue: ['USER'] })
  roles?: string[];
}
