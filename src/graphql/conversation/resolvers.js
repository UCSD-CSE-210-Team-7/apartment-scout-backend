const dal = require('../../data_access')

const Conversation = {
    last_msg: conversation => dal.message.getLastMessage(conversation.conversation_id),
    messages: conversation => dal.message.getAllMessages(conversation.conversation_id),
    person_a: conversation => dal.user.getUserDetails(conversation.person_a),
    person_b: conversation => dal.user.getUserDetails(conversation.person_b),
}

const queries = {
    conversations: (root, args, context) => dal.conversation.getConversations(context.identity),
};

const mutations = {
    createConversation: (root, args) => {
        const conversation = {
            person_a: args.person_a,
            person_b: args.person_b,
        };

        return dal.conversation.createConversation(conversation)
    },
};

const subscriptions = {
};

module.exports = { 
    Conversation, 
    queries, 
    mutations,
    subscriptions,
};
