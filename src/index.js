const { parse } = require('graphql')
const { ApolloServer} = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

const express = require('express')
const cors = require('cors')
const http = require('http')
const cookieParser = require('cookie-parser')

const { client } = require('./utils/db.js')
const { verifyIdentity, EXPIRES_IN } = require('./auth.js')
const typeDefs = require('./typeDefs.js');
const resolvers = require('./resolvers.js')
const dal = require('./data_access')

async function startServer() {
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const app = express();
  const httpServer = http.createServer(app);

  const getDynamicContext = async (ctx, msg, args) => {
    const { identity } = await verifyIdentity({ 
      sessionCookie: ctx.connectionParams.sessionCookie || undefined, 
      authorization: ctx.connectionParams.authorization || ctx.connectionParams.Authorization,
    })

    const conversations = await dal.conversation.getConversations(identity)

    return { identity: identity, authorizedConversations: conversations.map(i => i.conversation_id) }
  };

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  });
  const serverCleanup = useServer(
    {
      schema,
      context: async (ctx, msg, args) => {
        // Returning an object will add that information to
        // contextValue, which all of our resolvers have access to.
        return getDynamicContext(ctx, msg, args);
      },
    },
    wsServer,
  );


  const server = new ApolloServer({
    schema,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start().then(() => console.log('server running'));

  await client.connect().then(() => console.log('db connected'));

  app.use(
    '/',
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }),
    express.json(),
    cookieParser(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        if(req.headers.admin){
          console.log(`admin user`)
          return {identity: 'skulkarn@ucsd.edu', db: client}
        }

        const { identity, sessionCookie } = await verifyIdentity({ 
          sessionCookie: req.cookies.sessionCookie || undefined, 
          authorization: req.headers.authorization || req.headers.Authorization,
        })

        if(sessionCookie){
          const options = {maxAge: EXPIRES_IN, httpOnly: false, secure: false};
          res.cookie('sessionCookie', sessionCookie, options)
        }

        console.log('identity verified as', identity, ' proceeding')

        return { identity, db: client }
      }
    }),
  );

  // Modified server startup
  httpServer.listen({ port: 4000 }, console.log(`🚀 Server ready at http://localhost:4000/`));
}
startServer()
