const dal = require('../../data_access')

const Region = {
    users: emails => dal.user.getUserDetails(...emails)
}

const queries = {
    region: (root, args, context, info) => dal.region.getUsers(args.zipcode).then(i => i.map(a => a.email)),
};

const mutations = {
};

module.exports = { 
    Region, 
    queries, 
    mutations 
};
