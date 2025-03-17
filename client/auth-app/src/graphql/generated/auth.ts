import * as Apollo from '@apollo/client';
import { LoginInput, RegisterInput, User } from '../types';

// Import the documents directly
import LOGIN from '../documents/mutations/login.graphql';
import REGISTER from '../documents/mutations/register.graphql';

export type LoginMutationVariables = {
  input: LoginInput;
};

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'AuthPayload';
    token: string;
    user: Pick<
      User,
      | 'id'
      | 'email'
      | 'username'
      | 'avatarUrl'
      | 'isActive'
      | 'isVerified'
      | 'lastLogin'
    >;
  };
};

export type RegisterMutationVariables = {
  input: RegisterInput;
};

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: Pick<User, 'id' | 'email' | 'username'>;
};

export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LOGIN,
    options
  );
}

export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  const options = { ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    REGISTER,
    options
  );
}

export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;

export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
