import {
  User as GraphQLUser,
  UserInput,
} from '../graphql/types/user.graphql.types';
import { findById, save } from '../repositories/user.repository';

/**
 * Get user by id
 * @param id - The id of the user
 * @returns The user
 */
export const getUserById = async (id: string): Promise<GraphQLUser> => {
  return await findById(id);
};

/**
 * Create a new user
 * @param input - The input of the user
 * @returns The user
 */
export const createUser = async (input: UserInput): Promise<GraphQLUser> => {
  return await save(input);
};
