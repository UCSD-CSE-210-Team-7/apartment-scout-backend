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
        requested_by: String!
        scouted_by: String!
        tour_address: String!
    ): Tour

    updateTour(
        tour_id: Int!
        tour_address: String
        requested_by: String
        scouted_by: String
        date_requested: DateTime
        date_completed: DateTime
        status: String
        tour_summary: String
        tour_review_text: String
        tour_review_stars: Int
    ): Tour
`;

const subscriptions = `
`;

module.exports = { queries, mutations, types, subscriptions }
