const dal = require("../../data_access");

const Conversation = {
  // Returns the last message of a given conversation
  last_msg: (conversation) =>
    dal.message.getLastMessage(conversation.conversation_id),
  // Returns all messages of a given conversation
  messages: (conversation) =>
    dal.message.getAllMessages(conversation.conversation_id),
  // Returns details of the first participant A in a given conversation
  person_a: (conversation) => dal.user.getUserDetails(conversation.person_a),
  // Returns details of the second participant B in a given conversation
  person_b: (conversation) => dal.user.getUserDetails(conversation.person_b),
};

const queries = {
  // Returns all conversations for a given user
  conversations: (root, args, context) =>
    dal.conversation.getConversations(context.identity),
};

const mutations = {
  // Creates a new conversation between two users and returns the created conversation object
  createConversation: (root, args) => {
    const conversation = {
      person_a: args.person_a,
      person_b: args.person_b,
    };

    return dal.conversation.createConversation(conversation);
  },
};

const subscriptions = {};

module.exports = {
  Conversation,
  queries,
  mutations,
  subscriptions,
};
