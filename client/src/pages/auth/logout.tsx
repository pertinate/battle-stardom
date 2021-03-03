import React, { useEffect } from 'react';
import LoadScreen from '../../components/load-screen';
import { useAuth } from '../../contexts/auth';
import { useGlobal } from '../../contexts/global';
import Firebase from '../../firebase';

interface Props { }

function Logout(props: Props) {
    const { } = props;
    const global = useGlobal();
    const auth = useAuth();

    useEffect(() => {
        auth.signOut();
    });

    return (
        <LoadScreen
            text='Logging out...'
        />
    );
}

export default Logout;
