const dal = require("../../data_access");

const Region = {
  // Returns user details for the given email
  users: (emails) => {
    const res = dal.user.getUserDetails(...emails);
    return emails.length == 1 ? [res] : res;
  },
};

const queries = {
  // Returns email addresses of all users belonging to the given region (zipcode)
  usersByRegion: (root, args, context, info) =>
    dal.region.getUsers(args.zipcode).then((i) => i.map((a) => a.email)),
};

const mutations = {};

const subscriptions = {};

module.exports = {
  Region,
  queries,
  mutations,
  subscriptions,
};
