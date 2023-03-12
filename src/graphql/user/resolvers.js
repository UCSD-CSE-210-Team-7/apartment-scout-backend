const dal = require("../../data_access");

const User = {
  // Returns tours for the user based on their role (requester/scout) and email
  tours: (user) =>
    dal.tour.getToursByUser({
      type: user.is_requester ? "requester" : "scout",
      user: user.email,
    }),
  // Returns regions for the given user (scout) based on their email
  regions: (user) =>
    dal.region.getRegions(user.email).then((i) => i.map((s) => s.zipcode)),
  // Returns conversations for the given user based on their email
  conversations: (user) => dal.conversation.getConversations(user.email),
};

const queries = {
  // Returns details of the authenticated user
  me: (root, args, context, info) => {
    return dal.user.getUserDetails(context.identity);
  },
  // Returns details of a user with the given email
  userDetails: (root, args, context, info) => {
    return dal.user.getUserDetails(args.email);
  },
  // Returns details of all users
  users: (root, args, context, info) => {
    return dal.user.getAllUsers();
  },
};

const mutations = {
  // Creates a new user with the given email address and name
  createUser: (root, args, context) => {
    return dal.user.createUser({ email: context.identity, name: args.name });
  },

  // Updates the details of an existing user with the given arguments
  updateUser: (root, args, context) => {
    return dal.user.updateUser(args);
  },
};

const subscriptions = {};

module.exports = {
  User,
  queries,
  mutations,
  subscriptions,
};
