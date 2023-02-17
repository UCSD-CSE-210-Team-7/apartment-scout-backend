import { DateTimeTypeDefinition } from 'graphql-scalars';
import user from './user/graphql/index.js';

const query = `
    type Query {
        ${user.queries}
    }
`

const mutation = `
    type Mutation {
        ${user.mutations}
    }
`

export default [
    DateTimeTypeDefinition,
    user.types,
    query,
    mutation
]
