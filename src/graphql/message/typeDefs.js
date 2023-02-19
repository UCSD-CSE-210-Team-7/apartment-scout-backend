const types = `
  type Message {
    msg_id: Int
    msg_text: String
    msg_time: DateTime
    sender: User
    conversation: Conversation
  }
`;

const queries = `
  messages (conversation_id: Int): [Message]
`;

const mutations = `
  createMessage(
    sender: String!
    msg_text: String!
    conversation: Int!
  ): User
`;

module.exports = { types, queries, mutations }
