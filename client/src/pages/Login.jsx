import Axios from "axios";
import React, { useContext, useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";

import { useForm } from "../utility/utility";
import Loader from "../components/loader/loader";
import { UserContext } from "../context";

export function Login() {
  const { setIsLoggedin, setUser, setIsAdmin } = useContext(UserContext);
  const [values, setValues] = useForm({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/messages" } };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      setIsFetching(true);
      // Headers
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await Axios.post("/api/v1/user/login", values, config);
      if (res.status === 200 && res.data.user) {
        setUser(res.data.user);
        setIsLoggedin(true);
        // setIsAdmin(res.user.isAdmin)
        history.replace(from);
      }
      setIsFetching(false);
    } catch (error) {
      // console.log(error.response);
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
      }
      setIsFetching(false);
    }
  };

  return (
    <div className="mt-4 mx-auto flex justify-center items-center text-gray-600">
      <div className="mx-8">
        <h1 className="font-bold text-4xl ml-4">Login</h1>
        <form className="my-4" onSubmit={(e) => onSubmitForm(e)}>
          <div className="flex flex-row items-center bg-white border-2 border-gray-200 py-2 px-3 mb-1 mt-4 rounded-md">
            <svg
              className="w-5 flex-none text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="email"
              placeholder="Enter email"
              className="w-44 bg-transparent outline-none ml-2 text-sm"
              onChange={(e) => setValues(e)}
              name="email"
            />
          </div>
          <small className="text-gray-400 text-xs">
            We'll never share your email with anyone else.
          </small>
          <div className="flex flex-row items-center bg-white border-2 border-gray-200 py-2 px-3 mb-2 mt-4 rounded-md">
            <svg
              className="w-5 flex-none text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              onChange={(e) => setValues(e)}
              type="password"
              name="password"
              placeholder="Enter password"
              className="w-44 bg-transparent outline-none ml-2 text-sm"
            />
          </div>
          <small className="h-16 text-xs text-red-400">{error}</small>
          {isFetching ? (
            <Loader />
          ) : (
            <button
              className="block mt-4 text-center p-2 w-48 bg-purple-600 rounded-md text-white m-auto"
              type="submit"
            >
              connect
            </button>
          )}
          <p className="text-xs text-gray-400 m-4 text-center">
            Dont have an account
            <NavLink className="text-purple-700 pl-2" to="/register">
              Creat an account
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}
