import fs from 'fs';
import path from 'path';
import { PubSub } from 'apollo-server-express';
import { playerCount } from '../data';

const pubsub = new PubSub();

const schema = fs.readFileSync(path.resolve('./src/graphql/schema.graphql')).toString();

const resolvers = {
    Query: {
        playerCount: () => playerCount
    },
    Subscription: {
        deltaPlayerCount: {
            subscribe: () => pubsub.asyncIterator(['deltaPlayerCount'])
        }
    }
};

export {
    schema,
    resolvers,
    pubsub
};
