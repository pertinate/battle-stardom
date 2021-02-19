import React from 'react';

interface Props {
    text: string;
}

function LoadScreen(props: Props) {
    const {
        text
    } = props;

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-100 flex flex-col items-center justify-center">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-36 w-36 mb-7" />
            <h2 className="text-center text-white text-6xl font-semibold">{text}</h2>
        </div>
    );
}

export default LoadScreen;
