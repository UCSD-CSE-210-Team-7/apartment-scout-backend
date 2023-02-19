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

module.exports = types
