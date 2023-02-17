const types = `
  type Message {
    msg_id: Int
    msg_text: String
    msg_time: DateTime
    sender: User
    conversation: Conversation
  }
`;

module.exports = types
