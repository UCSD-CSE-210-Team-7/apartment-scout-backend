const types = `
  type Region {
    users: [User]
  }
`;

const queries = `
  region(zipcode: Int): Region
`;

const mutations = `
`;
const subscriptions = `
`;

module.exports = { queries, mutations, types, subscriptions }
