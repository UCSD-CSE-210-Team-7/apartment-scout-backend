const dal = require("../../data_access");

const Tour = {
  // Returns the user details who requested the tour
  requested_by: (tour) => dal.user.getUserDetails(tour.requested_by),
  // Returns the user details who scouted the tour
  scouted_by: (tour) => dal.user.getUserDetails(tour.scouted_by),
};

const queries = {
  // Returns all the tours of the user
  tours: (root, args, context, info) => dal.tour.getToursByUser(args),
  // Returns the tour based on the tour_id
  tour: (root, args, context, info) => dal.tour.getTourById(args),
  // Returns the tours based on user and tour status
  getTours: (root, args, context, info) =>
    dal.tour.getToursByUserAndStatus(args),
};

const mutations = {
  // Mutation to create a new tour
  createTour: (root, args, context) => {
    const tour = {
      tour_address: args.tour_address,
      requested_by: context.identity,
      scouted_by: args.scouted_by,
    };

    return dal.tour.createTour(tour);
  },

  // Mutation to create a review for the tour of the apartment
  createReviewForHouse: (root, args, context) => {
    const review = {
      review_text: args.review_text,
      tour_id: args.tour_id,
    };

    return dal.tour.createReviewForHouse(review);
  },

  // Mutation to create a review for a scout
  createReviewForScout: (root, args, context) => {
    const review = {
      review_text: args.review_text,
      rating: args.rating,
      tour_id: args.tour_id,
    };

    return dal.tour.createReviewForScout(review);
  },

  // Mutation to update a tour
  updateTour: (root, args) => {
    return dal.tour.updateTour(args);
  },
};

const subscriptions = {};

module.exports = {
  Tour,
  queries,
  mutations,
  subscriptions,
};
