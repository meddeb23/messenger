import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../context";

import userAPI from "../api";

export default function AuthRoute({ children, ...rest }) {
  const { isLoggedin, setUser, setIsLoggedin } = useContext(UserContext);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    userAPI
      .getUser()
      .then(({ data, status }) => {
        if (status === 200) {
          setUser(data.user);
          setIsLoggedin(true);
          // setIsAdmin(data.isAdmin);
          // socket_client.ioConnection(data.user._id);
          setSearch(true);
        }
      })
      .catch((error) => {
        setSearch(true);
        console.log(error);
      });
  }, []);
  return (
    search && (
      <Route
        {...rest}
        render={({ location }) =>
          isLoggedin ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    )
  );
}
