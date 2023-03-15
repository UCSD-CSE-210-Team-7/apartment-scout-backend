const resolvers = require("./resolvers.js");
const { queries, mutations, types, subscriptions } = require("./typeDefs.js");

module.exports = {
  queries,
  mutations,
  resolvers,
  types,
  subscriptions,
};
