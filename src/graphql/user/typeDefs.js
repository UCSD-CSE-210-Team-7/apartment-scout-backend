const types = `
  type User {
    email: String
    name: String
    created_on: DateTime
    last_login: DateTime
    is_scout: Boolean
    calendly_link: String
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
  me: User
`;

const mutations = `
  createUser(
    name: String!
  ): User

  updateUser(
    email: String!
    name: String
    is_scout: Boolean
    is_requester: Boolean
    regions: [Int]
    calendly_link: String
  ): User
`;

const subscriptions = `
`;

module.exports = { queries, mutations, types, subscriptions };
