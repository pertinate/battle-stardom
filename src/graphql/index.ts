import fs from 'fs';
import path from 'path';
import { PubSub, withFilter } from 'apollo-server-express';
import { players } from '../data';

const pubsub = new PubSub();

const schema = fs.readFileSync(path.resolve('./src/graphql/schema.graphql')).toString();

// setInterval(() => {
//     pubsub.publish('playerUpdate', {
//         playerUpdate: {
//             email: 'hi@hello.com'
//         }
//     });
// }, 1000);

const resolvers = {
    Query: {
        playerCount: () => players.playerCount(),
        test: (parent: any, args: any, context: any, info: any) => {
            console.log(parent, args, context, info);
            return 'fuck';
        }
    },
    Subscription: {
        deltaPlayerCount: {
            subscribe: () => pubsub.asyncIterator(['deltaPlayerCount'])
        },
        playerUpdate: {
            subscribe: withFilter(
                (parent: any, args: any, context: any, info: any) => {
                    console.log('inside filter', context);
                    return pubsub.asyncIterator('playerUpdate');
                },
                (payload, variables) => {
                    console.log('filter:', payload, variables);
                    return true;
                }
            )
        }
    }
};

export {
    schema,
    resolvers,
    pubsub
};
