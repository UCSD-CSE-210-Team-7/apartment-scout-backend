const types = `
  type Conversation {
    conversation_id: Int
    person_a: User
    person_b: User
    last_msg: Message
    messages: [Message]
  }
`;

const queries = `
  conversations(user: String!): [Conversation]
`;

const mutations = `
  createConversation(
    person_a: String!
    person_b: String!
  ): Conversation
`;

const subscriptions = `
`

module.exports = { queries, mutations, types, subscriptions }
