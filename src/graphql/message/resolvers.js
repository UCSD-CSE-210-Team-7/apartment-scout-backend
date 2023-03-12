const dal = require("../../data_access");
const { PubSub, withFilter } = require("graphql-subscriptions");

const pubsub = new PubSub(); // Pubsub instance to publish the newly created message and subscribe for the other participant

const Message = {
  // Fetchs user details for the sender of the message
  sender: (message) => dal.user.getUserDetails(message.sender),
  // Fetchs the conversation of the message
  conversation: (message) =>
    dal.conversation.getConversationById(message.conversation_id),
};

const queries = {
  // Get all messages for a given conversation ID
  messages: (root, args, context, info) =>
    dal.message.getAllMessages(args.conversation_id),
};

const mutations = {
  // Mutation to create a new message
  createMessage: async (root, args, context) => {
    const message = {
      msg_text: args.msg_text,
      sender: context.identity,
      conversation: args.conversation,
    };

    const completeMessage = await dal.message.createMessage(message);

    pubsub.publish("MESSAGE", { message: completeMessage });

    return completeMessage;
  },
};

const subscriptions = {
  // Subscribe to new messages for a given conversation ID
  message: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(["MESSAGE"]),
      (payload, variables, context) => {
        console.log(
          context,
          payload,
          context.authorizedConversations.includes(
            payload.message.conversation_id
          ) && context.identity !== payload.message.sender
        );
        return (
          context.authorizedConversations.includes(
            payload.message.conversation_id
          ) && context.identity !== payload.message.sender
        );
      }
    ),
  },
};

module.exports = {
  Message,
  queries,
  mutations,
  subscriptions,
};
