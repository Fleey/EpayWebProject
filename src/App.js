import React from 'react';
import './App.css';

import {Router, Route, Redirect, hashHistory} from 'react-router'

import NotFoundPage from "./notFoundPage/NotFoundPage";
import Login from "./auth/login/Login";
import IndexPage from "./indexPage/IndexPage";
import User from "./user/User";

function App() {
    return (
        <div className="App">
            <Router history={hashHistory}>
                <Route path="/" component={IndexPage}/>
                <Route path="Auth">
                    <Route path="Login" component={Login}/>
                </Route>
                <Redirect from="User" to="User/Dashboard"/>
                <Route path="User/*" component={User}/>
                <Route path="*" component={NotFoundPage}/>
            </Router>
        </div>
    );
}

export default App;
