import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/user.resolver';
import { AuthResolver } from './resolvers/auth.resolver';
import { authChecker } from '../middleware/auth';
import path from 'path';

export const createSchema = async () => {
  return await buildSchema({
    resolvers: [UserResolver, AuthResolver] as const,
    authChecker,
    emitSchemaFile: {
      path: path.resolve(__dirname, '../schema.graphql'),
    },
    validate: false,
  });
};
