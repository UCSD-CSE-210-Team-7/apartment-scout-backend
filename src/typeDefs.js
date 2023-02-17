const { DateTimeTypeDefinition } = require('graphql-scalars');
const imports = [
    './user/graphql/index.js',
    './conversation/graphql/index.js',
    './region/graphql/index.js',
    './tour/graphql/index.js',
    './message/graphql/index.js',
].map(i => require(i))

const definedTypes = imports.map(i => i.types)

const query = `
    type Query {
        ${imports.map(i => i.queries).join("")}
    }
`
const mutation = `
    type Mutation {
        ${imports.map(i => i.mutations).join("")}
    }
`

module.exports = [
    DateTimeTypeDefinition,
    `directive @toOne (
        param: Boolean
        param2: String
    ) on FIELD_DEFINITION `,
    definedTypes,
    query,
    mutation
]
