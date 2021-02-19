import React, { useEffect } from 'react';
import LoadScreen from '../../components/load-screen';
import { useGlobal } from '../../contexts/global';
import Firebase from '../../firebase';

interface Props { }

function Logout(props: Props) {
    const { } = props;
    const global = useGlobal();

    useEffect(() => {
        global.signOut();
    });

    return (
        <LoadScreen
            text='Logging out...'
        />
    );
}

export default Logout;
