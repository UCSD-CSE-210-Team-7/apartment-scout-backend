const users = [{
            email: "some.user@email.com",
            name: "some user",
            created_on: Date.now(),
            last_login: Date.now(),
            is_scout: true,
            is_requester: false,
            regions: [1,2,3,4,5],
            conversations: [{
                conversation_id: 0,
                person_a: "test@gmail.com",
                person_b: "test2@gmail.com",
                last_msg: "Hi there",
                last_msg_time: Date.now()
            }, {
                conversation_id: 1,
                person_a: "test@gmail.com",
                person_b: "test2@gmail.com",
                last_msg: "Hi there",
                last_msg_time: Date.now()
            }, {
                conversation_id: 2,
                person_a: "test@gmail.com",
                person_b: "test2@gmail.com",
                last_msg: "Hi there",
                last_msg_time: Date.now()
            }]
        }, {
            email: "some.user2@email.com",
            name: "some user2",
            created_on: Date.now(),
            last_login: Date.now(),
            is_scout: true,
            is_requester: false,
            regions: [1,2,3,4,5],
            conversations: [{
                conversation_id: 0,
                person_a: "test@gmail.com",
                person_b: "test2@gmail.com",
                last_msg: "Hi there",
                last_msg_time: Date.now()
            }, {
                conversation_id: 1,
                person_a: "test@gmail.com",
                person_b: "test2@gmail.com",
                last_msg: "Hi there",
                last_msg_time: Date.now()
            }, {
                conversation_id: 2,
                person_a: "test@gmail.com",
                person_b: "test2@gmail.com",
                last_msg: "Hi there",
                last_msg_time: Date.now()
            }]
        }];


const Message = {
}

const queries = {
    messages: (root, args, context, info) => {
        return [
            {
                msg_id: 0,
                msg_text: "Test",
                msg_time: Date.now(),
                sender: null,
                conversation: null,
            }
        ]
    },
};

const mutations = {
    createMessage: (root, args) => {
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
