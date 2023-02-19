const data = [
    {
        email: "some.user@email.com",
        name: "some user",
        created_on: Date.now(),
        last_login: Date.now(),
        is_scout: true,
        is_requester: false,
        regions: [0,1,2,3,4,5],
        conversations: [{
            conversation_id: 0,
            person_a: "test@gmail.com",
            person_b: "test2@gmail.com",
            last_msg: "Hi there",
            last_msg_time: Date.now(),
            messages: [
                {
                    msg_id: 0,
                    msg_text: "test",
                    msg_time: Date.now(),
                    sender: "some.user@email.com",
                    conversation: 0,
                }
            ]
        }, {
            conversation_id: 1,
            person_a: "test@gmail.com",
            person_b: "test2@gmail.com",
            last_msg: "Hi there",
            last_msg_time: Date.now(),
            messages: [
                {
                }
            ]
        }, {
            conversation_id: 2,
            person_a: "test@gmail.com",
            person_b: "test2@gmail.com",
            last_msg: "Hi there",
            last_msg_time: Date.now(),
            messages: [
                {
                }
            ]
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
    }, 
    {
        email: "some.user2@email.com",
        name: "some user2",
        created_on: Date.now(),
        last_login: Date.now(),
        is_scout: true,
        is_requester: false,
        regions: [0,6,7,8,9,10],
        conversations: [{
            conversation_id: 3,
            person_a: "test@gmail.com",
            person_b: "test2@gmail.com",
            last_msg: "Hi there",
            last_msg_time: Date.now(),
            messages: [
                {}
            ]
        }, {
            conversation_id: 4,
            person_a: "test@gmail.com",
            person_b: "test2@gmail.com",
            last_msg: "Hi there",
            last_msg_time: Date.now(),
            messages: [
                {
                }
            ]
        }, {
            conversation_id: 5,
            person_a: "test@gmail.com",
            person_b: "test2@gmail.com",
            last_msg: "Hi there",
            last_msg_time: Date.now(),
            messages: [
                {
                }
            ]
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
    }
];

module.exports = data
