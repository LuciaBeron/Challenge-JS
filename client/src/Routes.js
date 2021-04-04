import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/home/Home' ;
import Sidebar from './components/sidebar/Sidebar';

const Routes = () => {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>

          <Route exact path="/register">
            <Register />
          </Route>

          <Route exact path="/home">
            <Sidebar />
            <Home />
          </Route>

          <Route exact path="/manage">
            <Sidebar />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  };
  
export default Routes;