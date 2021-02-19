import React, { useState } from 'react';
import LoadScreen from '../../components/load-screen';
import { useGlobal } from '../../contexts/global';
import Firebase from '../../firebase';

interface Props { }

function Login(props: Props) {
    const { } = props;

    const [isLoading, setIsLoading] = useState(false);

    const global = useGlobal();
    console.log(global.isSignedIn, global.isLoggedIn);
    console.log(Firebase.auth().currentUser);

    // Firebase.auth().signInWithEmailAndPassword('ppertinate@gmail.com', 'password').catch(console.error);
    if (isLoading && global.isLoggedIn) {
        return <LoadScreen text='Logging In...' />;
    }


    return (
        <div
            className="min-h-screen flex flex-col justify-center items-center"
        >
            <div
                className=" max-w-3xl w-full mx-16 bg-gray-300 border p-8 border-gray-300 text-3xl"
            >
                <form
                    className="space-y-6"
                >
                    <div>
                        <label
                            className="text-5xl font-bold text-gray-600 block"
                        >Email</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-900 rounded mt-1"
                            placeholder="Email..."
                        />
                    </div>
                    <div>
                        <label
                            className="text-5xl font-bold text-gray-600 block"
                        >Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-900 rounded mt-1"
                            placeholder="Password..."
                        />
                    </div>
                    <div
                        className="flex items-center justify-between"
                    >
                        <div
                            className="flex items-center"
                        >
                            <input
                                type="checkbox"
                                className="h-8 w-8 text-blue-300 rounded text-xl"
                            />
                            <label
                                className="ml-2 text-md text-gray-600"
                            >Remember Me</label>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    );
}

export default Login;
