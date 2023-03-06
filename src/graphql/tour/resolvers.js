const dal = require('../../data_access')

const Tour = {
    requested_by: tour => dal.user.getUserDetails(tour.requested_by),
    scouted_by: tour => dal.user.getUserDetails(tour.scouted_by),
}

const queries = {
    tours: (root, args, context, info) => dal.tour.getToursByUser(args),
};

const mutations = {
    createTour: (root, args, context) => {
        const tour = {
            tour_address: args.tour_address,
            requested_by: context.identity,
            scouted_by: args.scouted_by,
        }

        return dal.tour.createTour(tour)
    },

    updateTour: (root, args) => {
        return dal.tour.updateTour(args)
    },
};

const subscriptions = {
};

module.exports = { 
    Tour, 
    queries, 
    mutations,
    subscriptions,
};
