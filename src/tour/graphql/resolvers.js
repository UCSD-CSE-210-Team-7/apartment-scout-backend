const users = [{
            email: "some.user@email.com",
            name: "some user",
            created_on: Date.now(),
            last_login: Date.now(),
            is_scout: true,
            is_requester: false,
            regions: [1,2,3,4,5],
            conversations: [{
                conversation_id: 0,
                person_a: "test@gmail.com",
                person_b: "test2@gmail.com",
                last_msg: "Hi there",
                last_msg_time: Date.now()
            }, {
                conversation_id: 1,
                person_a: "test@gmail.com",
                person_b: "test2@gmail.com",
                last_msg: "Hi there",
                last_msg_time: Date.now()
            }, {
                conversation_id: 2,
                person_a: "test@gmail.com",
                person_b: "test2@gmail.com",
                last_msg: "Hi there",
                last_msg_time: Date.now()
            }],
            tours: [
                {
                    tour_id: 0,
                    tour_address: "7699 Palmilla Drive La Jolla CA 92122",
                    requested_by: undefined,
                    scouted_by: undefined,
                    date_requested: Date.now(),
                    date_completed: Date.now(),
                    status: "COMPLETE",
                    tour_summary: "House sucks",
                    tour_review_text: "Thanks",
                    tour_review_stars: 5,
                },
            ]
        }, {
            email: "some.user2@email.com",
            name: "some user2",
            created_on: Date.now(),
            last_login: Date.now(),
            is_scout: true,
            is_requester: false,
            regions: [1,2,3,4,5],
            conversations: [{
                conversation_id: 0,
                person_a: "test@gmail.com",
                person_b: "test2@gmail.com",
                last_msg: "Hi there",
                last_msg_time: Date.now()
            }, {
                conversation_id: 1,
                person_a: "test@gmail.com",
                person_b: "test2@gmail.com",
                last_msg: "Hi there",
                last_msg_time: Date.now()
            }, {
                conversation_id: 2,
                person_a: "test@gmail.com",
                person_b: "test2@gmail.com",
                last_msg: "Hi there",
                last_msg_time: Date.now()
            }],
            tours: [
                {
                    tour_id: 1,
                    tour_address: "9500 Gilman Drive San Diego CA 92092",
                    requested_by: undefined,
                    scouted_by: undefined,
                    date_requested: Date.now(),
                    date_completed: Date.now(),
                    status: "COMPLETE",
                    tour_summary: "House sucks",
                    tour_review_text: "Thanks",
                    tour_review_stars: 5,
                },
            ]
        }];


const Tour = {
}

const queries = {
    tours: (root, args, context, info) => {
        return users.find(i => i.email === args.user).tours
    },
};

const mutations = {
    createTour: (root, args) => {
        const tour = {
            tour_id: 1,
            tour_address: args.address,
            requested_by: users.find(i => i.email === args.requester),
            scouted_by: users.find(i => i.email === args.scout),
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
