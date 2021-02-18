import React, { createContext, useContext, useEffect, useState } from 'react';
import Firebase from '../firebase';
import Cookies from 'universal-cookie';
import history from '../history';

export const fetcher = async (input: RequestInfo, init?: RequestInit | undefined): Promise<Response> => {
    return fetch(input, {
        ...(init || {}),
        headers: {
            ...(init?.headers || {}),
            Authorization: `Bearer ${Firebase && Firebase.auth && Firebase.auth() && Firebase.auth().currentUser && await Firebase?.auth()?.currentUser?.getIdToken() || ''}`
        }
    });
};

interface Context {
    isLoggedIn: boolean;
}

const context = createContext<Context>({
    isLoggedIn: false
});

interface Props {
    children: React.ReactNode;
}

function Global(props: Props) {
    const {
        children
    } = props;

    const data = ContextData();

    return (
        <context.Provider
            value={data}
        >
            {
                children
            }
        </context.Provider>
    );
}

const ContextData = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const cookies = new Cookies();

    useEffect(() => {
        setIsSignedIn(!!cookies.get('willAutoSignIn'));
        Firebase.auth().onAuthStateChanged(user => {
            return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
        });
    }, [true]);

    useEffect(() => {
        if (isLoggedIn) {
            history.push('/');
            cookies.set('willAutoSignIn', isSignedIn);
        } else {
            cookies.set('willAutoSignIn', isSignedIn);
        }
    }, [isLoggedIn]);

    return {
        isLoggedIn,
        isSignedIn
    };
};

export const useGlobal = () => useContext(context);

export default Global;
