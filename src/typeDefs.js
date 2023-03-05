const { DateTimeTypeDefinition } = require('graphql-scalars');
const fs = require('fs')

const imports = fs
  .readdirSync(`${__dirname}/graphql`)
  .filter((name) => {
    if (name == "__tests__") return false;
    return true;
  })
  .map((i) => require(`./graphql/${i}`));

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

const subscription = `
    type Subscription {
        ${imports.map(i => i.subscriptions).join("")}
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
    mutation,
    subscription,
]
