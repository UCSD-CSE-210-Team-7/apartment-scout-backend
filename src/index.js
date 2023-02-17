const { ApolloServer} = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const express = require('express');
const http = require('http')
const cookieParser = require('cookie-parser')

const authMiddleware = require('./auth.js')
const typeDefs = require('./typeDefs.js');
const resolvers = require('./resolvers.js')

async function startServer() {
    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    app.use(
        '/graphql',
        // express.cors(),
        express.json(),
        cookieParser(),
        authMiddleware,
        expressMiddleware(server, {
            context: async ({ req }) => ({ identity: req.identity }),
        }),
    );

    // Modified server startup
    httpServer.listen({ port: 4000 }, console.log(`🚀 Server ready at http://localhost:4000/`));
}
startServer()
