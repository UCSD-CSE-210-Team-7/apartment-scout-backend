const types = `
  type User {
    email: String
    name: String
    created_on: DateTime
    last_login: DateTime
    is_scout: Boolean
    is_requester: Boolean
    tours: [Tour]
    regions: [Int]
    conversations: [Conversation]
  }
`;

const queries = `
  users: [User]
`;

const mutations = `
  createUser(
    email: String!
    name: String!
    is_scout: Boolean!
    is_requester: Boolean!
  ): User
`;


module.exports = { types, queries, mutations }
