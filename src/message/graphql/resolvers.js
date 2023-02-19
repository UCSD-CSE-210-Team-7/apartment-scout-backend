const data = require('../../../dummy_data.js')
const Message = {
}

const queries = {
    messages: (root, args, context, info) => {
        const conversation = data.flatMap(i => i.conversations).find(i => i.conversation_id === args.conversation_id)
        return conversation.messages
    },
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
