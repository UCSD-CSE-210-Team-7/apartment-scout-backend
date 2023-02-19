const { DateTimeResolver } = require('graphql-scalars');
const fs = require('fs')

const imports = fs
    .readdirSync(__dirname)
    .filter(i => 
        fs.statSync(`${__dirname}/${i}`).isDirectory()
    ).filter(i => 
        fs.readdirSync(`${__dirname}/${i}`).includes('graphql')
    ).map(i => `./${i}/graphql/index.js`)
    .map(i => require(i))

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
