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
  userDetails(
    email: String!
  ): User
`;

const mutations = `
  createUser(
    email: String!
    name: String!
    is_scout: Boolean!
    is_requester: Boolean!
    regions: [Int]
  ): User

  updateUser(
    email: String!
    name: String
    is_scout: Boolean
    is_requester: Boolean
    regions: [Int]
  ): User
`;

const subscriptions = `
`;

module.exports = { queries, mutations, types, subscriptions }