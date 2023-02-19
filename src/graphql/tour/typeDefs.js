const types = `
    enum UserType {
        scout
        requester
    }

    type Tour {
        tour_id: Int
        tour_address: String
        requested_by: User
        scouted_by: User
        date_requested: DateTime
        date_completed: DateTime
        status: String
        tour_summary: String
        tour_review_text: String
        tour_review_stars: Int
  }
`;

const queries = `
    tours(type: UserType!, user: String!): [Tour]
`;

const mutations = `
  createTour(
    requester: String!
    scout: String!
    address: String!
  ): Tour
`;

module.exports = { types, queries, mutations }
