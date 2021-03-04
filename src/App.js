import React from 'react';
import './App.css';

import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'

import NotFoundPage from "./pages/404/404";
import Login from "./pages/auth/login";
import Index from "./pages/index/index";
import User from "./pages/merchant/index";

function App() {
    return (
        <div className="App">
            <BrowserRouter forceRefresh={false}>
                <Switch>
                    <Route path="/" component={Index} exact={true}/>
                    <Route path="/auth/login" component={Login} exact={true}/>
                    <Redirect from="/User" to="User/Dashboard" exact={true}/>
                    <Route path="/User/*" component={User} exact={true}/>
                    <Route path="*" component={NotFoundPage}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}
export default App;
