import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache, split, HttpLink } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { useAuth } from './auth';
import Firebase from '../firebase';

interface Props {
    children: React.ReactNode;
}

function Apollo(props: Props) {
    const {
        children
    } = props;
    const auth = useAuth();

    if (auth.token() === '') {
        return <>children</>;
    }

    return (
        <ApolloProvider client={ApolloContext()}>
            {
                children
            }
        </ApolloProvider>
    );
}

const ApolloContext = () => {
    const auth = useAuth();

    const httpLink = new HttpLink({
        uri: 'http://localhost:8080/api/graphql'
    });

    const wsLink = new WebSocketLink({
        uri: 'ws://localhost:8080/api/subscriptions',
        options: {
            reconnect: true,
            connectionParams: {
                authorization: auth.token()
            }
        }
    });

    const splitLink = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,
        httpLink
    );

    const client = new ApolloClient({
        // uri: 'http://localhost:8080/api/graphql',
        cache: new InMemoryCache(),
        link: splitLink
    });

    return client;
};

export default Apollo;
