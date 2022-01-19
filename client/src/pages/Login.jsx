import Axios from "axios";
import React, { useContext, useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";

import { useForm } from "../utility/utility";
import Loader from "../components/loader/loader";
import { UserContext } from "../context";

export function Login() {
  const { setIsLoggedin, setUser, setIsAdmin } = useContext(UserContext);
  const [values, setValues] = useForm({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
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
        <form
          autoComplete="off"
          className="my-4"
          onSubmit={(e) => onSubmitForm(e)}
        >
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
              type={!showPwd ? "password" : "text"}
              name="password"
              placeholder="Enter password"
              className="w-44 bg-transparent outline-none ml-2 text-sm"
            />
            {!showPwd ? (
              <svg
                onClick={() => setShowPwd((value) => !value)}
                className="w-5 flex-none text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                  clipRule="evenodd"
                />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            ) : (
              <svg
                onClick={() => setShowPwd((value) => !value)}
                className="w-5 flex-none text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
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
