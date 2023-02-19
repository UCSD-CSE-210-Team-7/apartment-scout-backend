const dal = require('../../data_access')

const Tour = {
    requested_by: tour => dal.user.getUserDetails(tour.requested_by),
    scouted_by: tour => dal.user.getUserDetails(tour.scouted_by),
}

const queries = {
    tours: (root, args, context, info) => dal.tour.getToursByUser(args),
};

const mutations = {
    createTour: (root, args) => {
        const requested_by = data.find(i => i.email === args.requester)
        const scouted_by = data.find(i => i.email === args.scout)
        const tour = {
            tour_id: 1,
            tour_address: args.address,
            requested_by,
            scouted_by,
            date_requested: Date.now(),
            date_completed: Date.now(),
            status: "PLANNED",
            tour_summary: "",
            tour_review_text: "",
            tour_review_stars: -1,
        }
        
        tour.requested_by.tours.push(tour)
        tour.scouted_by.tours.push(tour)
        return tour
    },
};

module.exports = { 
    Tour, 
    queries, 
    mutations 
};
