import './util/signale';
import './express/firebase';
import app from './express/app';
import { createServer } from 'http';
import { ApolloServer, PubSub, gql, AuthenticationError } from 'apollo-server-express';
import admin from 'firebase-admin';
import config from './util/config';

import { pubsub, resolvers, schema } from './graphql';
import { players } from './data';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { buildSchema, execute, subscribe } from 'graphql';

const express = app();

const port = config.port;

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

    // subscriptions: '/api/subscriptions'
    subscriptions: {
        path: '/api/subscriptions',
        onConnect: (connectionParams, webSocket, context) => {
            const { authorization = '' } = connectionParams as ({ authorization: string; });
            console.log('Client connected');
            // pubsub.publish('deltaPlayerCount', { deltaPlayerCount: players.change(1) });
            //register clients to iterate over
        },
        onDisconnect: (webSocket, context) => {
            console.log('Client Disconnected');
            // pubsub.publish('deltaPlayerCount', { deltaPlayerCount: players.change(-1) });
            //remove clients to iterate over
        }
    }
});

gqlServer.applyMiddleware({ app: express, path: '/api/graphql' });

const server = createServer(express);

gqlServer.installSubscriptionHandlers(server);

server.listen(port, () => {
    console.log('Server Online');
    // SubscriptionServer.create({
    //     execute,
    //     subscribe,
    //     schema: buildSchema(schema)
    // }, {
    //     server,
    //     port: 8081,
    //     path: '/api/subscriptions'
    // });
});
