const { DateTimeResolver } = require('graphql-scalars');
const fs = require('fs')

const imports = fs
    .readdirSync(`${__dirname}/graphql`)
    .map(i => require(`./graphql/${i}`))

const protectedFields = ['queries', 'mutations', 'subscriptions']

const filterResolver = i => (
    Object.fromEntries(
        Object.entries(
            i.resolvers
        ).filter(
            ([key]) => !protectedFields.includes(key)
        )
    )
)

const allResolvers = Object.assign({}, ...imports.map(filterResolver))
const Query = Object.assign({}, ...imports.map(i => i.resolvers.queries))
const Mutation = Object.assign({}, ...imports.map(i => i.resolvers.mutations))
const Subscription = Object.assign({}, ...imports.map(i => i.resolvers.subscriptions))

module.exports = {
    DateTime: DateTimeResolver,
    ...allResolvers,

    Query,
    Mutation,
    Subscription
};
