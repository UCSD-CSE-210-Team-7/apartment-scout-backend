const types = `
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

module.exports = types
