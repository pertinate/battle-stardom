import { gql, useQuery, useSubscription } from '@apollo/client';
import React, { useEffect } from 'react';
import LoadScreen from '../components/load-screen';

interface Props { }

function Home(props: Props) {
    const { } = props;
    const queryPlayerCount = useQuery(gql`
    query {
        playerCount
    }
    `);
    const subscriptionPlayerCount = useSubscription(
        gql`
        subscription {
            deltaPlayerCount
        }
        `, {
        shouldResubscribe: true
    });

    const data = subscriptionPlayerCount.loading ? queryPlayerCount.data : subscriptionPlayerCount.data;

    return (
        <div>
            {
                !queryPlayerCount.loading && data && <>{JSON.stringify(data)}</>
            }
            Home
            asdfasdfasdfasdfasdfasd
            {/* <LoadScreen text='I am loading something' /> */}
        </div>
    );
}

export default Home;
