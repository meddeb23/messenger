import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Login, MessagesPage, Register } from "../pages";
import { Body } from "../components";
import AuthRoute from "./authRoute";

export default function Routes() {
  return (
    <Router>
      <Body>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>

          <Route path="/register" exact>
            <Register />
          </Route>

          <AuthRoute path="/messages" exact>
            <MessagesPage />
          </AuthRoute>
          {/* <Route path="/messages" exact>
            <MessagesPage />
          </Route> */}
          <Redirect from="/*" to="/messages" />
        </Switch>
      </Body>
    </Router>
  );
}
