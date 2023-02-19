const types = `
  type Conversation {
    conversation_id: Int
    person_a: String
    person_b: String
    last_msg: Message
    messages: [Message]
  }
`;

module.exports = types
