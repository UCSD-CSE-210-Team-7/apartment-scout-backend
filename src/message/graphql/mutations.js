const mutations = `
  createMessage(
    sender: String!
    msg_text: String!
    conversation: Int!
  ): User
`;

module.exports = mutations
