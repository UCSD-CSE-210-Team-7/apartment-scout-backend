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


const User = {
    conversations: (root, args, context, info) => {
        console.log('user.conversations resolver')
        // debugger;
        // console.log(root, args, context, info.fieldNodes.find(field => field.name.value === info.fieldName).selectionSet.selections); 
        return root.conversations
    }
}

const queries = {
    users: (root, args, context, info) => {
        console.log(info.schema)
        const directives = info.schema.getType('User').astNode.fields.reduce(
            (acc, val) => { 
                acc[val.name.value] = val.directives.map(
                    directive => ({
                        name: directive.name.value,
                        args: Object.assign({}, ...directive.arguments.map(argument => ({
                            [argument.name.value]: argument.value.value
                        }))),
                    }) 
                )
                return acc
            } , {}
        )
        const query = info
            .fieldNodes
            .find(field => field.name.value === info.fieldName)
            .selectionSet
            .selections
            .filter(x => x.kind === 'Field')
            .map(x => 
                ({
                    name: x.name.value,
                    selectionSet: x && x.selectionSet && x.selectionSet.selections,
                })
            ).map(x => ({...x, directives: directives[x.name]}))
        // console.log(query);
        console.log('users resolver')
        return users
    },
};

const mutations = {
    createUser: (root, args) => {
        const user = {
            email: args.email,
            name: args.name,
            created_on: Date.now(),
            last_login: Date.now(),
            is_scout: args.is_scout,
            is_requester: args.is_requester,
        };

        users.push(user)

        return user;
    },
};

module.exports = { 
    User, 
    queries, 
    mutations 
};
