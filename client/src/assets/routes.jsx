import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { authInfo } from "./flux/actions/userActions";
import PrivatRoute from "./components/privatRoute/PrivatRoute";
import Home from "./components/home/Home";

export default function Routes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authInfo());
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <PrivatRoute path="/" exact component={Home} />
        <Redirect from="/*" to="/" />
      </Switch>
    </Router>
  );
}
