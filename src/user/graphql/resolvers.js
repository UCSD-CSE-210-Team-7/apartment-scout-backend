const queries = {
    user: (root, args) => {
        return {
            email: "some.user@email.com",
            name: "some user",
            created_on: Date.now(),
            last_login: Date.now(),
            is_scout: true,
            is_requester: false,
        };
    },
};

const mutations = {
    createUser: (root, args) => {
        const user = {
            email: args.email,
            name: args.name,
            created_on: Date.now(),
            last_login: Date.now(),
            is_scout: args.is_scout,
            is_requester: args.is_requester,
        };

        return user;
    },
};

export const resolvers = { queries, mutations };
