const conversations_dal = require('../../conversation/data_access')
const messages_dal = require('../../message/data_access')

const Conversation = {
    last_msg: conversation => messages_dal.getLastMessage(conversation.conversation_id),
    messages: conversation => messages_dal.getAllMessages(conversation.conversation_id),
}

const queries = {
    conversations: (root, args) => conversations_dal.getConversations(args.user),
};

const mutations = {
    createConversation: (root, args) => {
        const conversation = {
            conversation_id: 0,
            person_a: args.person_a,
            person_b: args.person_b,
            last_msg: "",
            last_msg_time: 0,
        };

        data.find(i => i.email === args.person_a).conversations.push(conversation)
        data.find(i => i.email === args.person_b).conversations.push(conversation)

        return conversation;
    },
};

module.exports = { Conversation, queries, mutations };
