const { DateTimeResolver } = require('graphql-scalars');
const fs = require('fs')

const imports = fs
    .readdirSync(`${__dirname}/graphql`)
    .map(i => require(`./graphql/${i}`))

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
