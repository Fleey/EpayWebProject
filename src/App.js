import React from 'react';
import './App.css';

import {BrowserRouter, Route, Redirect} from 'react-router-dom'

import NotFoundPage from "./pages/404/404";
import Login from "./pages/auth/login";
import Index from "./pages/merchant/dashboard/dashboard";
import User from "./pages/merchant/index";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Route path="/" component={Index}/>
                <Route path="Auth">
                    <Route path="Login" component={Login}/>
                </Route>
                <Redirect from="User" to="User/Dashboard"/>
                <Route path="User/*" component={User}/>
                <Route path="*" component={NotFoundPage}/>
            </BrowserRouter>
        </div>
    );
}

export default App;
