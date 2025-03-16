import {
  AuthResponse,
  LoginInput,
  RegisterInput,
  LogoutResponse,
} from '../types/auth.graphql.types';
import { User as GraphQLUser } from '../types/user.graphql.types';
import {
  login,
  register,
  logout,
  getCurrentUser,
} from '../../services/auth.service';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

// Define the Context interface
interface Context {
  req: any;
  res: any;
  user?: {
    id: string;
  };
}

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
    @Arg('input', () => LoginInput) input: LoginInput,
    @Ctx() { res }: Context
  ): Promise<AuthResponse> {
    return await login(input, res);
  }

  // Logout a user
  @Mutation(() => LogoutResponse)
  async logout(
    @Ctx() { res }: Context
  ): Promise<{ success: boolean; message: string }> {
    return await logout(res);
  }

  // Get the current user
  @Query(() => GraphQLUser, { nullable: true })
  async me(@Ctx() { req, user }: Context): Promise<GraphQLUser | null> {
    if (!user?.id) return null;
    return await getCurrentUser(user.id);
  }
}
