const data = require('../../../dummy_data.js')

const user_dal = require('../../user/data_access')
const conversations_dal = require('../../conversation/data_access')
const regions_dal = require('../../region/data_access')
const tours_dal = require('../../tour/data_access')

const User = {
    tours: user => tours_dal.getToursByUser({type: user.is_requester ? 'requester' : 'scout', user: user.email}),
    regions: user => regions_dal.getRegions(user.email).then(i => i.map(s => s.zipcode)),
    conversations: user => conversations_dal.getConversations(user.email)
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
        return user_dal.getAllUsers()
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
