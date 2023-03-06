const dal = require('../../data_access')
const { PubSub, withFilter } = require('graphql-subscriptions')

const pubsub = new PubSub();

const Message = {
    sender: message => dal.user.getUserDetails(message.sender),
    conversation: message => dal.conversation.getConversationById(message.conversation_id),
}

const queries = {
    messages: (root, args, context, info) => dal.message.getAllMessages(args.conversation_id)
};

const delay = (t, val) => new Promise(resolve => setTimeout(resolve, t, val));

const mutations = {
    createMessage: async (root, args, context) => {
        const message = {
            msg_text: args.msg_text,
            sender: context.identity,
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
                console.log(context, payload, context.authorizedConversations.includes( payload.message.conversation_id ) && context.identity !== payload.message.sender)
                return context.authorizedConversations.includes( payload.message.conversation_id ) && context.identity !== payload.message.sender
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
