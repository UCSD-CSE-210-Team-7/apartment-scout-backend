// npm install @apollo/server express graphql cors body-parser
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http'
import cookieParser from 'cookie-parser';

import authMiddleware from './auth.js';
import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js'

async function startServer() {
    // Required logic for integrating with Express
    const app = express();
    // Our httpServer handles incoming requests to our Express app.
    // Below, we tell Apollo Server to "drain" this httpServer,
    // enabling our servers to shut down gracefully.
    const httpServer = http.createServer(app);

    // Same ApolloServer initialization as before, plus the drain plugin
    // for our httpServer.
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    // Ensure we wait for our server to start
    await server.start();

    // Set up our Express middleware to handle CORS, body parsing,
    // and our expressMiddleware function.
    app.use(
        '/',
        // express.cors(),
        express.json(),
        cookieParser(),
        authMiddleware,
        // expressMiddleware accepts the same arguments:
        // an Apollo Server instance and optional configuration options
        expressMiddleware(server, {
            context: async ({ req }) => ({ token: req.headers.token }),
        }),
    );

    // Modified server startup
    return new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
}


await startServer()
console.log(`🚀 Server ready at http://localhost:4000/`);
