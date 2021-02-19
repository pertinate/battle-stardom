import React, { useEffect } from 'react';
import LoadScreen from '../components/load-screen';

interface Props { }

function Home(props: Props) {
    const { } = props;

    // useEffect(() => {
    //     (async () => {
    //         const test = await fetch('/api/health');
    //         console.log(test);
    //     })();
    // });

    return (
        <div>
            Home
            asdfasdfasdfasdfasdfasd
            {/* <LoadScreen text='I am loading something' /> */}
        </div>
    );
}

export default Home;
