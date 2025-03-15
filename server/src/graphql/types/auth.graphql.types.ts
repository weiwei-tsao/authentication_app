import { Field, InputType, ObjectType } from 'type-graphql';
import { User as GraphQLUser } from './user.graphql.types';

// Registration input type
@InputType('RegisterInput')
export class RegisterInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}

// Login input type
@InputType('LoginInput')
export class LoginInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

// Auth response type
@ObjectType()
export class AuthResponse {
  @Field(() => String)
  token: string;

  @Field(() => GraphQLUser)
  user: GraphQLUser;
}
