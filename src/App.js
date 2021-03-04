import React from 'react';
import './App.css';

import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'

import NotFoundPage from "./pages/404/404";
import Login from "./pages/auth/login";
// import Index from "./pages/index/index";
import User from "./pages/admin/index";

function App() {
    return (
        <div className="App">
            <BrowserRouter forceRefresh={false}>
                <Switch>
                    <Redirect from="/" to="/auth/login" exact={true}/>
                    <Route path="/auth/login" component={Login} exact={true}/>
                    <Redirect from="/admin" to="/admin/dashboard" exact={true}/>
                    <Route path="/admin/*" component={User} exact={true}/>
                    <Route path="*" component={NotFoundPage}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
