import {
  AuthResponse,
  LoginInput,
  RegisterInput,
} from '../types/auth.graphql.types';
import { User as GraphQLUser } from '../types/user.graphql.types';
import { login, register } from '../../services/auth.service';
import { Arg, Mutation, Resolver } from 'type-graphql';

@Resolver()
export class AuthResolver {
  // Register a new user
  @Mutation(() => GraphQLUser)
  async register(
    @Arg('input', () => RegisterInput) input: RegisterInput
  ): Promise<GraphQLUser> {
    return await register(input);
  }

  // Login a user
  @Mutation(() => AuthResponse)
  async login(
    @Arg('input', () => LoginInput) input: LoginInput
  ): Promise<AuthResponse> {
    return await login(input);
  }
}
