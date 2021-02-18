import React, { createContext, useContext, useEffect, useState } from 'react';
import Firebase from '../firebase';

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

    useEffect(() => {
        Firebase.auth().onAuthStateChanged(user => {
            return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
        });
    }, [true]);

    return {
        isLoggedIn
    };
};

export const useGlobal = () => useContext(context);

export default Global;
