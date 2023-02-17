const conversations = [{
    conversation_id: 0,
    person_a: "test@gmail.com",
    person_b: "test2@gmail.com",
    last_msg: "Hi there",
    last_msg_time: Date.now()
}];

const Conversation = {
}

const queries = {
    conversations: (root, args) => {
        return conversations
    },
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

        conversations.push(conversation)

        return conversation;
    },
};

module.exports = { Conversation, queries, mutations };
