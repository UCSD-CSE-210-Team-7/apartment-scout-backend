const dal = require('../../data_access')

const Message = {
}

const queries = {
    messages: (root, args, context, info) => dal.message.getAllMessages(args.conversation_id),
};

const mutations = {
    createMessage: (root, args) => {
        const sender = data.find(i => i.email === args.sender)
        const conversation = sender.conversations.find(i => i.conversation_id === args.conversation)
        const message = {
            msg_id: 0,
            msg_text: args.msg_text,
            msg_time: Date.now(),
            sender: args.sender,
            conversation: args.conversation,
        }

        return message;
    },
};

module.exports = { 
    Message, 
    queries, 
    mutations 
};
