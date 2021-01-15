import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../context";

export default function AuthRoute({ children, ...rest }) {
  const { isLoggedin, setUser, setIsLoggedin } = useContext(UserContext);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    axios
      .get("/api/v1/user")
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.user);
          setIsLoggedin(true);
          // setIsAdmin(res.data.isAdmin);
          // socket_client.ioConnection(res.data.user._id);
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
