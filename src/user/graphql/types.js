const types = `
  type User {
    email: String
    name: String
    created_on: DateTime
    last_login: DateTime
    is_scout: Boolean
    is_requester: Boolean
    regions: [Int]
    conversations: [Conversation] @toOne(param: true, param2: "Hi")
  }
`;

module.exports = types
