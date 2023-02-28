const dal = require('../../data_access')
const { PubSub, withFilter } = require('graphql-subscriptions')

const pubsub = new PubSub();

// pubsub.subscribe('MESSAGE', console.log)

const Message = {
    sender: message => dal.user.getUserDetails(message.sender),
    conversation: message => dal.conversation.getConversationById(message.conversation_id),
}

const queries = {
    messages: (root, args, context, info) => dal.message.getAllMessages(args.conversation_id)
};

const mutations = {
    createMessage: async (root, args) => {
        const message = {
            msg_text: args.msg_text,
            sender: args.sender,
            conversation: args.conversation,
        }

        const completeMessage = await dal.message.createMessage(message)

        pubsub.publish('MESSAGE', {message: completeMessage})

        return completeMessage
    },
};

const subscriptions = {
    message: {
        subscribe: withFilter(
            () => pubsub.asyncIterator(['MESSAGE']),
            (payload, variables, context) => {
                return context.authorizedConversations.includes( payload.message.conversation_id )
            }
        )
    }
};

module.exports = { 
    Message, 
    queries, 
    mutations,
    subscriptions,
};
