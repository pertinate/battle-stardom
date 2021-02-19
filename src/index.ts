import './util/signale';
import './express/firebase';
import app from './express/app';
import { createServer } from 'http';
import { ApolloServer, PubSub, gql, AuthenticationError } from 'apollo-server-express';
import admin from 'firebase-admin';
import config from './util/config';

import { pubsub, resolvers, schema } from './graphql';


const express = app();

const port = config.port;

let playerCount = 0;

// const typeDefs = gql`

//     `;
;

const gqlServer = new ApolloServer({
    typeDefs: gql(schema),
    resolvers: resolvers,
    context: async ({ req, connection }) => {
        const token = req?.headers?.authorization || connection?.context.authorization || '';

        if ((token === 'Bearer' || token === 'Bearer null' || !token.startsWith('Bearer')) && config.nodeEnv !== 'dev') {
            throw new AuthenticationError('Unauthorized');
        }

        const user = config.nodeEnv === 'dev' ? config.firebaseDev : await admin.auth().verifyIdToken(token.split('Bearer ')[1]);

        if (!user) {
            throw new AuthenticationError('You must be logged in');
        }

        return {
            user
        };
    },
    subscriptions: {
        path: '/api/subscriptions',
        onConnect: (connectionParams, webSocket, context) => {
            console.log('Client connected');
            pubsub.publish('deltaPlayerCount', { deltaPlayerCount: ++playerCount });
        },
        onDisconnect: (webSocket, context) => {
            console.log('Client Disconnected');
            pubsub.publish('deltaPlayerCount', { deltaPlayerCount: --playerCount });
        }
    }
});

gqlServer.applyMiddleware({ app: express, path: '/api/graphql' });

const server = createServer(express);

gqlServer.installSubscriptionHandlers(server);

server.listen(port, () => {
    console.log('Server Online');
});
