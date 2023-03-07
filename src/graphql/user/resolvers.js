const dal = require('../../data_access')

const User = {
  tours: user => dal.tour.getToursByUser({type: user.is_requester ? 'requester' : 'scout', user: user.email}),
  regions: user => dal.region.getRegions(user.email).then(i => i.map(s => s.zipcode)),
  conversations: user => dal.conversation.getConversations(user.email)
}

const queries = {
  me: (root, args, context, info) => {
    return dal.user.getUserDetails(context.identity)
  },
  userDetails: (root, args, context, info) => {
    return dal.user.getUserDetails(args.email)
  },
  users: (root, args, context, info) => {
    return dal.user.getAllUsers()
  },
};

const mutations = {
  createUser: (root, args, context) => {
    return dal.user.createUser({email: context.identity, name: args.name})
  },

  updateUser: (root, args, context) => {            
    return dal.user.updateUser(args)
  },
};

const subscriptions = {
};

module.exports = { 
  User, 
  queries, 
  mutations,
  subscriptions,
};
