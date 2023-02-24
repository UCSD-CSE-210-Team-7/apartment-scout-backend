const dal = require('../../data_access')

const Message = {
    sender: message => dal.user.getUserDetails(message.sender),
    conversation: message => dal.conversation.getConversationById(message.conversation_id),
}

const queries = {
    messages: (root, args, context, info) => dal.message.getAllMessages(args.conversation_id)
};

const mutations = {
    createMessage: (root, args) => {
        const message = {
            msg_text: args.msg_text,
            sender: args.sender,
            conversation: args.conversation,
        }

        return dal.message.createMessage(message)
    },
};

module.exports = { 
    Message, 
    queries, 
    mutations 
};
