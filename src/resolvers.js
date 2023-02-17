const { DateTimeResolver } = require('graphql-scalars');
const imports = [
    './user/graphql/index.js',
    './conversation/graphql/index.js',
    './region/graphql/index.js',
    './tour/graphql/index.js',
    './message/graphql/index.js',
].map(i => require(i))

const filterResolver = i => (
    Object.fromEntries(
        Object.entries(
            i.resolvers
        ).filter(
            ([key]) => key != 'queries' && key != 'mutations'
        )
    )
)

const allResolvers = Object.assign({}, ...imports.map(filterResolver))
const Query = Object.assign({}, ...imports.map(i => i.resolvers.queries))
const Mutation = Object.assign({}, ...imports.map(i => i.resolvers.mutations))

module.exports = {
    DateTime: DateTimeResolver,
    ...allResolvers,

    Query,
    Mutation
};
