import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Login from './components/auth/Login';

const Routes = () => {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
              <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  };
  
export default Routes;