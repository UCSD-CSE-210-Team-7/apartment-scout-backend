const mutations = `
  createUser(
    email: String!
    name: String!
    is_scout: Boolean!
    is_requester: Boolean!
  ): User
`;

module.exports = mutations
