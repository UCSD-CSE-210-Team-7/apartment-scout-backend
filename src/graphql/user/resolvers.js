const dal = require('../../data_access')

const User = {
    tours: user => dal.tour.getToursByUser({type: user.is_requester ? 'requester' : 'scout', user: user.email}),
    regions: user => dal.region.getRegions(user.email).then(i => i.map(s => s.zipcode)),
    conversations: user => dal.conversation.getConversations(user.email)
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
        return dal.user.createUser(args)
    },

    updateUser: (root, args) => {            
        return dal.user.updateUser(args)
    },
};

module.exports = { 
    User, 
    queries, 
    mutations 
};
