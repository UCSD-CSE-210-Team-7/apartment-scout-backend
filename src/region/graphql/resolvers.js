const users = [{
            email: "some.user@email.com",
            name: "some user",
            created_on: Date.now(),
            last_login: Date.now(),
            is_scout: true,
            is_requester: false,
            regions: [0,1,2,3,4,5],
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
            regions: [0,6,7,8,9,10],
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


const Region = {
}

const queries = {
    region: (root, args, context, info) => {
        return {
            users: users.filter(i => i.regions.includes(args.zipcode))
        }
    },
};

const mutations = {
};

module.exports = { 
    Region, 
    queries, 
    mutations 
};
