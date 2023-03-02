const dal = require('../../data_access')

const Region = {
    users: emails => {
        const res = dal.user.getUserDetails(...emails)
        return emails.length == 1 ? [res] : res
    }
}

const queries = {
    usersByRegion: (root, args, context, info) => dal.region.getUsers(args.zipcode).then(i => i.map(a => a.email)),
};

const mutations = {
};

const subscriptions = {
};

module.exports = { 
    Region, 
    queries, 
    mutations,
    subscriptions,
};
