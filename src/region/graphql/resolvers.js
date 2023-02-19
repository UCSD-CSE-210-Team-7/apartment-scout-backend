const data = require('../../../dummy_data.js')

const Region = {
}

const queries = {
    region: (root, args, context, info) => {
        return {
            users: data.filter(i => i.regions.includes(args.zipcode))
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
