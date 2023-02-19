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

module.exports = {
    types,
    queries,
    mutations
}
