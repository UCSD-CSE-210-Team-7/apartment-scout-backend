import { DateTimeResolver } from 'graphql-scalars';
import user from './user/graphql/index.js';

const Query = { 
    ...user.resolvers.queries,
}
const Mutation = {
    ...user.resolvers.mutations,
}

export default {
    DateTime: DateTimeResolver,

    Query,
    Mutation
};
