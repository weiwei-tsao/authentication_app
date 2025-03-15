import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { User as GraphQLUser } from '../../graphql/types/user.graphql.types';
import { getUserById } from '../../services/user.service';

@Resolver(() => GraphQLUser)
export class UserResolver {
  @Query(() => GraphQLUser, { nullable: true })
  @Authorized()
  async user(@Arg('id') id: string): Promise<GraphQLUser | null> {
    if (!id) {
      throw new Error('User id is required');
    }

    return await getUserById(id);
  }
}
