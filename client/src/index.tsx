import React from 'react';
import ReactDOM from 'react-dom';
import './tailwind.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Global from './contexts/global';
import AuthContext from './contexts/auth';
import Apollo from './contexts/apollo';


ReactDOM.render(
    <React.StrictMode>
        <AuthContext>
            <Apollo>
                <Global>
                    <App />
                </Global>
            </Apollo>
        </AuthContext>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
