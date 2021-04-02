import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Login from './components/auth/Login';
import Register from './components/auth/Register';

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
          
        </Switch>
      </BrowserRouter>
    );
  };
  
export default Routes;