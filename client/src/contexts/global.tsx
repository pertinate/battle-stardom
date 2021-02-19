import React, { createContext, useContext, useEffect, useState } from 'react';
import Firebase from '../firebase';
import Cookies from 'universal-cookie';
import history from '../history';

const cookies = new Cookies();

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
    isSignedIn: boolean;
    signOut: () => void;
}

const context = createContext<Context>({
    isLoggedIn: false,
    isSignedIn: !!cookies.get('willAutoSignIn'),
    signOut: () => { }
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
    console.log(cookies.get('willAutoSignIn'));
    const isSignedIn = !!cookies.get('willAutoSignIn');

    const signOut = () => {
        Firebase.auth().signOut();
        history.push('/login');
    };

    useEffect(() => {
        Firebase.auth().onAuthStateChanged(user => {
            return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
        });
    }, [true]);

    useEffect(() => {
        if (isLoggedIn) {
            history.push('/');
        }

        cookies.set('willAutoSignIn', isLoggedIn);
    }, [isLoggedIn]);

    return {
        isLoggedIn,
        isSignedIn,
        signOut
    };
};

export const useGlobal = () => useContext(context);

export default Global;
