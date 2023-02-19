const dal = require('../../data_access')

const User = {
    tours: user => dal.tour.getToursByUser({type: user.is_requester ? 'requester' : 'scout', user: user.email}),
    regions: user => dal.region.getRegions(user.email).then(i => i.map(s => s.zipcode)),
    conversations: user => dal.conversations.getConversations(user.email)
}

const queries = {
    users: (root, args, context, info) => {
        /*
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
        */
        return dal.user.getAllUsers()
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
