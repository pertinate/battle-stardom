import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/header';
import Home from './pages/home';
import { useGlobal } from './contexts/global';

function App() {
    const global = useGlobal();
    return (
        <Router>
            <div
                className='h-screen w-full bg-gray-800 lg:bg-red-300'
            >
                <Header />
                {
                    global.isLoggedIn && (
                        <Switch>
                            <Route
                                path='/'
                                exact
                            >
                                <Home />
                            </Route>
                        </Switch>
                    )
                }
                {
                    !global.isLoggedIn && (
                        <Switch>
                            <Route
                                path='/login'
                            >

                            </Route>
                            <Route
                                path='/register'
                            >

                            </Route>
                            <Route
                                render={() => <Redirect to="/login" />}
                            />
                        </Switch>
                    )
                }
            </div>
        </Router>
    );
}

export default App;
